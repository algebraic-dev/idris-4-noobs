interface PostData {
  content: string
  data: {
    title: string
    description: string
  }
}

type PostFile = { type: 'File'; filename: string; data: PostData }
type PostDir = { type: 'Dir'; name: string; posts: PostFile[] }
type PostPaths = (PostDir | PostFile)[]

const genPathFile = (postFile: PostFile): [string, string] => [
  postFile.filename,
  postFile.filename + '.mdx',
]

const genPathDir = (postDir: PostDir): [string, string][] =>
  postDir.posts.map(file => [
    genUrl(postDir.name) + '/' + genPathFile(file)[0],
    postDir.name + '/' + file.filename,
  ])

const genPath = (list: PostPaths): [string, string][] =>
  list.map(a => (a.type == 'Dir' ? genPathDir(a) : [genPathFile(a)])).flat(1)

// findURL from path

const genUrl = (str: string) => str.toLowerCase().replace(/ /g, '-')

function findData(tree: PostPaths, path: string[]): PostFile | null {
  for (const node of tree) {
    if (node.type == 'File' && path[0] == node.filename) return node
    if (node.type == 'Dir' && path[0] == genUrl(node.name)) {
      for (const leaf of node.posts) {
        if (leaf.filename == path[1]) return leaf
      }
    }
  }
  return null
}

export { genPath, findData, genUrl }
export type { PostData, PostFile, PostDir, PostPaths }
