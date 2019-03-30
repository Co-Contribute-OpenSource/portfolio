import React, { useEffect, useRef } from 'react';
import styled, { css } from 'styled-components/macro';
import lottie from 'lottie-web/build/player/lottie_light.min';
import nightModeAnimation from '../data/NightModeIconData.json';
import { media } from '../utils/StyleUtils';

export default function ThemeToggle({ themeId, toggleTheme, isMobile }) {
  const initThemeId = useRef(themeId);
  const lottieContainerRef = useRef();
  const lottieAnimRef = useRef();

  useEffect(() => {
    lottieAnimRef.current = lottie.loadAnimation({
      container: lottieContainerRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: nightModeAnimation,
    });

    const duration = lottieAnimRef.current.getDuration(true) - 1;
    lottieAnimRef.current.goToAndStop(initThemeId.current === 'dark' ? duration : 0, true);
  }, []);

  useEffect(() => {
    lottieAnimRef.current.setDirection(themeId === 'dark' ? 1 : -1);
    lottieAnimRef.current.play();
  }, [themeId]);

  return (
    <ThemeToggleButton aria-label="Toggle theme" onClick={toggleTheme} isMobile={isMobile}>
      <div ref={lottieContainerRef} />
    </ThemeToggleButton>
  );
}

const ThemeToggleButton = styled.button`
  border: 0;
  margin: 0;
  padding: 6px;
  background: none;
  position: fixed;
  cursor: pointer;
  z-index: 2048;
  width: 48px;
  height: 48px;
  clip-path: ${props => props.theme.clipPath(8)};
  transition: background 0.3s ease;

  top: ${props => props.theme.spacingOuter.numDesktop - 8}px;
  right: ${props => props.theme.spacingOuter.numDesktop - 8}px;

  @media (max-width: ${media.tablet}) {
    top: ${props => props.theme.spacingOuter.numTablet - 8}px;
    right: ${props => props.theme.spacingOuter.numTablet - 8}px;
  }

  @media (max-width: ${media.mobile}), (max-height: ${media.mobile}) {
    top: ${props => props.theme.spacingOuter.numMobile - 8}px;
    right: ${props => props.theme.spacingOuter.numMobile - 8}px;
  }

  ${props => props.isMobile && css`
    top: unset;
    right: 30px;
    bottom: 30px;
  `}

  &:hover,
  &:focus,
  &:active {
    background: ${props => props.theme.colorText(0.1)};
    outline: none;
  }

  svg path {
    transition-property: fill, stroke;
    transition-timing-function: ease;
    transition-duration: 0.4s;
  }

  svg g > path {
    stroke: ${props => props.theme.colorText()};
  }

  svg g[mask] path {
    fill: ${props => props.theme.colorText()};
    stroke: none;
  }
`;