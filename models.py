"""Models for Playlist app."""

from flask_sqlalchemy import SQLAlchemy
from flask_wtf import FlaskForms
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired,
from sqlalchemy.orm import relationship



db = SQLAlchemy()


class Playlist(db.Model):
    """Playlist with name and validation."""

    __tablename__ = 'playlist_song'

    playlist_id = db.Column(db.Integer, db.ForeignKey('playlist.id'), primary_key=True)
    song_id = db.Column(db.Integer, db.ForeignKey('song.id'), primary_key=True)


    # ADD THE NECESSARY CODE HERE


class Song(db.Model):
    """Song model with title, artist, and relationship to playlists."""

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    artist = db.Column(db.String(100))
    # Add more fields as needed (e.g., album, release_year, genre)

    # Relationship with Playlist model
    playlists = relationship('Playlist', secondary='playlist_song', back_populates='songs')

    # ADD THE NECESSARY CODE HERE


class PlaylistSong(db.Model):
    """Mapping of a playlist to a song."""

    __tablename__ = 'playlist_song'  # Custom table name (optional)

    playlist_id = db.Column(db.Integer, db.ForeignKey('playlist.id'), primary_key=True)
    song_id = db.Column(db.Integer, db.ForeignKey('song.id'), primary_key=True)

    # ADD THE NECESSARY CODE HERE


# DO NOT MODIFY THIS FUNCTION
def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)
