import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>JWT Authentication App Example</title>
        <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />

      </Head>
      <div className='app-container bg-light4'>
        {/* add Nav comonent, and TS function*/ }
      <Component {...pageProps} />

      </div>
    </>
  )
}

export default MyApp
