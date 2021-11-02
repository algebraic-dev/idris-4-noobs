import React, { useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import Prism from 'prismjs'

import 'prismjs/components/prism-haskell'
import 'prismjs/components/prism-idris'

interface Props {
  children: string
  className: string
}

const Code = ({ className, children }: Props) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [])
  return (
    <Box my={10} mx={1}>
      <pre>
        <code className={className}>{children}</code>
      </pre>
    </Box>
  )
}

export default Code
