import Head from 'next/head'
import SSRProvider from 'react-bootstrap/SSRProvider'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr';
import fetchJson from 'data/config/fetchJson';
import Layout from '../components/layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <SWRConfig
        value={{
          fetcher: fetchJson,
          onError: (err) => {
            console.error(err)
          }
        }}
      >
        <Layout>
          <Head>
            <title>ProtoVibes</title>
            <meta name="description" content="DJ Mix Prototyping Tools" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </SSRProvider>
  )
}

export default MyApp
