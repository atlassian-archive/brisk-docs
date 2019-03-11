import React from 'react';
import * as PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { colors, gridSize, math } from '@atlaskit/theme';
import Link from 'next/link';

export const PanelGrid = styled.div`
    display: flex;
    flex-direction: ${props => (props.displayAsColumn ? 'column' : 'row')};
    align-items: center;
    justify-content: center;
    margin-top: ${math.multiply(gridSize, 10)}px;
`;

const cardVerticalAnimationDistance = math.multiply(gridSize, 7.5);
const loadInAnimation = keyframes`
    0% {
        top: ${cardVerticalAnimationDistance}px;
        opacity: 0;
    }
        50% {
        opacity: 1;
    }
        100% {
        top: 0;
        opacity: 1;
    }
`;

const PanelStyle = styled.a`
    background-color: white;
    border-radius: 3px;
    color: ${colors.N900};
    display: flex;
    flex-direction: column;
    margin: ${math.multiply(gridSize, 5)}px;
    padding: ${math.multiply(gridSize, 2)}px ${math.multiply(gridSize, 3)}px;
    top: ${cardVerticalAnimationDistance}px;
    width: 280px;
    height: 320px;
    animation: ${loadInAnimation} 0.6s cubic-bezier(0.15, 1, 0.33, 1) forwards;
    transition: all 0.3s cubic-bezier(0.15, 1, 0.33, 1);

    &:hover {
        transform: translateY(-${gridSize}px);
        color: ${colors.N900};
        cursor: pointer;
        text-decoration: none;
    }
`;

const PanelHeader = styled.div`
    display: flex;
    align-items: center;
    font-weight: 500;
`;

const PanelIcon = styled.span`
    align-items: center;
    background-color: ${p => p.color};
    border-radius: 4px;
    border: 2px solid ${colors.N0};
    display: flex;
    height: ${math.multiply(gridSize, 2)}px;
    justify-content: center;
    padding: ${gridSize}px;
    width: ${math.multiply(gridSize, 2)}px;
`;

const PanelLabel = styled.span`
    padding: ${gridSize}px;
    font-weight: 500;
`;

const PanelImage = styled.img`
    align-self: center;
    margin-top: ${math.multiply(gridSize, 2)}px;
    width: 160px;
    height: auto;
    padding: ${math.multiply(gridSize, 2)}px;
    bottom: 0;
`;

const Panel = ({ href, IconComponent, label, color, description, imgSrc }) => (
    <Link href={href} passHref>
        <PanelStyle>
            <PanelHeader>
                <PanelIcon color={color}>
                    <IconComponent
                        label={label}
                        primaryColor={colors.N0}
                        secondaryColor={color}
                        size="medium"
                    />
                </PanelIcon>
                <PanelLabel>{label}</PanelLabel>
            </PanelHeader>
            <p>{description}</p>
            <PanelImage alt={`${label} graphic`} src={imgSrc} />
        </PanelStyle>
    </Link>
);

Panel.propTypes = {
    href: PropTypes.string.isRequired,
    IconComponent: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
};

export default Panel;
