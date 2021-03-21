import React, { useState, useEffect } from 'react'
import Middleware from '../../js/Class/Middleware'
import { IButtonsAnimate } from '../../../src/interfaces/components/Navigation'

import {
  Button,
  IconHome,
  IconUsers,
  IconTeam,
  ContainerTab,
  TabBar,
  ContainerButtons,
  ContainerVirtualButtons,
  IconVip,
  IconSign,
} from '../../../styles/components/Navigation'

export const Navigation = () => {
  const [animate, setAnimate] = useState<IButtonsAnimate>({
    vip: false,
    team: false,
    home: true,
    users: false,
    sign: false,
  })
  const mid = new Middleware()

  useEffect(() => {
    console.log(animate)
  }, [animate])

  useEffect(() => {
    async function getClaudio() {
      const resp = await mid.cloud()
      console.log(resp)
    }
    getClaudio()
  }, [])

  const buttonAnimate = (nameButton) => {
    if (!animate[nameButton]) {
      setAnimate((state) => {
        const stateFalsies = Object.keys(state).forEach((v) => (state[v] = false))
        const updatedState = { ...(stateFalsies as any), [nameButton]: true }
        return updatedState
      })
    }
  }

  return (
    <>
      <ContainerTab>
        <ContainerButtons>
          <ContainerVirtualButtons>
            <Button animate={animate.vip} onClick={() => buttonAnimate('vip')}>
              <IconVip />
            </Button>
            <Button animate={animate.team} onClick={() => buttonAnimate('team')}>
              <IconTeam />
            </Button>
            <Button animate={animate.home} onClick={() => buttonAnimate('home')}>
              <IconHome />
            </Button>
            <Button animate={animate.users} onClick={() => buttonAnimate('users')}>
              <IconUsers />
            </Button>
            <Button animate={animate.sign} onClick={() => buttonAnimate('sign')}>
              <IconSign />
            </Button>
          </ContainerVirtualButtons>
        </ContainerButtons>
        <TabBar />
      </ContainerTab>
    </>
  )
}
