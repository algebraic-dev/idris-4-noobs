import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

interface PostData {  
  name: string
  content: string
  data: {
     title: string,
     description: string
  }
}

const readPost = async (file: string) : Promise<PostData> => {
 const text = (await fs.readFile(file)).toString('utf-8')
 const {content, data} = matter(text)
 return {content, data, name: path.basename(file, '.mdx')} as PostData
}

const readPosts = async (folder: string) => {
 const posts_names = await fs.readdir(folder)
 const promises = posts_names.map(name => readPost(path.join(folder, name)))
 return await Promise.all(promises)
}

const getResourceFolder = (folder: string) => 
  path.join(process.cwd(), folder)

const getPost = (name: string) => 
  readPost(path.join(getResourceFolder('posts'), name + '.mdx'))


export {readPosts, readPost, getResourceFolder, getPost}