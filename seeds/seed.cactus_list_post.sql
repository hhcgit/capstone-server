INSERT INTO cactus_lists (cactus_name) VALUES 
('Schlumbergera'),
('Mammillaria'),
('Echinopsis'),
('Astrophytum');

INSERT INTO cactus_posts (cactus_text, cactus_id, title) VALUES
('Good draw knew bred ham busy his hour. Ask agreed answer rather joy nature admire wisdom. Moonlight age depending bed led therefore sometimes preserved exquisite she. An fail up so shot leaf wise in. Minuter highest his arrived for put and.', 1, 'I like cactus'),
('Hopes lived by rooms oh in no death house. Contented direction september but end led excellent ourselves may. Ferrars few arrival his offered not charmed you. Offered anxious respect or he. On three thing chief years in money arise of. ',3, 'I like cactus'),
('Certainly elsewhere my do allowance at. The address farther six hearted hundred towards husband. Are securing off occasion remember daughter replying. Held that feel his see own yet. Strangers ye to he sometimes propriety in. She right plate seven has. Bed who perceive judgment did marianne. ',4, 'I like cactus');

INSERT INTO cactus_users (user_name, password, email) VALUES
('charlesczq', '$2a$12$ugBMgSol09RuVAfAmL599.NTI7m4Ay6FwJ7THp64aU2oqIxnYuRye','charlesczq@hotmail.com');

INSERT INTO cactus_reviews (content, rating, user_id, post_id) VALUES
('good cactus', 3, 2, 6),
('hi!', 2, 2, 5),
('nice', 3, 2, 4),
('good cactus', 3, 2, 5),
('hi!', 2, 2, 4),
('nice', 3, 2, 6),
('good cactus', 3, 2, 6),
('hi!', 2, 2, 5),
('nice', 3, 2, 4);