import { Text } from '@chakra-ui/react'

interface Props {
  children: string
}

const Paragraph = ({ children }: Props) => {
  return (
    <Text marginBottom="5" textColor="gray.700" lineHeight="9">
      {children}
    </Text>
  )
}

export default Paragraph
