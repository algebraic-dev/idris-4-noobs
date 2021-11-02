import path from 'path'
import matter from 'gray-matter'
import { promises as fs } from 'fs'

interface PostData {
  content: string
  data: {
    title: string
    description: string
  }
}

type PostFile = { type: 'File'; filename: string; data: PostData }
type PostDir = { type: 'Dir'; name: string; posts: PostFile[] }

const readPost = async (file: string): Promise<PostData> => {
  const text = (await fs.readFile(file)).toString('utf-8')
  const { content, data } = matter(text)

  return {
    content,
    data,
  } as PostData
}

const readDir = async (folder: string, name: string): Promise<PostDir> => {
  const files = await fs.readdir(folder)
  const filesContent = files.map(file => readFile(path.join(folder, file)))
  return {
    type: 'Dir',
    name,
    posts: await Promise.all(filesContent),
  }
}

const readFile = async (file: string): Promise<PostFile> => {
  const post = await getPost(file)
  return { type: 'File', filename: path.basename(file, '.mdx'), data: post }
}

const readPosts = async (folder: string): Promise<(PostFile | PostDir)[]> => {
  const postsNames = await fs.readdir(folder)
  const children = postsNames.map(async file => {
    let newPath = path.join(folder, file)
    let stat = await fs.stat(newPath)
    return await (stat.isDirectory()
      ? readDir(newPath, file)
      : readFile(newPath))
  })
  return await Promise.all(children)
}

const getResourceFolder = (folder: string) => path.join(process.cwd(), folder)

const getPost = (name: string) => readPost(path.join(process.cwd(), name))

// Generates path and the url form the three

const genUrl = (str: string) => str.toLowerCase().replace(/ /g, '-')

const genPathFile = (postFile: PostFile): [string, string] => [
  postFile.filename,
  postFile.filename + '.mdx',
]

const genPathDir = (postDir: PostDir): [string, string][] =>
  postDir.posts.map(file => [
    genUrl(postDir.name) + '/' + genPathFile(file)[0],
    postDir.name + '/' + file.filename,
  ])

const genPath = (list: (PostDir | PostFile)[]): [string, string][] =>
  list.map(a => (a.type == 'Dir' ? genPathDir(a) : [genPathFile(a)])).flat(1)

// findURL from path

function findData(
  tree: (PostDir | PostFile)[],
  path: string[]
): PostData | null {
  for (const node of tree) {
    if (node.type == 'File' && path[0] == node.filename) return node.data
    if (node.type == 'Dir' && path[0] == genUrl(node.name)) {
      for (const leaf of node.posts) {
        if (leaf.filename == path[1]) return leaf.data
      }
    }
  }
  return null
}

export {
  readPosts,
  readPost,
  getResourceFolder,
  getPost,
  genPath,
  findData,
  genUrl,
}
export type { PostDir, PostFile, PostData }
