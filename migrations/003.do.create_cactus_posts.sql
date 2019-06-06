CREATE TABLE cactus_posts (
    id SERIAL PRIMARY KEY,
    cactus_text TEXT NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    cactus_id INTEGER REFERENCES cactus_lists(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL
);