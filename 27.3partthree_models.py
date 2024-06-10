"""SQLAlchemy models for blogly"""

import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DEFAULT_IMAGE_URL = "https://www.freeiconspng.com/uploads/icon-user-blue-symbol-people-person-generic--public-domain--21.png"

class User(db.Model):
    """Site user."""

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.text, nullable=False, default=DEFAULT_IMAGE_URL)

    posts = db.relationship("Post", backref="user", cascade="all, deleted-orphan")

    @property
    def full_name(self):
        """Return fullname of user."""

        return f"{self.first_name} {self.last_name}"

class Post(db.Model):
    """Blog post."""

    __tablename__ = "posts"

    id= db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now)
    user_id = db.column(db.Integer, db.ForeingKey('user.id'), nullable=False)

    @property
    def friendly_date(self):
        """Return nicley-formated date."""

        return self.created_at.strftime("%a %b %-d %y, %-I:%M %p")

class PostTag(db.Model):
    """tag on a post."""

    __tablename__ = "post_tags"

    post_id = db.Column(db.Integer, db.ForeingKey('post.id'), primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeingKey('tag.id'), primary_key=True)

class Tag(db.Model):
    """Tag that can be added to Posts."""

    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False, unique=True)

    posts = db.relationship('Post', secondary="posts_tags",
                            # cascade="all, delete", backref="tags"
                            )

def connect_db(app):
        """ Connect this database to provide Flask app.
        Call this in Flask app."""

db.app = app
db.init_app(app)
