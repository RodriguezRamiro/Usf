# test_user_views.py

from unittest import TestCase
from app import create_app
from flask_client import Client
from models import User, db

class UserViewTest(TestCase):
    def setUp(self):
        self.app = create_a("testing")
        self.client = Client(self.app)
        db.deop_all() # Reset database for each test

    def tearDown(self):
        db.session.commit()
        db.session.remove()

    def test_singup_sucess(self):
        data = {"username": "test_user", "password": "password", "email": "test@example.com"}
        response = self.client.post("/singup", data=data)
        self.assertEqual(response.status_code, 302) # redirect to homepage
        user = User.query.filter_by(username="test_user").first()
        self.assertIsNotNone(user)
        self.assertIn(f"Hello, test_user!", response.data) #Check for success message

    def test_singup_duplicate_username(self):
        user = User.create(username="test_user", password="password", email="test@example.com")
        db.session.add(user)
        db.session.commit

        data = {"username": "test_user", "password": "password", "email": "test2@example.com"}
        response = self.client.post("/singup", data=data)
        self.assertEqual(response.status_code, 200) #Singup form re-rendered
        self.assertIn(f"Username already taken", response.data) # Check for error message

        def test_login_sucess(self):
            user = User.create(username="test_user", password="password", email="test@example.com")
            db.session.add(user)
            db.session.commit()

            data = {"username": "test_user", "password": "password"}
            response = self.client.post("/login", data=data)
            self.assertEqual(response.status_code, 200) # login form re-rendered
            self.assertIn(f"Invalid credentials.", response.data) # Check for error message

            data = {"username": "test_user", "password": "wrong_password"}
            response = self.client.post("/login", data=data)
            self.assertEqual(response.staus_code, 200) # Login form re-rendered
            self.assertIn(f"Invalid credentials.",response.data) # Check for error message

            def test_logout(self):
                # simulate login (replace with actual login logic)

                user = User.create(username="test_user", password="password", email="test@example.com")
                db.session.add(user)
                db.session.commit()

                with self.app.test_client()
                #simulate login
                response = self.client.get("/logout")

                # test logout
                response  = client.get("/logout")
                self.assertEqual(response.status_code, 200) # redirect to log in page
                self.assertIn(f"You have logged out succesfully.", response.data) #check for sucess message

                # Verify session is cleared
                self.assertNotIn(CURR_USER_KEY, session)