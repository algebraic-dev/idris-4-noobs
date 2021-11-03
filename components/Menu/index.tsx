import { Text, Flex, Spacer, chakra } from '@chakra-ui/react'
import styles from './index.module.css'

import { VscMenu } from 'react-icons/vsc'

interface Props {
  children: string
  color: string
  href: string
}

const Item = ({ href, children, color }: Props) => {
  let theme = styles[color == 'white' ? 'menu-white' : 'menu-item']
  return (
    <chakra.a href={href} textColor={color} className={theme}>
      {children}
    </chakra.a>
  )
}

const Menu = ({ onClick, color }: { color: string; onClick: () => void }) => (
  <Flex padding="12">
    <Text cursor="pointer">
      <VscMenu color={color} size={20} onClick={() => onClick()} />
    </Text>
    <Spacer />
    <Flex gridGap="10">
      <Item color={color} href="/">
        home
      </Item>
      <Item color={color} href="#">
        discord
      </Item>
    </Flex>
  </Flex>
)

export default Menu
