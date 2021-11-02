import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { ParsedUrlQuery } from 'querystring'
import fs from 'fs/promises'

import { Box } from '@chakra-ui/react'

import Post from '@components/Post'
import Menu from '@components/Menu'
import Sidebar from '@components/Sidebar'
import { useState } from 'react'
import { Trackable } from '@components/Track'

import {
  findData,
  genPath,
  PostData,
  PostDir,
  PostFile,
  readPosts,
} from '@lib/posts'

interface Props {
  source: MDXRemoteSerializeResult
  data: {
    title: string
    description: string
  }
  tree: (PostDir | PostFile)[]
  slug: string[]
}

interface ParseQuery extends ParsedUrlQuery {
  slug: string[]
}

const toUrl = (name: string): string => name.toLowerCase().replace(/ /g, '-')

const getTracks = (
  tree: (PostDir | PostFile)[],
  slug: string[]
): Trackable[] => {
  const dir = tree.find(
    a => a.type == 'Dir' && toUrl(a.name) == slug[0]
  ) as PostDir

  const current = dir.posts.findIndex(post => post.filename == slug[1])

  const tracks = dir.posts
    .map((a: PostFile, i: number): [PostFile, number] => [a, i])
    .slice(Math.max(current - 1, 0), current + 2)
    .map(
      ([a, i]): Trackable => ({
        number: i + 1,
        title: a.data.data.title,
        url: toUrl(slug[0]) + '/' + slug[1],
      })
    )
  return tracks
}

const Page = ({ source, data, tree, slug }: Props) => {
  const [state, setState] = useState(true)

  const tracks = getTracks(tree, slug)
  console.log('TRACKS', tracks)

  return (
    <>
      <Sidebar
        enabled={state}
        blackTheme={false}
        onClick={() => setState(!state)}
        fileTree={tree}
      ></Sidebar>
      <Box
        marginLeft={['0rem', '0rem', state ? '20rem' : '0rem']}
        transition="ease-in-out"
        transitionDuration="700ms"
        transitionTimingFunction="ease-in-out"
      >
        <Menu onClick={() => setState(!state)}></Menu>
        <Post source={source} header={data} tracks={tracks}></Post>
        <Box margin="100" width="100%"></Box>
      </Box>
    </>
  )
}

export const getStaticProps = async (context: { params: ParseQuery }) => {
  const data = await fs.readFile('/tmp/.idris2noobs')
  const posts: (PostDir | PostFile)[] = JSON.parse(data.toString('utf-8'))

  const post = findData(posts, context.params.slug) as PostData

  return {
    props: {
      source: await serialize(post.content),
      data: post.data,
      tree: posts,
      slug: context.params.slug,
    },
  }
}

export const getStaticPaths = async () => {
  const posts = await readPosts('posts')

  await fs.writeFile('/tmp/.idris2noobs', JSON.stringify(posts))

  const pathTuple = genPath(posts)

  const paths = pathTuple.map(([path, url]) => ({
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
