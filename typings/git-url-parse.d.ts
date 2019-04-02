declare module 'git-url-parse' {
  export default function parseGitUrl(
    url: string,
  ): {
    // eslint-disable-next-line
    git_suffix?: string;
    resource: string;
    owner: string;
    toString: (why: string) => string;
    name: string;
  };
}
