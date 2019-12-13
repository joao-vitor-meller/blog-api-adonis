'use strict'
 
const Post = use('App/Models/Post')
const Helpers = use('Helpers')
 
 
class ImageController {
  async store({ params, request }) {
    const post = await Post.findOrFail(params.id)
 
    const image = request.file('image', {
      types: ['image'],
      size: '2mb'
    })
 
    await image.move(Helpers.tmpPath('uploads'), {
      name: `${Date.now()}-${image.clientName}`
    })
 
    if (!image.moved())
      return image.error()
 
    await post.image().create({ path: image.fileName })
  }

  async show ({ params, response }) {
    return response.download(Helpers.tmpPath(`uploads/${params.path}`))
  }

}
 
module.exports = ImageController