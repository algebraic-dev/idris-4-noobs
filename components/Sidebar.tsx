import { Box } from '@chakra-ui/react'

const Sidebar = ({ enabled }: { enabled: boolean }) => (
  <Box
    width={['100vw', '20rem']}
    height="100vh"
    top="0"
    left="0"
    bottom="0"
    easy
    bgColor="brand.principal"
    position="fixed"
    zIndex="1"
    transform={`translate(${enabled ? '0%' : '-100%'})`}
    transition="ease-in-out"
    transitionDuration="700ms"
    transitionTimingFunction="ease-in-out"
  ></Box>
)

export default Sidebar
