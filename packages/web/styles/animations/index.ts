import { keyframes } from 'styled-components'

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

export const pulsate = keyframes`
  0% {-webkit-transform: scale(0.1, 0.1); opacity: 0.0;}
  50% {opacity: 1.0;}
  100% {-webkit-transform: scale(1.2, 1.2); opacity: 0.0;}
`

export const fade = (primaryColor, secondaryColor) => keyframes`
  0% {
  fill:${primaryColor};
  }
  50% {
  fill:${secondaryColor};
  }
  100%{
    fill:${primaryColor};
  }
`

export const pulse = keyframes`
0% {
  transform: scale(0);
  opacity: 1;
  transform-origin: center;
}
100% {
  transform: scale(4.5);
  opacity: 0;
  transform-origin: center;
}
`
export const slideBottom = keyframes`
 0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(1rem);
  }
`
