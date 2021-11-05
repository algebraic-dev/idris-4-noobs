import React, { useState } from 'react'
import { Box, Collapse, Spacer } from '@chakra-ui/react'
import { FaCheck, FaTimes } from 'react-icons/fa'

type State =
  | { type: 'wrong'; selected: number }
  | { type: 'correct'; selected: number }
  | { type: 'not selected' }

interface Props {
  question: React.ReactNode
  alts: string[]
  correct: number
  final: string
}

interface ButtonProps {
  children: React.ReactNode
  bgColor: string
  icon?: React.ReactNode
  onClick: () => void
}

let chooseByState = <T extends unknown>(
  state: State,
  index: number,
  arr: [T, T, T]
): T => {
  if (state.type == 'not selected' || state.selected != index) return arr[0]
  switch (state.type) {
    case 'correct':
      return arr[1]
    case 'wrong':
      return arr[2]
  }
}

const shuffle = <T extends unknown>(arr: T[]): T[] =>
  arr
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

const enumerate = <T extends unknown>(arr: T[]): [T, number][] =>
  arr.map((a, i) => [a, i])

// Components

const darken = (n: number) =>
  `linear-gradient(rgba(0, 0, 0, ${n}),rgba(0, 0, 0, ${n}))`

const Button = ({ children, onClick, bgColor, icon }: ButtonProps) => {
  let isTransparent = bgColor == 'transparent'
  return (
    <Box
      outline={isTransparent ? '1px solid #d1d1d1' : ''}
      textColor={isTransparent ? 'main.text-faded' : 'white'}
      borderRadius={5}
      w="100%"
      onClick={() => onClick()}
      background={bgColor}
      cursor="pointer"
      p={2}
      px={4}
      my={2}
      alignItems="center"
      display="flex"
      fontSize={17}
      transition="background"
      transitionDuration="200ms"
      _hover={{
        background: isTransparent ? '#d1d1d1' : `${darken(0.1)},${bgColor}`,
      }}
    >
      {children}
      <Spacer />
      {icon}
    </Box>
  )
}

const Quiz = ({ question, alts, correct, final }: Props) => {
  let [state, setState] = useState<State>({ type: 'not selected' })
  let [enumerated] = useState<[string, number][]>(shuffle(enumerate(alts)))

  const select = (idx: number): void => {
    if (idx == correct) {
      setState({ type: 'correct', selected: idx })
    } else {
      setState({ type: 'wrong', selected: idx })
    }
  }

  const Buttons = enumerated.map(([alt, idx]: [string, number]) => (
    <Button
      key={alt}
      onClick={() => select(idx)}
      bgColor={chooseByState(state, idx, ['transparent', '#57eb61', '#f33b3b'])}
      icon={chooseByState(state, idx, [
        null,
        <FaCheck key={1} />,
        <FaTimes key={2} />,
      ])}
    >
      {alt}
    </Button>
  ))

  return (
    <Box borderRadius={5} w="100%" p={5} pb={12} my={5}>
      <Box p={5} py={10} textAlign="center">
        {question}
      </Box>
      <Collapse in={state.type == 'correct'} animateOpacity>
        <hr />
        <Box alignItems="center" p={8} textAlign="center" overflow="hidden">
          {final}
        </Box>
      </Collapse>
      {Buttons}
    </Box>
  )
}

export default Quiz
