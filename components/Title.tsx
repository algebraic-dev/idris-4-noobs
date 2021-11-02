import { Text } from '@chakra-ui/react'

interface Props {
  children: String
}

const Title = ({ children }: Props) => (
  <Text
    fontFamily="fonts.lato"
    fontSize="5xl"
    margin="12"
    marginTop="16"
    textAlign="center"
  >
    {children}
  </Text>
)

export default Title
