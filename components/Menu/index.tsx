import { Text, Flex, Spacer } from '@chakra-ui/react'
import styles from './index.module.css'

import { VscMenu } from 'react-icons/vsc'

interface Props {
  children: string
  color: string
}

const Item = ({
  href,
  children,
  color,
}: {
  href: string
  color: string
  children: string
}) => (
  <Text
    textTransform="uppercase"
    textColor={color}
    className={styles['menu-item']}
  >
    <a href={href} className="bg-line menu-item">
      {children}
    </a>
  </Text>
)

const Menu = ({ onClick, color }: { color: string; onClick: () => void }) => (
  <Flex padding="12">
    <Text cursor="pointer">
      <VscMenu color={color} size={20} onClick={() => onClick()} />
    </Text>
    <Spacer />
    <Flex gridGap="10">
      <Item color={color} href="#">
        home
      </Item>
      <Item color={color} href="#">
        discord
      </Item>
    </Flex>
  </Flex>
)

export default Menu
