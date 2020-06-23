import Link from 'next/link'

import Header from '../components/header'
import Content from '../components/content'

import { BLOG_INDEX_ID } from '../lib/notion/server-constants'

import getPageData from '../lib/notion/getPageData'

export async function unstable_getStaticProps() {
  const postData = await getPageData(BLOG_INDEX_ID, 2)
  const post = { content: postData.blocks }

  return {
    props: {
      post,
    },
    revalidate: 10,
  }
}

export default ({ post }) => {
  return (
    <article>
      <h1>Chu Ding</h1>
      <Header title="Chu Ding" />
      <Content blocks={post.content || []}/>
    </article>
  )
}
