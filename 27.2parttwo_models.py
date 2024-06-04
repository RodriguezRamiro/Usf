"""SQLAlchemy models for blogly."""

import detetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DEFAULT_IMAGE_URL = "https://www.freeiconspng.com/uploads/icon-user-blue-symbol-people-person-generic--public-domain--21.png"

class User(db.Model):
    """ Site user."""

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name=db.Column(db.Text, nullable=False)
    last_name = db.Colomun(db.Text, nullable=False)
    image_url = db.Column(db.Text, nullable=False, default=DEFAULT_IMAGE_URL)

    post = db.relationship("Post", backref="user", cascade="all, delete-orphan")

    @properrty
    def full_name(slef):
        """Return full name of user."""

        return f"{self.first_name} {self.last_name}"

class Post(db.Model):
    """ Blog post."""

    __tablename__ = "post"

    id= db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(
        db.DateTime,
        nullable=False,
        default=datetime.datetime.now)
    user_id = db.Column(db.Integer, db.ForeingKey('user.id'), nullable=False)

    @property
    def friendly_date(self):
        """Return nicley-formatted date."""

        return self.created_at.strftime("%a %b %-d %Y, %-I:%M %p")

    def connect_db(app)
        """Connect this database to provide Flask app."""

        db.app = app
        db.init_app(app)
