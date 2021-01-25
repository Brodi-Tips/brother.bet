import { getInitialLocale } from '../translations/getInitialLocale'
import Head from 'next/head'

import React, { useEffect } from 'react'

const Home: React.FC = () => {
  useEffect(() => {
    window.location.replace(`/${getInitialLocale()}`)
  })

  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  )
}

export default Home
