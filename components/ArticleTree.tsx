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
    fontSize="15"
    fontWeight="bold"
    textColor="brand.text-main"
    fontFamily="lato"
  >
    {name}
  </Box>
)

const File = ({ name }: { name: string }) => (
  <Box fontFamily="lato" textColor="brand.text-main" fontSize="15">
    {name}
  </Box>
)

const ArticleItem = ({
  fileTree,
  depth,
  url,
}: {
  fileTree: PostDir | PostFile
  depth: number
  url: string
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
            <AccordionButton margin="0px" py={2}>
              <Module name={fileTree.name}></Module>
            </AccordionButton>
            <AccordionPanel py={0}>
              {fileTree.posts.map(tree => (
                <ArticleItem
                  depth={depth + 1}
                  key={tree.filename}
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
        <AccordionItem py={2} px={2} border="none">
          <a href={url + '/' + fileTree.filename}>
            <File name={fileTree.data.data.title}></File>
          </a>
        </AccordionItem>
      )
    }
  }
}

const ArticleTree = ({ fileTree }: { fileTree: (PostDir | PostFile)[] }) => {
  return (
    <Accordion>
      {fileTree.map(tree => (
        <ArticleItem
          url="/posts"
          depth={0}
          fileTree={tree}
          key={tree.type == 'Dir' ? tree.name : tree.filename}
        ></ArticleItem>
      ))}
    </Accordion>
  )
}

export default ArticleTree
