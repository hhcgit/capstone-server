const express = require('express')
const PostsService = require('./reviews-service')
const xss = require('xss')
const postsRouter = express.Router()

const jsonBodyParser = express.json()

postsRouter
  .route('/')
  .get((req, res, next) => {
    PostsService.getAllPosts(req.app.get('db'))
      .then(posts => {
        res.json(posts.map(PostsService.serializePost))
      })
      .catch(next)
  })

postsRouter
  .route('/:post_id')
  .all(checkPostExists)
  .get((req, res) => {
    res.json(PostsService.serializePost(res.post))
  })
  .post(jsonBodyParser, (req, res, next) => {
    let newReview  = req.body

    for (const field of ['user_id', 'content', 'rating'])
    if (!newReview[field]) {
    return res.status(400).json({
      error: `Missing '${field}' in request body`
    })}
    newReview.content=xss(newReview.content)
    newReview.post_id=req.params.post_id
    req.app.get('db')
    .insert(newReview).into('cactus_reviews')
    .then(() => 
      PostsService.getReviewsForPost(
        req.app.get('db'),
        req.params.post_id
      ))
      .then(revs => res.json(revs.map(PostsService.serializePostReviews)) )

  })

postsRouter.route('/:post_id/reviews/')
  .all(checkPostExists)
  .get((req, res, next) => {
    PostsService.getReviewsForPost(
      req.app.get('db'),
      req.params.post_id
    )
      .then(reviews => {
        res.json(reviews.map(PostsService.serializePostReviews))
      })
      
      .catch(next)
  })
  

/* async/await syntax for promises */
async function checkPostExists(req, res, next) {
  try {
    const post = await PostsService.getById(
      req.app.get('db'),
      req.params.post_id
    )

    if (!post)
      return res.status(404).json({
        error: `Post doesn't exist`
      })

    res.post = post
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = postsRouter