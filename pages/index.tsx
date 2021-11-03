import { readPosts } from '@lib/posts'
import Sidebar from '@components/Sidebar'
import Menu from '@components/Menu'
import { PostDir, PostFile } from '@lib/posts'
import { useState } from 'react'
import Code from '@components/CodeBourded'
import Header from '@components/Header'
import { FaArrowRight, FaSearch } from 'react-icons/fa'

import {
  Box as Link,
  Text as Paragraph,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react'
import Pushable from '@components/Pushable'

const example = `IntOrString : (isInt : Bool) -> Type
IntOrString True = Int
IntOrString False = String

IntOrString : (isInt : Bool) -> Type
IntOrString True = Int
IntOrString False = String
`

const Button = ({ children }: { children: string }) => (
  <Link
    display="flex"
    alignItems="center"
    justifyContent="center"
    cursor="pointer"
    textAlign="center"
    gridGap={7}
    flexGrow={1}
    transition="ease-in-out"
    transitionDuration="200ms"
    transitionTimingFunction="ease-in-out"
    py={3}
    my={['5', '5', '0']}
    border="1px solid gray"
    _hover={{
      bgColor: 'gray',
      textColor: 'white',
    }}
  >
    {children}
    <FaArrowRight />
  </Link>
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

      <Pushable enabled={state} size="20em">
        <Menu color="black" onClick={() => setState(!state)}></Menu>
        <Link width={['90%', '80%', '80%']} margin="auto">
          <Header my={0}>Its Idris!</Header>
          <Link
            display={{ md: 'box', lg: 'flex' }}
            gridGap={10}
            alignItems="center"
          >
            <Paragraph width={{ md: '100%', lg: '50%' }} textAlign="justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              aliquam libero tortor. Aenean vulputate libero sit amet tempus
              pulvinar. Duis consequat semper ante eu rhoncus. Sed vel sapien
              aliquet, dignissim tellus iaculis, hendrerit justo. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Maecenas aliquam
              libero tortor. Aeneconsectetur adipiscing elit. Maecenas aliquam
            </Paragraph>
            <Link my={{ md: 10, lg: 0 }} width={{ md: '100%', lg: '50%' }}>
              <Code my={6} className="language-idris">
                {example}
              </Code>
            </Link>
          </Link>
          <Link display={{ md: 'box', lg: 'flex' }} gridGap={10} mt={5}>
            <Button>Community</Button>
            <Button>Discord Server</Button>
            <Button>Open an Issue!</Button>
          </Link>
          <Header>Its Idris!</Header>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            aliquam libero tortor. Aenean vulputate libero sit amet tempus
            pulvinar. Duis consequat semper ante eu rhoncus. Sed vel sapien
            aliquet, dignissim tellus iaculis, hendrerit justo. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Maecenas aliquam libero
            tortor. Aeneconsectetur adipiscing elit. Maecenas aliquam libero
            tortor. Aeneconsectetur adipiscing elit. Maecenas aliquam libero
            tortor. Aenean vulputate libero sit amet tempus pulvinar. Duis
            tortor. Aeneconsectetur adipiscing elit. Maecenas aliquam libero
            tortor. Aeneconsectetur adipiscing elit. Maecenas aliquam libero
            tortor. Aenean vulputate libero sit amet tempus pulvinar. Duis
            tortor. Aeneconsectetur adipiscing elit. Maecenas aliquam libero
            tortor. Aeneconsectetur adipiscing elit. Maecenas aliquam libero
            tortor. Aenean vulputate libero sit amet tempus pulvinar. Duiss
            consequat semper ante eu rhoncus. Sed vel sapien aliquet
          </Paragraph>
          <Link margin="100" width="100%"></Link>
        </Link>
      </Pushable>
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
