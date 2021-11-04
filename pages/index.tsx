import { Box as Link, Text as Paragraph, chakra } from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import { PostDir, PostFile } from '@lib/posts'
import { readPosts } from '@lib/posts'
import { useState } from 'react'

import Sidebar from '@components/Sidebar'
import Menu from '@components/Menu'
import Code from '@components/Code'
import Header from '@components/Header'
import Pushable from '@components/Pushable'
import { PostPaths } from '@lib/post_utils'

const example = `IntOrString : (isInt : Bool) -> Type
IntOrString True = Int
IntOrString False = String

getAnswer : (val : Bool) -> IntOrString val
getAnswer True = 42
getAnswer False = "Hello, World!"
`

const Button = ({ children }: { children: string }) => (
  <Link
    display="flex"
    alignItems="center"
    justifyContent="center"
    cursor="pointer"
    textAlign="center"
    gridGap={7}
    flexGrow={1}
    transition="ease-in-out"
    transitionDuration="200ms"
    transitionTimingFunction="ease-in-out"
    py={3}
    my={['5', '5', '0']}
    border="1px solid gray"
    _hover={{
      bgColor: 'gray',
      textColor: 'white',
    }}
  >
    {children}
    <FaArrowRight />
  </Link>
)

const Index = ({ tree }: { tree: PostPaths }) => {
  const [state, setState] = useState(true)

  return (
    <>
      <Sidebar
        enabled={state}
        blackTheme={false}
        onClick={() => setState(!state)}
        fileTree={tree}
      ></Sidebar>

      <Pushable enabled={state} size="20em">
        <Menu color="black" onClick={() => setState(!state)}></Menu>
        <Link w={['80%', '80%', '80%']} margin="auto">
          <chakra.hr my={4} />
          <Header my={8}>Idris2Noobs</Header>
          <Link
            display={{ md: 'box', lg: 'flex' }}
            gridGap={10}
            alignItems="center"
          >
            <Paragraph w={{ md: '100%', lg: '50%' }} textAlign="justify">
              <chakra.p textColor="brand.text-faded">
                Idris2Noobs é um website feito para pessoas que querem aprender
                ou melhorar a arte de programar em Idris.{' '}
              </chakra.p>
              <chakra.p textColor="brand.text-faded">
                Idris2 é uma linguagem de programação <strong>funcional</strong>{' '}
                com <strong>tipos dependentes</strong> que encoraja voce a
                construir programas com menos erros e mais seguros usando o{' '}
                <i>Type driven development</i>
              </chakra.p>
            </Paragraph>
            <Link my={{ md: 10, lg: 0 }} w={{ md: '100%', lg: '50%' }}>
              <Code my={6} p={0} className="language-idris">
                {example}
              </Code>
            </Link>
          </Link>
          <Link display={{ md: 'box', lg: 'flex' }} gridGap={10} my={8}>
            <Button>Começar!</Button>
            <Button>Discord Server</Button>
            <Button>Abra um Issue!</Button>
          </Link>
          <chakra.hr my={10} />
          <Header my={24}>Mas para que aprender Idris?</Header>
          <Paragraph>
            Em idris, tipos são construções que podem carregar valores e que
            podem ser passados como argumento, ou seja, são{' '}
            <strong>first class</strong>! Com isso, podemos fazer tipos que em
            outras linguagens são muito abrangentes ou muito restritivos, e
            deixar nosso programa com a menor quantidade de erros possiveis.
            Alem disso, há tipos lineares que nos ajudam a conhecer o estado de
            um recurso em tempo de compilação e ajuda a evitar problemas
            envolvendo duplicação, impureza e até data races (pela
            impossibilidade de utilizar o mesmo recurso linear em dois lugares
            diferentes). Alguns exemplos de coisas que podemos fazer com esses
            recursos
            <chakra.ul mt={2}>
              <li>
                Manter o tamanho de uma lista dentro do tipo e conseguir ver
                relações entre duas listas de tamanhos iguais em tempo de
                compilação
              </li>
              <li>
                Manter o tipo de um valor dependente de outro valor. Por
                exemplo, uma tupla onde o primeiro elemento que é um Int define
                qual o tipo do segundo elemento.
              </li>
              <li>Provar formalmente as propriedades do seu programa</li>
            </chakra.ul>
          </Paragraph>
          <Link margin="100" w="100%"></Link>
        </Link>
      </Pushable>
    </>
  )
}

export const getStaticProps = async () => {
  const posts = await readPosts('posts')

  return {
    props: {
      tree: posts,
    },
  }
}

export default Index
