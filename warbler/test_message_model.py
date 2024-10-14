"""Message model tests."""

# Run these tests like:
#    python -m unittest test_message_model.py

import os
from unittest import TestCase
from sqlalchemy import exc
from models import db, User, Message, Follows, Likes

# Set environmental variable for the test database
os.environ['DATABASE_URL'] = "postgresql:///warbler-test"

# Now we can import the app
from app import app

# Create tables (this is done once for all tests)
db.create_all()

class MessageModelTestCase(TestCase):
    """Test model for messages."""

    def setUp(self):
        """Set up test client and sample data."""
        db.drop_all()
        db.create_all()

        # Create a test user
        self.uid = 94566
        u = User.signup("testuser", "testuser@test.com", "password", None)
        u.id = self.uid
        db.session.commit()

        self.u = User.query.get(self.uid)
        self.client = app.test_client()

    def tearDown(self):
        """Clean up after tests."""
        res = super().tearDown()
        db.session.rollback()
        return res

    def test_message_model(self):
        """Test basic message model functionality."""
        # Create a message
        m = Message(
            text="a warble",
            user_id=self.uid
        )

        db.session.add(m)
        db.session.commit()

        # Check if the user has one message, and if the message's text is correct
        self.assertEqual(len(self.u.messages), 1)
        self.assertEqual(self.u.messages[0].text, "a warble")

    def test_message_likes(self):
        """Test liking a message functionality."""
        # Create two messages
        m1 = Message(text="a warble", user_id=self.uid)
        m2 = Message(text="an interesting warble", user_id=self.uid)

        # Create another test user
        u = User.signup("anotheruser", "another@test.com", "password", None)
        uid = 888
        u.id = uid
        db.session.add_all([m1, m2, u])
        db.session.commit()

        # The second user likes the first message
        u.likes.append(m1)
        db.session.commit()

        # Check if the user has liked exactly one message and that it's the correct one
        likes = Likes.query.filter(Likes.user_id == uid).all()
        self.assertEqual(len(likes), 1)
        self.assertEqual(likes[0].message_id, m1.id)

    # Additional tests could be added here, e.g., for message deletion or user liking their own messages

