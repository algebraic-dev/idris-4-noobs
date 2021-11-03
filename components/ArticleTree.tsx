import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  chakra,
} from '@chakra-ui/react'

import { PostDir, PostFile } from '@lib/posts'

const Module = ({ name }: { name: string }) => (
  <Box
    fontSize="12"
    fontWeight="bold"
    textColor="brand.text-main"
    fontFamily="lato"
    textTransform="uppercase"
  >
    {name}
  </Box>
)

const File = ({ name, selected }: { name: string; selected: boolean }) => (
  <Box fontFamily="lato" textColor="brand.text-side-faded" fontSize="15">
    {name}
  </Box>
)

const ArticleItem = ({
  fileTree,
  depth,
  url,
  selected,
}: {
  fileTree: PostDir | PostFile
  depth: number
  url: string
  selected?: PostFile
}) => {
  switch (fileTree.type) {
    case 'Dir': {
      return (
        <Accordion
          defaultIndex={depth == 0 ? [0] : []}
          allowMultiple
          p="0"
          margin="0"
        >
          <AccordionItem border="none" p="0">
            <AccordionButton borderRadius="7px" margin="0px" py={2}>
              <Module name={fileTree.name}></Module>
            </AccordionButton>
            <AccordionPanel py={0}>
              {fileTree.posts.map(tree => (
                <ArticleItem
                  depth={depth + 1}
                  key={tree.filename}
                  selected={selected}
                  fileTree={tree}
                  url={
                    url + '/' + fileTree.name.toLowerCase().replace(/ /g, '-')
                  }
                ></ArticleItem>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )
    }
    case 'File': {
      return (
        <AccordionItem
          py={2}
          px={2}
          my={1}
          borderY="none"
          borderRight="none"
          borderLeftColor={
            selected == fileTree ? 'brand.text-side-faded' : 'transparent'
          }
          borderLeftWidth="3px"
          transition="0.2s background"
          _hover={{
            bgColor: 'rgba(0,0,0, 0.1)',
          }}
        >
          <a href={url + '/' + fileTree.filename}>
            <File
              name={fileTree.data.data.title}
              selected={selected == fileTree}
            ></File>
          </a>
        </AccordionItem>
      )
    }
  }
}

const ArticleTree = ({
  fileTree,
  selected,
}: {
  fileTree: (PostDir | PostFile)[]
  selected?: PostFile
}) => {
  return (
    <Accordion>
      {fileTree.map(tree => (
        <ArticleItem
          url="/posts"
          depth={0}
          fileTree={tree}
          key={tree.type == 'Dir' ? tree.name : tree.filename}
          selected={selected}
        ></ArticleItem>
      ))}
    </Accordion>
  )
}

export default ArticleTree
