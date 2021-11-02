import { chakra, Text } from '@chakra-ui/react'

interface Props {
  children: string
}

const InlineCode = ({ children }: Props) => {
  return <chakra.span textColor="brand.principal">{children}</chakra.span>
}

export default InlineCode
