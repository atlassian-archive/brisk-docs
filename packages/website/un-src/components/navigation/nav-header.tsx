// TODO:
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as React from 'react';
import {
  ContainerHeader,
  HeaderSection,
  ItemAvatar,
} from '@atlaskit/navigation-next';
import { gridSize as gridSizeFn } from '@atlaskit/theme';
import titleCase from 'title-case';

/** @jsx jsx */
// @ts-ignore
import { jsx } from '@emotion/core';

const gridSize = gridSizeFn();

export type Props = {
  headerText: string;
  url: string;
};

const NavHeader = ({ headerText, url }: Props) => (
  <HeaderSection>
    {/* TODO: TSFix - nav typings */}
    {({ css }: { css: {} }) => (
      <div
        css={{
          ...css,
          paddingTop: `${gridSize * 2.5}px`,
          paddingBottom: `${gridSize * 2.5}px`,
        }}
      >
        <ContainerHeader
          // TODO: TSFix - nav typings
          before={(itemState: any) => (
            <ItemAvatar
              itemState={itemState}
              appearance="square"
              size="large"
            />
          )}
          text={titleCase(headerText)}
          href={url}
        />
      </div>
    )}
  </HeaderSection>
);

export default NavHeader;
