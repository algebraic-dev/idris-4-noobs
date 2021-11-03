import { Text } from '@chakra-ui/react'

interface Props {
  children: string
  width?: string
}

const Paragraph = ({ children, width }: Props) => {
  return (
    <Text
      marginBottom="1"
      width={width ? width : 'auto'}
      textColor="brand.text-faded"
      lineHeight="8"
    >
      {children}
    </Text>
  )
}

export default Paragraph
