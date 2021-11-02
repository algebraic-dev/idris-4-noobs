import { Text, Flex, Spacer, chakra } from '@chakra-ui/react'
import { VscMenu } from 'react-icons/vsc'

import styles from './index.module.css'

interface Props {
  children: string
  href: string
}

const Item = ({ href, children }: Props) => (
  <chakra.a href={href} textColor="black" className={styles['menu-item']}>
    {children}
  </chakra.a>
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
