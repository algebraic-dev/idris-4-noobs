import { Box } from '@chakra-ui/react'

interface Props {
  children: React.ReactNode
  enabled?: boolean
  size: string
}

const Pushable = ({ children, enabled, size }: Props) => {
  return (
    <Box
      marginLeft={['0rem', '0rem', enabled ? size : '0rem']}
      transition="ease-in-out"
      transitionDuration="700ms"
      transitionTimingFunction="ease-in-out"
    >
      {children}
    </Box>
  )
}

export default Pushable
