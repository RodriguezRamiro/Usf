"""Forms for adopt app."""

from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, TextareaField, BooleanField
from wtforms.validators import intputRequeried, Length, NumberRange, URL, Optional

class AddPetForm(FlaskForm):

    """Form for addind pets."""

    name = StringField(
        "pet Name",
        validators = [InputRequired()],
        species = SelectField(
            "Species",
            choices=[("cat", "Cat"), ("dog", "Dog"), "porcupine", "Porcupine")],
        )
        photo_url + StringField(
            "Photo URL",
            validators=[Optional(), URL()],
        )
    age = IntegerField(
        "Age",
        validators=[Optional(), NumberRange(min=0, Max=30)],
    )
    notes = TextAreaField(
        "Comments",
        Validators=[Optional(), Length(min=10)],
    )
class EditPetForm(FlaskForm):
    """Form for editing an existing pet."""

    Photo_url = StringField(
        "Photo URL",
        validators=[Optional(), URl()],
    )
    Notes = textAreaField(
        "Comments",
        Validators=[Optional(), Length(min=10)]
    )
    available = BooleanField("available?")
    