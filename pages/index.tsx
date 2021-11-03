import { readPosts } from '@lib/posts'
import {
  Box,
  Text,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import Sidebar from '@components/Sidebar'
import Menu from '@components/Menu'
import { PostDir, PostFile } from '@lib/posts'
import { useState } from 'react'
import Code from '@components/Code'
import Header from '@components/Header'
import { FaArrowRight, FaSearch } from 'react-icons/fa'
import CodeBourded from '@components/CodeBourded'

const example = `IntOrString : (isInt : Bool) -> Type
IntOrString True = Int
IntOrString False = String

IntOrString : (isInt : Bool) -> Type
IntOrString True = Int
IntOrString False = String
`

const Button = ({ children }: { children: string }) => (
  <Box
    display="flex"
    alignItems="center"
    gridGap={7}
    justifyContent="center"
    p={3}
    flexGrow={1}
    border="1px solid gray"
    textAlign="center"
  >
    {children}
    <FaArrowRight />
  </Box>
)

const Index = ({ tree }: { tree: (PostDir | PostFile)[] }) => {
  const [state, setState] = useState(false)

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
        py="1px"
      >
        <Menu color="black" onClick={() => setState(!state)}></Menu>
        <Box width={['90%', '80%', '70%']} margin="auto">
          <Header my={0}>Its Idris!</Header>
          <Flex gridGap={10} alignItems="center">
            <Text width="50%" textAlign="justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              aliquam libero tortor. Aenean vulputate libero sit amet tempus
              pulvinar. Duis consequat semper ante eu rhoncus. Sed vel sapien
              aliquet, dignissim tellus iaculis, hendrerit justo. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Maecenas aliquam
              libero tortor. Aeneconsectetur adipiscing elit. Maecenas aliquam
            </Text>
            <CodeBourded my={0} className="language-idris">
              {example}
            </CodeBourded>
          </Flex>
          <Flex gridGap={10} mt={10}>
            <Button>Community</Button>
            <Button>Discord Server</Button>
            <Button>Open an Issue!</Button>
          </Flex>
          <Header>Its Idris!</Header>
          <Text textAlign="justify" mr="10">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            aliquam libero tortor. Aenean vulputate libero sit amet tempus
            pulvinar. Duis consequat semper ante eu rhoncus. Sed vel sapien
            aliquet, dignissim tellus iaculis, hendrerit justo. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Maecenas aliquam libero
            tortor. Aeneconsectetur adipiscing elit. Maecenas aliquam libero
            tortor. Aeneconsectetur adipiscing elit. Maecenas aliquam libero
            tortor. Aenean vulputate libero sit amet tempus pulvinar. Duis
            consequat semper ante eu rhoncus. Sed vel sapien aliquet
          </Text>

          <Box margin="100" width="100%"></Box>
        </Box>
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
