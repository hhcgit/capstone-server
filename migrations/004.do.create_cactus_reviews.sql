CREATE TABLE cactus_reviews (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    rating INTEGER NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    user_id INTEGER REFERENCES cactus_users(id) ON DELETE CASCADE NOT NULL,
    post_id INTEGER REFERENCES cactus_posts(id) ON DELETE CASCADE NOT NULL
);
