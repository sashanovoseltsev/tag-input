import { styled, keyframes } from "styled-components";

import { fontSizes } from "../../global.styles";

const colors = {
  mainBackground: '#ced4da',
  invalidBackground: '#ffc9c9',
  hoverBackground: '#b5bbc0',
  invalidTextColor: '#535353',
  removeBtnBackground: '#ff6b6b'
}

const fadeToLeftWithScaling = keyframes`
    0% {
      transform: translateX(0) scale(1);
    }

    70% {
      opacity: 60%;
      transform: translateX(-20%) scale(.3)
    }

    80% {
      transform: translateX(-30%) scale(.3)
    }

    100% {
      opacity: 0;
      transform: translateX(-35%) scale(0);
    }
`;

const pulse = keyframes`
    0% {
      box-shadow: 0 0 0 0 ${colors.mainBackground};
    }

    75% {
      box-shadow: 0 0 0 5px ${colors.mainBackground};
    }

    100% {
      box-shadow: 0 0 0 0 ${colors.mainBackground};
    }
`;

const pulseInvalid = keyframes`
    0% {
      box-shadow: 0 0 0 0 ${colors.invalidBackground};
    }

    75% {
      box-shadow: 0 0 0 5px ${colors.invalidBackground};
    }

    100% {
      box-shadow: 0 0 0 0 ${colors.invalidBackground};
    }
`;

export const TagBtn = styled.span`
    display: inline-block;
    vertical-align: middle;
    line-height: 1.5rem;
    width: 1.8rem;
    height: 1.8rem;
    font-weight: bold;
    position: relative;
    margin-left: .5rem;
    cursor: pointer;
    transition: all .2s ease-out;

    &:hover {
      background-color: ${colors.removeBtnBackground};
      border-radius: 40rem;
      color: white;
    }
`;

export const TagBase = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  border-radius: .5rem;
  padding: 0 .7rem;
  margin-left: .5rem;
  font-size: ${fontSizes.medium};
  transition: all .25s ease-out;
  cursor: default;
  color: inherit;
  background-color: ${colors.mainBackground};

  &:hover {
    background-color: ${colors.hoverBackground};
    box-shadow: 0 0 0 2.5px ${colors.hoverBackground};
  }

  &:hover:has(${TagBtn}:hover) {
    background-color: ${colors.invalidBackground};
    color: ${colors.invalidTextColor};
    box-shadow: 0 0 0 2.5px ${colors.invalidBackground};}
`;

export const TagRemoving = styled(TagBase)`
  animation: ${fadeToLeftWithScaling} .2s ease-in;
`;

export const TagPulsingOnce = styled(TagBase)`
  animation: ${pulse} .25s ease-out;
`;

export const TagDuplicate = styled(TagBase)`
  background-color: ${colors.invalidBackground};
  color: ${colors.invalidTextColor};
  animation: ${pulseInvalid} .25s ease-out, ${fadeToLeftWithScaling} .2s ease-in .9s;
`;