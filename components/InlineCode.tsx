import { chakra } from '@chakra-ui/react'

interface Props {
  children: string
}

const InlineCode = ({ children }: Props) => {
  return (
    <chakra.span
      p={1}
      borderRadius="5px"
      bgColor="rgba(var(--chakra-colors-brand-main-rgb), .2)"
      textColor="brand.main"
    >
      {children}
    </chakra.span>
  )
}

export default InlineCode
