import { readPosts } from '@lib/posts'
import { Box } from '@chakra-ui/react'
import Sidebar from '@components/Sidebar'
import Menu from '@components/Menu'
import { PostDir, PostFile } from '@lib/posts'
import { useState } from 'react'

interface Props {
  tree: (PostDir | PostFile)[]
}

const Index = ({ tree }: Props) => {
  const [state, setState] = useState(true)

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
      </Box>
    </>
  )
}

export const getStaticProps = async () => {
  const posts = await readPosts('posts')

  return {
    props: {
      tree: posts,
    },
  }
}

export default Index
