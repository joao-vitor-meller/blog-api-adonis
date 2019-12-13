'use strict'
 
const Post = use('App/Models/Post')
 
class PostController {
 
  async index ({ request, response }) {
    const posts = await Post
                        .query()
                        .with('image')
                        .fetch()
    return posts
  }
 
  async store ({ auth, request, response }) {
    const { id } = auth.user // não precisa mais ser passado no body da req
    const data = request.only(['title', 'body'])
    const post = await Post.create({ ...data, user_id: id })
    return post
  }

  async show ({ params, request, response }) {
    const post = await Post.findOrFail(params.id)
    await post.load('image')
    return post
  }
 
  async update ({ auth, params, request, response }) {
    const post = await Post.findOrFail(params.id)
    if (post.user_id !== auth.user.id) // user é o dono do post?
      return response.unauthorized({ error: 'Not authorized' }) // shorthand de "return response.status(401).send({ error: 'Not authorized' })"
    const data = request.only(['title', 'body'])
    post.merge(data)
    await post.save()
    return post
  }
 
  async destroy  ({ auth, params, response }) {
    const post = await Post.findOrFail(params.id)
    if (post.user_id !== auth.user.id) 
      return response.unauthorized({ error: 'Not authorized' }) 
    await post.delete()
  }
}
 
module.exports = PostController