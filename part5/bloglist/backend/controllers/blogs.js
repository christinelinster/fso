const jwt = require('jsonwebtoken')

const blogRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.json(401).json({error: 'token invalid'})
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({error: 'userId missing or not valid'})
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = blog.save()
  user.blogs = user.blogs.concat(savedBlog)
  await user.save()
  response.status(201).json(savedNote)
})

blogRouter.put('/:id', (request, response, next) => {
  const { title, author, url, likes } = request.body
  Blog.findById(request.params.id)
    .then(blog => {
      if (!blog) {
        return response.status(404).end()
      }

      blog.title = title
      blog.author = author
      blog.url = url
      blog.likes = likes

      blog.save().then(updatedBlog => {
        response.json(updatedBlog)
      })
        .catch(error => next(error))

    })
})

blogRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))

})
module.exports = blogRouter
