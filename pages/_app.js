/* pages/_app.js */
import '../styles/globals.css'
import Link from 'next/link'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Layout/>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp