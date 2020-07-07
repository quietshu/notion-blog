import Link from 'next/link'

import Header from '../components/header'
import Content from '../components/content'

import { BLOG_INDEX_ID } from '../lib/notion/server-constants'

import getPageData from '../lib/notion/getPageData'

export async function getStaticProps() {
  const postData = await getPageData(BLOG_INDEX_ID, 2)
  const post = { content: postData.blocks }

  return {
    props: {
      post,
    },
  }
}

export default ({ post }) => {
  return (
    <article>
      <h1>Shu Ding</h1>
      <Header title="Shu Ding" />
      <Content blocks={post.content || []} />
    </article>
  )
}
