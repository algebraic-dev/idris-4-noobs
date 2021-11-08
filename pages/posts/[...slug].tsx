import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { ParsedUrlQuery } from 'querystring'
import { serialize } from 'next-mdx-remote/serialize'
import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import fs from 'fs/promises'

import Pushable from '@components/Pushable'
import { Trackable } from '@components/Track'
import Sidebar from '@components/Sidebar'
import Post from '@components/Post'
import Menu from '@components/Menu'

import Head from 'next/head'

import { PostDir, PostFile, readPosts } from '@lib/posts'
import { findData, genPath, genUrl, PostPaths } from '@lib/post_utils'

interface Props {
  source: MDXRemoteSerializeResult
  data: {
    title: string
    description: string
  }
  tree: PostPaths
  slug: string[]
}

interface ParseQuery extends ParsedUrlQuery {
  slug: string[]
}

const findDir = (tree: PostPaths, name: string): PostDir =>
  tree.find(a => a.type == 'Dir' && genUrl(a.name) == name) as PostDir

const getTracks = (tree: PostPaths, slug: string[]): Trackable[] => {
  const dir = findDir(tree, slug[0])
  const current = dir.posts.findIndex(post => post.filename == slug[1])

  return dir.posts
    .map((post, index): [PostFile, number] => [post, index])
    .slice(Math.max(current - 1, 0), current + 2)
    .map(([post, index]) => ({
      number: index + 1,
      title: post.data.data.title,
      url: genUrl(slug[0]) + '/' + post.filename,
    }))
}

const Page = ({ source, data, tree, slug }: Props) => {
  const [state, setState] = useState(false)
  const [isMounted, setMounted] = useState(false)

  useEffect(() => {
    let str = window.localStorage.getItem('menu')

    if (window.innerWidth < 600) {
      setState(false)
    } else {
      setState(str ? str === 'true' : state)
    }

    // Just to make the animation not bounce in the beggining..
    setTimeout(() => setMounted(true))

    // Cannot use this rule because React would render it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tracks = getTracks(tree, slug)
  const post = findData(tree, slug) as PostFile

  const setMenu = () => {
    setState(!state)
    if (typeof window != 'undefined') {
      localStorage.setItem('menu', !state ? 'true' : 'false')
    }
  }

  return (
    <>
      <Head>
        <title>Idris2Noobs - {post.data.data.title}</title>
        <meta name="description" content={post.data.data.description} />
      </Head>

      <Sidebar
        enabled={state}
        onClick={setMenu}
        fileTree={tree}
        selected={post}
        isMounted={isMounted}
      ></Sidebar>

      <Pushable enabled={state} size="20em" isMounted={isMounted}>
        <Menu color={'black'} onClick={setMenu}></Menu>
        <Post source={source} header={data} tracks={tracks}></Post>
        <Box margin="100" w="100%"></Box>
      </Pushable>
    </>
  )
}

export const getStaticProps = async (context: { params: ParseQuery }) => {
  const data = await fs.readFile('/tmp/.idris2noobs')
  const posts: PostPaths = JSON.parse(data.toString('utf-8'))

  // Ignores the possibility of null.
  const post = findData(posts, context.params.slug) as PostFile

  return {
    props: {
      source: await serialize(post.data.content),
      data: post.data.data,
      tree: posts,
      slug: context.params.slug,
    },
  }
}

export const getStaticPaths = async () => {
  const posts = await readPosts('posts')
  await fs.writeFile('/tmp/.idris2noobs', JSON.stringify(posts))

  const paths = genPath(posts).map(([path]) => ({
    params: {
      slug: path.split('/'),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export default Page
