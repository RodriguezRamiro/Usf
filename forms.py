"""Forms for playlist app."""

from wtforms import SelectField
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired

class PlaylistForm(FlaskForm):
    """Form for adding playlists."""

    # Add the necessary code to use this form
    playlist_name = StringField('Playlist Name', validators=[DataRequired()])
    submit = SubmitField('Create Playlist')


class SongForm(FlaskForm):
    """Form for adding songs."""

    # Add the necessary code to use this form
    title = StringField('Song Title', validators=[DataRequired()])
    artist = StringField('Artist')
    submit = SubmitField('Add Song')


# DO NOT MODIFY THIS FORM - EVERYTHING YOU NEED IS HERE
class NewSongForPlaylistForm(FlaskForm):
    """Form for adding a song to playlist."""

    song = SelectField('Song To Add', coerce=int)
    submit = SubmitField('Add Song to Playlist')
