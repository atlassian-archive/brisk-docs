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
  declare const aDefault: React.ComponentType<any, any>;
  export default aDefault;
}

declare module '@atlaskit/code' {
  declare const AkCode: React.ComponentType<any, any>;
  declare const AkCodeBlock: React.ComponentType<any, any>;

  export { AkCode, AkCodeBlock };
}

declare module '@atlaskit/tree' {
  declare const Tree: React.ComponentType<any, any>;
  export default Tree;
}

declare module '@atlaskit/button' {
  declare const Button: React.ComponentType<any, any>;
  export default Button;
}
declare module '@atlaskit/dynamic-table' {
  declare const Table: React.ComponentType<any, any>;
  export default Table;
}
declare module '@atlaskit/drawer' {
  declare const Drawer: React.ComponentType<any, any>;
  export default Drawer;
}
declare module '@atlaskit/section-message' {
  declare const SectionMessage: React.ComponentType<any, any>;
  export default SectionMessage;
}

declare module '@atlaskit/table-tree' {
  declare const aDefault: React.ComponentType<any, any>;
  declare const Headers: React.ComponentType<any, any>;
  declare const Header: React.ComponentType<any, any>;
  declare const Rows: React.ComponentType<any, any>;
  declare const Row: React.ComponentType<any, any>;
  declare const Cell: React.ComponentType<any, any>;

  export { Headers, Header, Rows, Row, Cell };

  export default aDefault;
}

declare module '@atlaskit/navigation-next' {
  declare const ContainerHeader: React.ComponentType<any, any>;
  declare const HeaderSection: React.ComponentType<any, any>;
  declare const ItemAvatar: React.ComponentType<any, any>;
  declare const MenuSection: React.ComponentType<any, any>;
  declare const BackItem: React.ComponentType<any, any>;
  declare const Separator: React.ComponentType<any, any>;
  declare const Group: React.ComponentType<any, any>;
  declare const Item: React.ComponentType<any, any>;
  declare const GlobalNav: React.ComponentType<any, any>;
  declare const LayoutManager: React.ComponentType<any, any>;
  declare const NavigationProvider: React.ComponentType<any, any>;
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
