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


-- music 테이블
CREATE TABLE IF NOT EXISTS music (
    music_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    album_image TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO music(title, artist, album_image) VALUES("title1", "artist1", "dog1");
INSERT INTO music(title, artist, album_image) VALUES("title2", "artist2", "dog2");
INSERT INTO music(title, artist, album_image) VALUES("title3", "artist3", "dog3");


-- comment 테이블
CREATE TABLE IF NOT EXISTS comment (
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    music_id INTEGER,
   user_id INTEGER,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (music_id) REFERENCES music(music_id) ON DELETE CASCADE
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
);

INSERT INTO comment(content) VALUES("hihi");
INSERT INTO comment(content) VALUES("hello");
INSERT INTO comment(content) VALUES("bye");



-- like 테이블
CREATE TABLE IF NOT EXISTS likes (
       music_id INTEGER,
   user_id INTEGER,
   liked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (user_id, music_id),
   FOREIGN KEY (music_id) REFERENCES music(music_id) ON DELETE CASCADE
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE
)






