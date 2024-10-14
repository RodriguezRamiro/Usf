"""Forms for playlist app."""

from wtforms import StringField, TextAreaField, SelectField, SubmitField
from wtforms.validators import DataRequired
from flask_wtf import FlaskForm


class PlaylistForm(FlaskForm):
    """Form for adding playlists."""

    name = StringField('Playlist Name', validators=[DataRequired(message="Please enter a playlist name.")])
    description = TextAreaField('Description', validators=[DataRequired(message="Please enter a description.")])
    submit = SubmitField('Create Playlist')


class SongForm(FlaskForm):
    """Form for adding songs."""

    title = StringField('Song Title', validators=[DataRequired(message="Please enter a song title.")])
    artist = StringField('Artist', validators=[DataRequired(message="Please enter the artist's name.")])
    submit = SubmitField('Add Song')


# DO NOT MODIFY THIS FORM - EVERYTHING YOU NEED IS HERE
class NewSongForPlaylistForm(FlaskForm):
    """Form for adding a song to playlist."""

    song = SelectField('Song To Add', coerce=int)
