declare module '@atlaskit/theme' {
  export function gridSize(): 8;
  export function borderRadius(): 3;
  export const math: {
    multiply: (f: () => number, n: number) => number;
  };
  export const colors: Record<string, string>;
}

/* eslint-disable import/export */

declare module '@atlaskit/pagination' {
  declare const aDefault: React.ComponentClass<any, any>;
  export default aDefault;
}

declare module '@atlaskit/code' {
  declare const AkCode: React.ComponentClass<any, any>;
  declare const AkCodeBlock: React.ComponentClass<any, any>;

  export { AkCode, AkCodeBlock };
}

declare module '@atlaskit/tree' {
  declare const Tree: React.ComponentClass<any, any>;
  export default Tree;
}

declare module '@atlaskit/button' {
  declare const Button: React.ComponentClass<any, any>;
  export default Button;
}
declare module '@atlaskit/dynamic-table' {
  declare const Table: React.ComponentClass<any, any>;
  export default Table;
}

declare module '@atlaskit/navigation-next' {
  declare const ContainerHeader: React.ComponentClass<any, any>;
  declare const HeaderSection: React.ComponentClass<any, any>;
  declare const ItemAvatar: React.ComponentClass<any, any>;
  declare const MenuSection: React.ComponentClass<any, any>;
  declare const BackItem: React.ComponentClass<any, any>;
  declare const Separator: React.ComponentClass<any, any>;
  declare const Group: React.ComponentClass<any, any>;
  declare const Item: React.ComponentClass<any, any>;
  declare const GlobalNav: React.ComponentClass<any, any>;
  declare const LayoutManager: React.ComponentClass<any, any>;
  declare const NavigationProvider: React.ComponentClass<any, any>;
  export {
    ContainerHeader,
    HeaderSection,
    ItemAvatar,
    MenuSection,
    BackItem,
    Separator,
    Group,
    Item,
    GlobalNav,
    LayoutManager,
    NavigationProvider,
  };
}
