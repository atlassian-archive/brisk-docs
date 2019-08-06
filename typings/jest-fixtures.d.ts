declare module 'jest-fixtures' {
  export function createTempDir(): string;

  export function copyFixtureIntoTempDir(
    cwd: string,
    fixtureName: string,
  ): Promise<string>;
}
