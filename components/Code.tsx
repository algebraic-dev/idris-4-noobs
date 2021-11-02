import React, { useEffect } from 'react'
import { Box, Code as CCode, chakra } from '@chakra-ui/react'
import Prism from 'prismjs'

import 'prismjs/components/prism-haskell'
import 'prismjs/components/prism-idris'

interface Props {
  children: string
  className: string
  width?: string
  my?: number
  p?: number
}

const Code = ({ className, children, width, p = 10, my = 10 }: Props) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <Box m={p} flexGrow={1} w={width}>
      <chakra.pre border="1px solid #afafaf" borderRadius={5} w="100%" p={5}>
        <CCode className={className}>{children}</CCode>
      </chakra.pre>
    </Box>
  )
}

export default Code
