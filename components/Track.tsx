import { Text, Box } from '@chakra-ui/react'
import { intersperse } from '@lib/utils'

interface CircleProps {
  marked: boolean
  title: string
  number: number
}

interface Trackable {
  title: string
  number: number
}

const Line = () => <Box width="16" height="1" bgColor="brand.principal"></Box>

const Circular = ({ marked, title, number }: CircleProps) => (
  <Box
    width="14"
    height="14"
    bgColor="brand.principal"
    color="white"
    className="text-center"
    display="block"
    borderRadius="30px"
    textAlign="center"
  >
    <Text lineHeight="3.5rem">{number}</Text>
    <Box height="0" marginTop="2" textColor="brand.principal">
      {title}
    </Box>
  </Box>
)

const Track = ({ tracks }: { tracks: Trackable[] }) => {
  const mapped = tracks.map(({ number, title }: Trackable) => (
    <Circular
      marked={true}
      number={number}
      title={title}
      key={title}
    ></Circular>
  ))

  return (
    <Box
      marginX="auto"
      marginTop="12"
      marginBottom="20"
      alignItems="center"
      width="fit-content"
      display="flex"
    >
      {mapped.length > 0
        ? mapped
            .slice(1)
            .reduce(
              (res, component) =>
                res.concat(
                  <Line key={'line-' + component.key}></Line>,
                  component
                ),
              [mapped[0]]
            )
        : 0}
    </Box>
  )
}

export { Track }
export type { Trackable }
