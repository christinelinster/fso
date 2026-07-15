const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const { url, title, author, likes } = request.body

  const user = request.user
  if (!user) {
    return response.status(404).json({ error: 'userId missing or not valid' })
  }

  if (!(title && url)) {
    return response.status(400).json({ error: 'title and url required' })
  }

  const blog = new Blog({
    url,
    title,
    author: author ?? '',
    likes: likes ?? 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog does not exist' })
  }
  blog.title = title
  blog.author = author
  blog.likes = likes
  blog.url = url
  const savedBlog = await blog.save()
  response.json(savedBlog)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const userId = request.user
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).json({ error: 'blog does not exist' })
  }
  if (blog.user.toString() !== userId) {
    return response.status(401).json({ error: 'only the author can delete this blog' })
  }
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogRouter
