export type CssModuleClassNameMap = Record<string, string>;

interface BemModifierFactory {
  modifier(modifier?: string, conditionalExpression?: any): BemModifierFactory;
  modifiers(...modifiers: string[]): BemModifierFactory;
  class(...additionalClassNames: Array<string | undefined>): string;
}

export interface Bem {
  block(): BemModifierFactory;
  element(element: string): BemModifierFactory;
}

function createElementClassname(block: string, element: string): string {
  return `${block}__${element}`;
}

function createModifierClassname(base: string, modifier: string): string {
  return `${base}--${modifier}`;
}

function createModifier(base: string, bemClassNames: Set<string>): BemModifierFactory {
  return {
    modifier(modifier?: string, conditionalExpression = true): BemModifierFactory {
      base && modifier && Boolean(conditionalExpression) && bemClassNames.add(createModifierClassname(base, modifier));
      return createModifier(base, bemClassNames);
    },

    modifiers(...modifiers: string[]): BemModifierFactory {
      base && modifiers.forEach((modifier) => modifier && bemClassNames.add(createModifierClassname(base, modifier)));
      return createModifier(base, bemClassNames);
    },

    class(...additionalClassNames: Array<string | undefined>): string {
      return [...Array.from(bemClassNames), ...additionalClassNames]
        .filter((className) => Boolean(className))
        .join(' ')
        .trim();
    },
  };
}

export function createBem(block: string): Bem {
  return {
    block(): BemModifierFactory {
      const blockClassNames = new Set<string>([block]);
      return createModifier(block, blockClassNames);
    },

    element(element: string): BemModifierFactory {
      const elementClassname = createElementClassname(block, element);
      const elementClassNames = new Set<string>([elementClassname]);
      return createModifier(elementClassname, elementClassNames);
    },
  };
}
