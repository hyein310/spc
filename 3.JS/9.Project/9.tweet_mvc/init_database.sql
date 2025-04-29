-- users 테이블
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users(username, email, password) VALUES("user1", "user1@example.com", "pw1");
INSERT INTO users(username, email, password) VALUES("user2", "user2@example.com", "pw2");
INSERT INTO users(username, email, password) VALUES("user3", "user3@example.com", "pw3");

-- 줄여쓰기
-- INSERT INTO user(username, email, password) VALUES
-- ("user1", "user1@example.com", "pw1"),
-- ("user2", "user2@example.com", "pw2"),
-- ("user3", "user3@example.com", "pw3");



-- tweet 테이블
CREATE TABLE IF NOT EXISTS tweet (
    tweet_id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    likes_count INTEGER DEFAULT 0, -- 3정규화에 의해 like 테이블을 항상 참조하지 않도록 여기에 포함
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

INSERT INTO tweet(content, user_id, likes_count) VALUES("hihi", 1, 5);
INSERT INTO tweet(content, user_id, likes_count) VALUES("hello" ,2, 0);
INSERT INTO tweet(content, user_id, likes_count) VALUES("bye" ,1, 2);


-- 좋아요 테이블
CREATE TABLE IF NOT EXISTS like (
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    tweet_id INTEGER,
    user_id INTEGER,
    liked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tweet_id) REFERENCES tweet(tweet_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);








