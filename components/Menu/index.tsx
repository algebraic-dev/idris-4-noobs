import { Text, Flex, Spacer, Box } from '@chakra-ui/react'
import { VscMenu } from 'react-icons/vsc'
import Link from 'next/link'

import styles from './index.module.css'

interface Props {
  children: string
  href: string
}

const Item = ({ href, children }: Props) => (
  <Box textColor="black" className={styles['menu-item']}>
    <Link href={href}>{children}</Link>
  </Box>
)

const Menu = ({ onClick, color }: { color: string; onClick: () => void }) => (
  <Flex p="12" gridGap={12} alignItems="center">
    <Text cursor="pointer">
      <VscMenu color={color} size={20} onClick={() => onClick()} />
    </Text>
    <Spacer />
    <Flex gridGap="10">
      <Item href="/">home</Item>
      <Item href="#">discord</Item>
    </Flex>
  </Flex>
)

export default Menu
