import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'

import '../scss/style.scss'

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
        Hello, from website
      </h1>
      <Link href="/contact">
        <a>Contact</a>
      </Link>
      <Link href="/blog">
        <a>Blog</a>
      </Link>
    </div>
  </div>
)

export default Home
