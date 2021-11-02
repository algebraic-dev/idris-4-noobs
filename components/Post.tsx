import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import Title from '@components/Title'
import Description from '@components/Description'
import Image from '@components/Img'
import Code from '@components/Code'
import Paragraph from '@components/Paragraph'
import InlineCode from '@components/InlineCode'
import Header from '@components/Header'
import { Track, Trackable } from '@components/Track'
import Url from '@components/Url'

import { Box } from '@chakra-ui/react'

// Components that will be injected inside the markdown
const components = {
  img: Image,
  code: Code,
  p: Paragraph,
  h1: Header,
  h2: Header,
  inlineCode: InlineCode,
  a: Url,
}

interface Props {
  header: {
    title: string
    description: string
  }
  source: MDXRemoteSerializeResult
  tracks: Trackable[]
}

const Post = ({ source, header, tracks }: Props) => (
  <Box width="full" paddingTop="15">
    <Title>{header.title}</Title>
    <Description>{header.description}</Description>
    <Track tracks={tracks}></Track>
    <Box
      width={['90%', '80%', '60%']}
      fontSize="xl"
      textAlign="justify"
      margin="auto"
    >
      <MDXRemote {...source} components={components} />
    </Box>
  </Box>
)

export default Post
