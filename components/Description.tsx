import { Text } from '@chakra-ui/react'

interface Props {
  children: String
}

const Description = ({ children }: Props) => (
  <Text
    fontSize="xl"
    textAlign="center"
    margin="auto"
    width={['80%', '60%', '50%']}
    fontFamily="Lato"
    marginY="8"
    fontStyle="italic"
    className="leading-8 text-gray-600"
  >
    {children}
  </Text>
)

export default Description
