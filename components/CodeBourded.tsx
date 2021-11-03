import React, { useEffect } from 'react'
import { Box, Code, chakra } from '@chakra-ui/react'
import Prism from 'prismjs'

import 'prismjs/components/prism-haskell'
import 'prismjs/components/prism-idris'

interface Props {
  children: string
  className: string
  width?: string
  my?: number
}

const CodeBourded = ({ className, children, width, my = 10 }: Props) => {
  useEffect(() => Prism.highlightAll(), [])
  return (
    <Box my={my} mx={1} flexGrow={1} width="100%" w={width ? width : ''}>
      <chakra.pre border="1px solid grey" boxShadow="none">
        <Code className={className} boxShadow="none">
          {children}
        </Code>
      </chakra.pre>
    </Box>
  )
}

export default CodeBourded
