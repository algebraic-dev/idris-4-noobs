import { Text } from '@chakra-ui/react'

interface Props {
  children: String
}

const Description = ({ children }: Props) => (
  <Text
    fontSize="xl"
    textAlign="center"
    margin="auto"
    w={['80%', '60%', '50%']}
    fontFamily="Lato"
    my="8"
    fontStyle="italic"
    className="leading-8 text-gray-600"
  >
    {children}
  </Text>
)

export default Description
