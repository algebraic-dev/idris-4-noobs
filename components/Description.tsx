import { Text } from '@chakra-ui/react'

interface Props {
  children: String
}

const Description = ({ children }: Props) => (
  <Text
    fontSize="2xl"
    textAlign="center"
    margin="auto"
    width={['80%', '60%', '50%']}
    fontFamily="Crimson Text"
    marginY="5"
    fontStyle="italic"
    className="leading-8 text-gray-600"
  >
    {children}
  </Text>
)

export default Description
