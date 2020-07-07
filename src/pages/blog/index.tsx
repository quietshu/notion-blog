import Link from 'next/link'
import Header from '../../components/header'

import { getBlogLink, getDateStr, postIsReady } from '../../lib/blog-helpers'
import { textBlock } from '../../lib/notion/renderers'
import getNotionUsers from '../../lib/notion/getNotionUsers'
import getBlogIndex from '../../lib/notion/getBlogIndex'

export async function getStaticProps() {
  const postsTable = await getBlogIndex()

  const authorsToGet: Set<string> = new Set()
  const posts: any[] = Object.keys(postsTable)
    .map(slug => {
      const post = postsTable[slug]
      // remove draft posts in production
      if (!postIsReady(post)) {
        return null
      }
      post.Authors = post.Authors || []
      for (const author of post.Authors) {
        authorsToGet.add(author)
      }
      return post
    })
    .filter(Boolean)

  const { users } = await getNotionUsers([...authorsToGet])

  posts.map(post => {
    post.Authors = post.Authors.map(id => users[id].full_name)
  })

  return {
    props: {
      posts,
    },
  }
}

export default ({ posts = [] }) => {
  return (
    <article>
      <h1>Thoughts</h1>
      <Header title="Thoughts" />
      <div className="post-list">
        {posts.map(post => {
          return (
            <p className="post-item" key={post.Slug}>
              <Link href="/blog/[slug]" as={getBlogLink(post.Slug)}>
                <a>{post.Page}</a>
              </Link>
              <time>{getDateStr(post.Date)}</time>
            </p>
          )
        })}
      </div>
    </article>
  )
}
