import getConfig from 'next/config'
import NoSSR from 'react-no-ssr'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

import '../less/style.less'

const { publicRuntimeConfig } = getConfig()
const { API_URL } = publicRuntimeConfig

const Home = () => (
  <div>
    <Head title="Blog"
      description="Blog page description"
      title="Use Nextjs with React"
      url="https://example.com"
    />
    <Nav />

    <div className="container">
      <h1 className="title">
        Hello, from website ({process.env.TEST})
      </h1>
      <Link href='/contact' as='/contact'>
        <a>Contact { API_URL }</a>
      </Link>
      <NoSSR>
        <Link href='/blog?id=first' as='/blog/first'>
          <a>Blog</a>
        </Link>
      </NoSSR>
      <Link href='/posts' as='/posts'>
        <a>post #1</a>
      </Link>
    </div>
  </div>
)

export default Home
