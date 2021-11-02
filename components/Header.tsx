import { Link, Box } from '@chakra-ui/react'
import { chdir } from 'process'

interface Props {
  children: string
}

const Header = ({ children }: Props) => {
  let sel = typeof children == 'string' ? children : children[0]
  let id = sel.toLowerCase().replace(/ /g, '-')
  return (
    <Box fontSize="5xl" marginY="16" marginBottom="2">
      <Link
        href={`#${id}`}
        id={id}
        fontStyle="italic"
        fontFamily="Crimson Text"
      >
        {children}
      </Link>
    </Box>
  )
}

export default Header
