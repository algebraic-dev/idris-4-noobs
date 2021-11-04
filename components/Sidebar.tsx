import { Box, Text, Flex, Spacer, chakra, Img, Center } from '@chakra-ui/react'
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
  <Flex
    w={['fit-content', 'fit-content', '100%']}
    fontSize="25px"
    textColor="brand.text-main"
    alignItems="end"
    fontWeight="600"
  >
    <Center margin="auto">
      <Img src="/Logo.svg" mr="2" w={4} />
      Idris2
      <chakra.span textColor="#b02c38">Noobs</chakra.span>
    </Center>
  </Flex>
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
    <Flex paddingY="15px" textColor="brand.text-main" paddingX="10px">
      <Logo />
      <Spacer />
      <Center display={{ md: 'none', lg: 'box' }}>
        <VscChromeClose size={16} onClick={() => onClick()} />
      </Center>
    </Flex>
    <Box pt="10px">
      <ArticleTree fileTree={fileTree} selected={selected}></ArticleTree>
    </Box>
  </Box>
)

export default Sidebar
