import type { AppProps } from 'next/app'
import 'styles/syntaxhighlight.css'
import 'styles/global.css'

import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

const colors = {
  brand: {
    degrade: 'linear-gradient(95.12deg, #FE8450 1.96%, #CB2B3A 101.85%)',
    line: 'linear-gradient(#000, #000) right bottom/0 2px no-repeat',
    main: '#D73A49',
    'main-rgb': '215, 58, 73',
    'main-darker': '#932530',
    'text-main': 'white',
    'text-faded': '#373737',
    'text-side-faded': '#ffefef',
    'text-title': 'black',
  },
  fonts: {
    sans: 'Inter, sans-serif',
    lato: 'Lato, sans-serif',
    crimson: 'Crimson Text, sans-serif',
  },
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={extendTheme({ colors })}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
