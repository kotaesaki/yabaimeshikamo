import type { NextPage } from 'next'
import Head from 'next/head'
import 'semantic-ui-css/semantic.min.css'
import React from 'react';
import { Header } from '../components/templates/Header';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </div>
  )
}

export default Home
