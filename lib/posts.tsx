import path from 'path'
import matter from 'gray-matter'
import { promises as fs } from 'fs'
import { PostData, PostDir, PostFile } from './post_utils'

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

export { readPosts, readPost, getResourceFolder, getPost }
export type { PostDir, PostFile, PostData }
