import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import useTranslation from '../hooks/useTranslation'

import {
  Container,
  AboutContainer,
  ArrowsImage,
  GoalImage,
  Page,
  Slogan,
  SubSlogan,
  Paragraph,
  Title,
  TextYellow,
  TextGreen,
  PlayerImage,
  MoneyContainer,
  TextPink,
  Prove,
  Bet365WhiteImage,
  FifaWhiteImage,
  ContainerImages,
  SeeImage,
  ContainerTitleAbout,
  ContainerTitleMarket,
  BoxTitleMarket,
  BoxTitleAbout,
  ContainerParagraphAbout,
} from '../../styles/pages/Landing'

import FifaWhite from '../../src/assets/fifa-white.svg'

export const Landing = () => {
  const { t } = useTranslation()
  const presentation = t('presentation')
  const about = t('about')
  const market = t('market')

  return (
    <Container>
      <Head>
        <title>Brother Bet</title>
      </Head>
      <AboutContainer>
        <Page>
          <ArrowsImage />
          <Slogan>{presentation.slogan}</Slogan>
          <SubSlogan>
            <TextYellow>{presentation.sub_slogan}</TextYellow>
          </SubSlogan>
          <GoalImage />
        </Page>
        <Page>
          <ContainerTitleAbout>
            <BoxTitleAbout></BoxTitleAbout>
            <Title>{about.slogan}</Title>
          </ContainerTitleAbout>
          <ContainerParagraphAbout>
            <Paragraph>
              {about.paragraph.one.part.one}
              <TextGreen>{about.paragraph.one.part.two}</TextGreen>
              {about.paragraph.one.part.three}
              <TextYellow>{about.paragraph.one.part.four}</TextYellow>
              {about.paragraph.one.part.five}
            </Paragraph>
            <br />
            <Paragraph>
              {about.paragraph.two.part.one}
              <TextGreen>{about.paragraph.two.part.two}</TextGreen>
              {about.paragraph.two.part.three}
            </Paragraph>
          </ContainerParagraphAbout>

          <PlayerImage />
        </Page>
      </AboutContainer>
      <MoneyContainer>
        <Page>
          <ContainerTitleMarket>
            <BoxTitleMarket></BoxTitleMarket>
            <Title>{market.slogan}</Title>
          </ContainerTitleMarket>
          <Paragraph>{market.paragraph.one}</Paragraph>
          <Paragraph>{market.paragraph.two}</Paragraph>
          <Paragraph>
            <TextGreen>{market.paragraph.three}</TextGreen>
          </Paragraph>
          <Paragraph>{market.paragraph.four}</Paragraph>
          <Paragraph>
            {market.paragraph.five.part.one}
            <TextPink>{market.paragraph.five.part.two}</TextPink>
            {market.paragraph.five.part.three}
          </Paragraph>
          <ContainerImages>
            <FifaWhiteImage />
            <Bet365WhiteImage />
          </ContainerImages>
          <Prove>
            <TextYellow>{market.paragraph.six}</TextYellow>
          </Prove>
          <Prove>
            <TextYellow>{market.paragraph.seven}</TextYellow>
          </Prove>
          <Prove>
            <TextYellow>
              <SeeImage />
            </TextYellow>
          </Prove>
        </Page>
      </MoneyContainer>
    </Container>
  )
}
