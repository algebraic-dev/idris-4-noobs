import { Text } from '@chakra-ui/react'

interface Props {
  children: string
  width?: string
}

const Paragraph = ({ children, width }: Props) => {
  return (
    <Text
      marginBottom="1"
      textAlign="justify"
      width={width ? width : '100%'}
      textColor="brand.text-faded"
      lineHeight="8"
    >
      {children}
    </Text>
  )
}

export default Paragraph
