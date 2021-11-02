import { readPosts } from '@lib/posts'

const Post = () => {
  return <div className="wrapper"></div>
}

export const getStaticProps = async () => {
  const posts = await readPosts('posts')
  return { props: { source: '' } }
}

export default Post
