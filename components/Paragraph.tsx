import { Text } from '@chakra-ui/react'

interface Props {
  children: string
}

const Paragraph = ({ children }: Props) => {
  return (
    <Text marginBottom="1" textColor="brand.text-faded" lineHeight="8">
      {children}
    </Text>
  )
}

export default Paragraph
