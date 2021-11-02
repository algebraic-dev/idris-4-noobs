const intersperse = (list: JSX.Element[], Between: JSX.Element) => {
  if (list.length >= 1) {
    return list
      .slice(1)
      .reduce((r, a) => r.concat(<Between></Between>, a), [list[0]])
  }
  return []
}

export { intersperse }
