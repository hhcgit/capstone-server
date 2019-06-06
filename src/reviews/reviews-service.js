const xss = require('xss')

const PostsService = {
  getAllPosts(db) {
    return db
      .from('cactus_posts AS pos')
      .select(
        'pos.id',
        'pos.title',
        'pos.date_created',
        'pos.cactus_text',
      )
//       .leftJoin(
//         'cactus_reviews AS rev',
//         'pos.id',
//         'rev.post_id',
//       )
//       .leftJoin(
//         'cactus_users AS usr',
//         'pos.cactus_id',
//         'usr.id',
//       )
//       .groupBy('pos.id', 'usr.id')
  },

  getById(db, id) {
    return PostsService.getAllPosts(db)
      .where('pos.id', id)
      .first()
  },

  getReviewsForPost(db, post_id) {
    return db
    .from('cactus_reviews AS rev')
    .select(
      'rev.id',
      'rev.content',
      'rev.rating',
      'rev.date_created',
      'rev.user_id',
      'rev.post_id'
      )
      .leftJoin('cactus_users AS u', 'u.id', 'rev.user_id')
      .select(
        'u.user_name'
      )
      .leftJoin('cactus_posts AS p', 'p.id', 'rev.post_id')
      .where('p.id', '=', post_id)
  },

  serializePost(post) {
    return {
      id: post.id,
      title: xss(post.title),
      content: xss(post.cactus_text),
      date_created: new Date(post.date_created)
    }
  },

  serializePostReviews(reviews) {
    return {
      id: reviews.id,
      post_id: reviews.post_id,
      content: xss(reviews.content),
      date_created: new Date(reviews.date_created),
      user: {
        id: reviews.user_id,
        user_name: reviews.user_name
      },
    }
  },
}

module.exports = PostsService
