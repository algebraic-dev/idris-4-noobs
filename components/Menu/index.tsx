import { Text, Box, Flex, Spacer } from '@chakra-ui/react'
import styles from './index.module.css'

import { VscMenu } from 'react-icons/vsc'

interface Props {
  children: String
}

const Item = ({ href, children }: { href: string; children: string }) => (
  <Box className={styles['menu-item']}>
    <a href={href} className="bg-line menu-item">
      {children}
    </a>
  </Box>
)

const Menu = ({ onClick }: { onClick: () => void }) => (
  <Flex margin="12">
    <Box cursor="pointer">
      <VscMenu size={20} onClick={() => onClick()} />
    </Box>
    <Spacer />
    <Flex gridGap="10">
      <Item href="#">home</Item>
      <Item href="#">discord</Item>
    </Flex>
  </Flex>
)

export default Menu
