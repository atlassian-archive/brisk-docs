declare module '@atlaskit/theme' {
  export function gridSize(): 8;
  export function borderRadius(): 3;
  export const math: {
    multiply: (f: () => number, n: number) => number;
  };
  export const colors: Record<string, string>;
}

declare module '@atlaskit/pagination' {
  declare const adefault: React.ComponentClass<any, any>;
  export default adefault;
}

declare module '@atlaskit/code' {
  declare const AkCode: React.ComponentClass<any, any>;
  declare const AkCodeBlock: React.ComponentClass<any, any>;

  export { AkCode, AkCodeBlock };
}

interface ArrayConstructor {
  from(arrayLike: any, mapFn?: (item: any, index: number) => any): Array<any>;
}
