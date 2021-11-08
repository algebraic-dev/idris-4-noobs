import { Box as Link, Text as Paragraph, chakra } from '@chakra-ui/react'
import { FaArrowRight } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'

import Sidebar from '@components/Sidebar'
import Menu from '@components/Menu'
import Code from '@components/Code'
import Header from '@components/Header'
import Pushable from '@components/Pushable'

import { PostPaths } from '@lib/post_utils'
import { readPosts } from '@lib/posts'
import Lambda from '@components/Lambda'

const example = `IntOrString : (isInt : Bool) -> Type
IntOrString True = Int
IntOrString False = String

getAnswer : (val : Bool) -> IntOrString val
getAnswer True = 42
getAnswer False = "Hello, World!"
`

const Button = ({ children, href }: { children: string; href: string }) => (
  <NextLink href={href}>
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
      my={['5', '5', '1']}
      border="1px solid gray"
      _hover={{
        bgColor: 'gray',
        textColor: 'white',
      }}
    >
      {children}
      <FaArrowRight />
    </Link>
  </NextLink>
)

const Index = ({ tree }: { tree: PostPaths }) => {
  const [state, setState] = useState(true)
  const [isMounted, setMounted] = useState(false)

  useEffect(() => {
    let str = window.localStorage.getItem('menu')

    if (window.innerWidth < 600) {
      setState(false)
    } else {
      setState(str ? str === 'true' : state)
    }

    // Just to make the animation not bounce in the beggining..
    setTimeout(() => setMounted(true))

    // Cannot use this rule because Next.js would render it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setMenu = () => {
    setState(!state)
    if (typeof window != 'undefined') {
      localStorage.setItem('menu', !state ? 'true' : 'false')
    }
  }

  return (
    <>
      <Head>
        <title>Idris2Noobs - Home</title>
        <meta
          name="description"
          content="Idris2Noobs is a website to learn how to program in the dependently typed language called Idris2"
        />
      </Head>
      <Sidebar
        enabled={state}
        onClick={setMenu}
        fileTree={tree}
        isMounted={isMounted}
      ></Sidebar>
      <Pushable enabled={state} size="20em" isMounted={isMounted}>
        <Menu color="black" onClick={setMenu}></Menu>
        <Link w={['80%', '80%', '80%']} margin="auto">
          <Lambda />
          <chakra.hr />
          <Header my={12}>Idris2Noobs</Header>
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
              <br />
              <chakra.p textColor="brand.text-faded">
                Idris2 é uma linguagem de programação <strong>funcional</strong>{' '}
                com <strong>tipos dependentes</strong> que encoraja voce a
                construir programas com menos erros e mais seguros usando o{' '}
                <i>Type driven development</i>
              </chakra.p>
            </Paragraph>
            <Link my={{ md: 10, lg: 0 }} w={{ md: '100%', lg: '50%' }}>
              <Code p={0} className="language-idris">
                {example}
              </Code>
            </Link>
          </Link>
          <Link display={{ md: 'box', lg: 'flex' }} gridGap={10} my={12}>
            <Button href="/posts/introdução/funcoes">Começar!</Button>
            <Button href="/">Discord Server</Button>
            <Button href="/">Abra um Issue!</Button>
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
    props: { tree: posts },
  }
}

export default Index
