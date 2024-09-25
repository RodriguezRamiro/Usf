-- Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Playlists Table
CREATE TABLE playlists (
    playlist_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    owner_id INTEGER REFERENCES users(user_id),
    cover_image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tracks Table
CREATE TABLE tracks (
    track_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    duration_ms INTEGER NOT NULL,
    popularity INTEGER,
    preview_url TEXT,
    album_id INTEGER REFERENCES albums(album_id),
    artist_id INTEGER REFERENCES artists(artist_id)
);

-- PlaylistTracks Table (Join Table)
CREATE TABLE playlist_tracks (
    playlist_id INTEGER REFERENCES playlists(playlist_id) ON DELETE CASCADE,
    track_id INTEGER REFERENCES tracks(track_id) ON DELETE CASCADE,
    PRIMARY KEY (playlist_id, track_id)
);

-- Artists Table
CREATE TABLE artists (
    artist_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    genre VARCHAR(255),
    popularity INTEGER
);

-- Albums Table
CREATE TABLE albums (
    album_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    release_date DATE,
    total_tracks INTEGER,
    cover_image_url TEXT,
    artist_id INTEGER REFERENCES artists(artist_id)
);

-- UserFavoriteTracks Table (Join Table)
CREATE TABLE user_favorite_tracks (
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    track_id INTEGER REFERENCES tracks(track_id) ON DELETE CASCADE,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, track_id)
);

-- UserFavoritePlaylists Table (Join Table)
CREATE TABLE user_favorite_playlists (
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    playlist_id INTEGER REFERENCES playlists(playlist_id) ON DELETE CASCADE,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, playlist_id)
);
