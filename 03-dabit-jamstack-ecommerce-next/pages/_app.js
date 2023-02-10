import Head from 'next/head'
import '../styles/globals.css'
import Layout from '../layouts/layout'
import fetchCategories from '../utils/categoryProvider'

function Ecommerce({ Component, pageProps, categories }) {
  return (
    <Layout categories={categories}>
      <Head>
        <title>Jamstack ECommerce</title>
        <meta
          name='description'
          content='Jamstack ECommerce Next provides a way to quickly get up and running with a fully configurable ECommerce site using Next.js.'
        />
        <meta property='og:title' content='Jamstack ECommerce' key='title' />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

Ecommerce.getInitialProps = async () => {
  const categories = await fetchCategories()
  // console.log('getInitialProps', categories)
  return {
    categories,
  }
}

export default Ecommerce
