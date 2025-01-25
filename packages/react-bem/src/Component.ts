import React from 'react';
import { Bem, createBem } from '@/Bem';

interface DefaultProps {
  children?: React.ReactNode;
  className?: string;
}

interface CustomProps {
  bem: Bem;
}

export type InternalProps<P extends Record<string, any> = {}> = P & DefaultProps & CustomProps;
export type ExportedProps<P extends Record<string, any> = {}> = P & DefaultProps;

export function createComponent<P extends Record<string, any> = {}>(
  blockName: string,
  Component: (props: InternalProps<P>) => React.Component,
): (props: ExportedProps<P>) => React.Component {
  const bem = createBem(blockName);

  return function (props: ExportedProps<P>) {
    return Component({ bem, ...props });
  };
}
