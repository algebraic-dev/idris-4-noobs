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
    marginTop="8"
    textAlign="center"
  >
    {children}
  </Text>
)

export default Title
