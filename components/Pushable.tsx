import { Box } from '@chakra-ui/react'

interface Props {
  children: React.ReactNode
  enabled?: boolean
  size: string
  isMounted: boolean
}

const Pushable = ({ children, enabled, size, isMounted }: Props) => {
  return (
    <Box
      marginLeft={['0rem', '0rem', enabled ? size : '0rem']}
      transition="ease-in-out"
      transitionDuration={isMounted ? '700ms' : '0ms'}
      transitionTimingFunction="ease-in-out"
    >
      {children}
    </Box>
  )
}

export default Pushable
