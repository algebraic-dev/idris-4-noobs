import { Box, Text, Flex, Spacer, Center, chakra } from '@chakra-ui/react'
import { PostDir, PostFile } from '@lib/posts'
import { VscChromeClose } from 'react-icons/vsc'
import ArticleTree from './ArticleTree'

interface Props {
  enabled: boolean
  blackTheme: boolean
  onClick: () => void
  fileTree: (PostDir | PostFile)[]
  selected?: PostFile
}

const Logo = () => (
  <Text
    width={['fit-content', 'fit-content', '100%']}
    fontSize="25px"
    textAlign="center"
    textColor="brand.text-main"
    fontWeight="600"
  >
    Idris2
    <chakra.span textColor="#94202B">Noobs</chakra.span>
  </Text>
)

const scrollBar = {
  '&::-webkit-scrollbar': {
    width: '7px',
  },
  '&::-webkit-scrollbar-track': {
    width: '10px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#9d1717',
  },
}

const Sidebar = ({
  enabled,
  blackTheme,
  onClick,
  fileTree,
  selected,
}: Props) => (
  <Box
    w={['100vw', '20rem']}
    h="100vh"
    top="0"
    left="0"
    bottom="0"
    bgColor="brand.main"
    position="fixed"
    zIndex="1"
    overflow="auto"
    transform={`translate(${enabled ? '0%' : '-100%'})`}
    transition="ease-in-out"
    transitionDuration="700ms"
    transitionTimingFunction="ease-in-out"
    p="15px"
    css={scrollBar}
  >
    <Flex paddingY="20px" textColor="brand.text-main" paddingX="10px">
      <Logo />
      <Spacer />
      <Center>
        <VscChromeClose size={20} onClick={() => onClick()} />
      </Center>
    </Flex>
    <Box paddingTop="10px">
      <ArticleTree fileTree={fileTree} selected={selected}></ArticleTree>
    </Box>
  </Box>
)

export default Sidebar
