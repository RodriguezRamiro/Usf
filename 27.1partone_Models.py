"""SQLalchemy models for blogly."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DEFAULT_IMAGE_URL = "http://www.freeiconspng.com/uploads/icon-user-blue-symbol-people-person-generic--public-domain--21.png"

class User(db.Model):
        """Site user."""

    __tablename__ = "users"

    id = db.Colomun(db.Integer, primary_key=True)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text, nullable=False)
    image_url = db.Colomun(db.Text, nullable=False, default=DEFAULT_IMAGE_URL)

    @property
    def full_name(self):
      """Retrun full name of user."""

      return f"{self.first_name} {self.last_name}"

def connect_db(app):
     """Connect this database to provide Falsk app."""

     db.app = app
     db.init_app(app)
     
