import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { ParsedUrlQuery } from 'querystring'
import { getPost, readPosts } from '@lib/posts'

interface Props { 
  source: MDXRemoteSerializeResult
  data: {
    title: string,
    description: string
 } 
}

interface ParseQuery extends ParsedUrlQuery {
  slug: string
}

const Post = ({ source } : Props) => {
  return (
    <div className="wrapper">
      <MDXRemote {...source} components={{}}/>
    </div>
  )
}

export const getStaticProps = async (context: {params: ParseQuery}) => {
  const { data, content } = await getPost(context.params.slug)
  return { 
    props: {
     source: await serialize(content),
     data
    } 
  }
}

export const getStaticPaths = async () => {
  const posts = await readPosts('posts')
  const paths = posts.map(ctx => ({params: { slug: ctx.name }}))
  return { paths, fallback: false }
}

export default Post