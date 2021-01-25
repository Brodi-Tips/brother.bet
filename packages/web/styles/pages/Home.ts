import styled from 'styled-components'

import logo from '../../src/assets/logo.png'
import stadium from '../../src/assets/stadium.jpg'

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

export const Logo = styled.img.attrs({
  src: `${logo}`,
})`
  width: 400px;
  height: 350px;
`

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: auto;
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

export const HeaderContainerTitle = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  position: absolute;
  z-index: 1;
  padding: 20px;
  left: 10%;
  right: 10%;
  top: 30%;
  @media (min-width: 1200px) {
    left: 30%;
    right: 30%;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const HeaderTitle = styled.strong`
  font-weight: bold;
  font-size: 30px;
  text-transform: uppercase;
  white-space: nowrap;
  margin: 30px 0px;
`

export const HeaderSubtitle = styled.a`
  align-self: center;
  font-family: 'Courier New', Courier, monospace;
  text-decoration: underline;
  text-align: center;
  font-size: 20px;
`

export const FeaturesListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  width: 100%;
  height: 30vh;
  text-transform: uppercase;
  background-color: ${(props) => props.theme.colors.background.primary.one};
  color: ${(props) => props.theme.colors.primary.one};
`

export const FeaturesListItem = styled.li`
  color: ${(props) => props.theme.colors.primary};
  float: left;
  font-size: 20px;
`
