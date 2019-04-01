interface ArrayConstructor {
  from(arrayLike: any, mapFn?: (item: any, index: number) => any): Array<any>;
}

interface String {
  includes(string): boolean;
}
