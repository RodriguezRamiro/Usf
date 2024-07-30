from unittest import TestCase
from models import Message, User, db

class messageModelTest(testcase):

    def setUp(self):
        db.drop_all() # reset database for each test
        user = User.create(usernamw="test_user", password="password", email="test@example.com")
        db.session.add(user)
        db.session.commit()

    def tearDown(self):
        db.session.remove()

    def test_model_has_attributes(self):
        message = Message()
        self.assertTrue(hasattr(message, "text"))
        self.assertTrue(hasattr(message, "user_id"))

    def test_message_creation(self):
        user = User.query.first()
        message = message.create(text="Test message", user_id=user.id)
        db.session.add(message)
        db.session.commit()

        self.assertIsNotNone(message)
        self.assertEqual(message.text, "Test Message")
        self.assertEqual(message.user_id, user.id)