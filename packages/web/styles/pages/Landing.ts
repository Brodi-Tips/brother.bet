import styled from 'styled-components'

import logo from '../../src/assets/logo.png'
import stadium from '../../src/assets/stadium.jpg'
import arrows from '../../src/assets/arrows.png'
import data from '../../src/assets/data.png'
import player from '../../src/assets/player.png'
import goal from '../../src/assets/goal.png'
import money from '../../src/assets/money.jpg'
import { ReactComponent as Bet365White } from '../../src/assets/bet365-white.svg'
import { ReactComponent as FifaWhite } from '../../src/assets/fifa-white.svg'
import { FiChevronsDown } from 'react-icons/fi'

import { slideBottom } from '../animations'

export const TextGreen = styled.span`
  color: ${(props) => props.theme.colors.primary.one};
`

export const TextBlue = styled.span`
  color: ${(props) => props.theme.colors.primary.four};
`

export const TextYellow = styled.span`
  color: ${(props) => props.theme.colors.tertiary.four};
`
export const TextPink = styled.span`
  color: ${(props) => props.theme.colors.quaternary.four};
`

export const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 54px;
    color: ${(props) => props.theme.colors.one};
    margin-top: 40px;
  }
  p {
    margin-top: 24px;
    font-size: 24px;
    line-height: 32px;
    color: ${(props) => props.theme.colors.one};
  }
`

export const ContainerImages = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 1rem 0;
`

export const Logo = styled.img.attrs({
  src: `${logo}`,
})`
  width: 400px;
  height: 350px;
`

export const AboutContainer = styled.div`
  background-image: url(${data});
  background-attachment: fixed;
`

export const MoneyContainer = styled.div`
  background-image: url(${money});
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
`

export const Title = styled.h2`
  align-self: center;
  font-family: 'Work Sans', Courier, monospace;
  text-align: left;
  text-transform: uppercase;
  font-size: 2.5rem;
  background-color: #000;
  color: white !important;
  padding: 1rem;
  position: relative;
  bottom: 3rem;
  left: 2rem;
  z-index: 4;
`

export const BoxTitleAbout = styled.div`
  background-color: ${(props) => props.theme.colors.primary.one};
  position: absolute;
  width: 5rem;
  top: -4rem;
  right: -3rem;
  height: 20rem;
  background-attachment: fixed;
  z-index: 3;
  transform-origin: top right;
`

export const BoxTitleMarket = styled.div`
  background-color: ${(props) => props.theme.colors.primary.one};
  position: relative;
  top: 1rem;
  left: 1rem;
  width: 5rem;
  height: 5rem;
  background-attachment: fixed;
  z-index: 3;
`
export const ContainerTitleMarket = styled.div`
  z-index: 2;
  position: relative;
  left: -2rem;
`
export const ContainerTitleAbout = styled.div`
  z-index: 2;
  position: relative;
  left: -2rem;
  top: 5.3rem;
  height: 5rem;
`
export const ContainerParagraphAbout = styled.div`
  padding-right: 8rem;
  z-index: 2;
`

export const Paragraph = styled.div`
  align-self: center;
  font-family: 'Work Sans', Courier, monospace;
  text-align: left;
  font-size: 0.8rem;
  color: white !important;
  text-align: justify;
  padding: 0 1rem;
  z-index: 2;
  text-indent: 1rem;
`

export const Prove = styled.h3`
  align-self: center;
  font-family: 'Work Sans', Courier, monospace;
  text-align: left;
  text-transform: uppercase;
  z-index: 2;
  padding-bottom: 0.5rem;
`

export const Slogan = styled.h1`
  align-self: center;
  font-family: 'Work Sans', Courier, monospace;
  text-transform: uppercase;
  text-align: left;
  padding-left: 16px;
  color: white !important;
  z-index: 2;
  line-height: 3rem;
`

export const SubSlogan = styled.h4`
  align-self: center;
  font-family: 'Work Sans', Courier, monospace;
  text-align: left;
  width: 100%;
  font-size: 16px;
  padding-left: 16px;
  font-weight: 400;
  z-index: 2;
`

export const Page = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 400%;
    background-color: ${(props) => props.theme.colors.background.primary.four};
    background-attachment: fixed;

    opacity: 0.7;
    z-index: 1;
  }
`

export const Bet365WhiteImage = styled(Bet365White)`
  height: auto;
  width: 5rem;
  display: inline-block;
  margin: auto;
  z-index: 5;
`

export const FifaWhiteImage = styled(FifaWhite)`
  height: auto;
  width: 7rem;
  display: inline-block;
  margin: auto;
  z-index: 5;
`

export const SeeImage = styled(FiChevronsDown)`
  height: 3rem;
  width: 3rem;
  display: inline-block;
  margin: auto;
  z-index: 5;
  animation: ${slideBottom} 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19) infinite alternate-reverse
    backwards;
`

export const ArrowsImage = styled.img.attrs({
  src: arrows,
})`
  display: flex;
  align-self: initial;
  width: 150%;
  height: 15rem;
  background-repeat: round;
  object-fit: cover;
  position: relative;
  left: -2rem;
  top: 2rem;
  margin-right: 100px;
  margin-top: 4rem;
  z-index: 2;
`

export const GoalImage = styled.img.attrs({
  src: goal,
})`
  opacity: 0.5;
  display: flex;
  align-self: initial;
  width: 100%;
  height: auto;
  background-repeat: round;
  object-fit: cover;
  position: relative;
  bottom: 0rem;
  margin-left: 100px;
  margin-bottom: -50px;
  z-index: 2;
`

export const PlayerImage = styled.img.attrs({
  src: player,
})`
  display: flex;
  align-self: initial;
  width: 100%;
  height: 45%;
  background-repeat: round;
  object-fit: cover;
  position: relative;
  right: -4rem;
  bottom: -1rem;
  z-index: 2;
  opacity: 0.6;
`

export const HeaderImage = styled.img.attrs({
  src: stadium,
})`
  background-image: url(${stadium});
  display: flex;
  align-self: center;
  width: 100%;
  height: 70vh;
  object-fit: cover;
  filter: sepia(100%) saturate(300%) brightness(70%) hue-rotate(60deg);
`
