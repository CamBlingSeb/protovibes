import Head from 'next/head'
import SSRProvider from 'react-bootstrap/SSRProvider'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <Layout>
        <Head>
          <title>ProtoVibes</title>
          <meta name="description" content="DJ Mix Prototyping Tools" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </SSRProvider>
  )
}

export default MyApp
