import { Text } from '@chakra-ui/react'

interface Props {
  children: String
}

const Title = ({ children }: Props) => (
  <Text
    fontFamily="Lato"
    fontSize="5xl"
    textColor="brand.text-title"
    margin="12"
    mt="8"
    mb="0"
    textAlign="center"
  >
    {children}
  </Text>
)

export default Title
