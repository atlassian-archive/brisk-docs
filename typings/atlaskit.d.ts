declare module '@atlaskit/theme' {
  export function gridSize(): 8;
  export function borderRadius(): 3;
  export const math: {
    multiply: (f: () => number, n: number) => number;
  };
  export const colors: Record<string, string>;
}
