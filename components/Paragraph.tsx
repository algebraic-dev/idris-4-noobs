import { Text } from '@chakra-ui/react'

interface Props {
  children: string
  width?: string
}

const Paragraph = ({ children, width = '100%' }: Props) => {
  return (
    <Text
      mb="1"
      textAlign="justify"
      w={width}
      textColor="brand.text-faded"
      lineHeight="8"
    >
      {children}
    </Text>
  )
}

export default Paragraph
