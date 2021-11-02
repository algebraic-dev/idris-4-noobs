import type { AppProps } from 'next/app'
import 'styles/syntaxhighlight.css'

import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    line: 'linear-gradient(#000, #000) right bottom/0 2px no-repeat',
    principal: '#D73A49',
  },
  fonts: {
    sans: 'Inter, sans-serif',
    lato: 'Lato, sans-serif',
    crimson: 'Crimson Text, sans-serif',
  },
}

const theme = extendTheme({ colors })

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
