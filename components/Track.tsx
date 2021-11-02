import { Text, Box } from '@chakra-ui/react'

interface CircleProps {
  marked: boolean
  title: string
  number: number
  url: string
}

interface Trackable {
  title: string
  number: number
  url: string
}

const Line = () => <Box width="20" height="1" bgColor="brand.main"></Box>

const Circular = ({ marked, title, number, url }: CircleProps) => (
  <a href={'/posts/' + url}>
    <Box
      width="14"
      height="14"
      bgColor="brand.main"
      color="brand.text-main"
      className="text-center"
      display="block"
      borderRadius="50px"
      textAlign="center"
      transition="0.2s outline, 0.2s background, 0.2s width, 0.2s height"
      transitionTimingFunction="ease-in-out"
      outline="0px"
      borderWidth="5px"
      borderColor="transparent"
      _hover={{
        outline: '7px solid rgba(var(--chakra-colors-brand-main-rgb), .3)',
        bgColor: 'rgba(var(--chakra-colors-brand-main-rgb), .0)',
        borderColor: 'brand.main',
        borderWidth: '5px',
        textColor: 'brand.main',
      }}
    >
      <Box
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text>{number}</Text>
      </Box>
      <Box
        height="0"
        textTransform="uppercase"
        fontSize="11"
        marginTop="4"
        textColor="brand.main"
        width="30"
        marginLeft="-100%"
        marginRight="-100%"
        textAlign="center"
      >
        {title}
      </Box>
    </Box>
  </a>
)

const Track = ({ tracks }: { tracks: Trackable[] }) => {
  const mapped = tracks.map(({ number, title, url }: Trackable) => (
    <Circular
      marked={true}
      number={number}
      title={title}
      key={title}
      url={url}
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
        : []}
    </Box>
  )
}

export { Track }
export type { Trackable }
