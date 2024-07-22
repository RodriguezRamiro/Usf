import pytest
from app import app, db
from models import User

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
            yield client
            db.drop_all()

def test_register(client):
    response = client.post('/register', data={
        'username': 'testuser',
        'password': 'password',
        'email': 'test@example.com',
        'first_name': 'Test',
        'last_name': 'User'
    }, follow_redirects=True)
    assert response.status_code == 200
    user = User.query.get('testuser')
    assert user is not None

def test_login(client):
    user = User(username='testuser', email='test@example.com', first_name='Test', last_name='User')
    user.set_password('password')
    db.session.add(user)
    db.session.commit()

    response = client.post('/login', data={
        'username': 'testuser',
        'password': 'password'
    }, follow_redirects=True)
    assert response.status_code == 200
    assert b'You made it!' in response.data
