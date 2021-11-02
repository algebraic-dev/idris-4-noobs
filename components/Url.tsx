import { Link } from '@chakra-ui/react'

interface Props {
  children: string
  href: string
}

const Url = ({ children, href }: Props) => (
  <Link href={href} textDecoration="none" textColor="blue.600">
    {children}
  </Link>
)

export default Url
