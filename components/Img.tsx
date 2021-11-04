import { Image } from '@chakra-ui/react'

interface Props {
  src: string
  alt: string
}

const Img = ({ src, alt }: Props) => {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <Image
      w="full"
      borderRadius="md"
      mb="10"
      position="relative"
      src={src}
      alt={alt}
    ></Image>
  )
}

export default Img
