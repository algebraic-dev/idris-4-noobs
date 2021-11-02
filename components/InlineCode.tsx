import { chakra, Text } from '@chakra-ui/react'

interface Props {
  children: string
}

const InlineCode = ({ children }: Props) => {
  return (
    <chakra.span
      border="2px"
      p="1"
      borderRadius="5px"
      borderColor="rgba(var(--chakra-colors-brand-main-rgb), .5)"
      bgColor="rgba(var(--chakra-colors-brand-main-rgb), .2)"
      textColor="brand.main"
    >
      {children}
    </chakra.span>
  )
}

export default InlineCode
