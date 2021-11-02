import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { ParsedUrlQuery } from 'querystring'
import { getPost, readPosts } from '@lib/posts'
import { Box } from '@chakra-ui/react'

import Post from '@components/Post'
import Menu from '@components/Menu'
import Sidebar from '@components/Sidebar'
import { useState } from 'react'

interface Props {
  source: MDXRemoteSerializeResult
  data: {
    title: string
    description: string
  }
}

interface ParseQuery extends ParsedUrlQuery {
  slug: string
}

const Page = ({ source, data }: Props) => {
  let tracks = [
    { number: 2, title: '1' },
    { number: 2, title: '2' },
    { number: 2, title: 'be' },
  ]
  const [state, setState] = useState(true)
  return (
    <>
      <Sidebar enabled={state}></Sidebar>
      <Box
        marginLeft={['0rem', '0rem', state ? '20rem' : '0rem']}
        transition="ease-in-out"
        transitionDuration="700ms"
        transitionTimingFunction="ease-in-out"
      >
        <Menu onClick={() => setState(!state)}></Menu>
        <Post source={source} header={data} tracks={tracks}></Post>
      </Box>
    </>
  )
}

export const getStaticProps = async (context: { params: ParseQuery }) => {
  const { data, content } = await getPost(context.params.slug)
  return {
    props: {
      source: await serialize(content),
      data,
    },
  }
}

export const getStaticPaths = async () => {
  const posts = await readPosts('posts')
  const paths = posts.map(ctx => ({ params: { slug: ctx.name } }))
  return { paths, fallback: false }
}

export default Page
