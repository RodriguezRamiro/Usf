# ## Make routes for Users

from flask import Flask, render_template, redirect, session, flash
from flask_wtf import FlaskForm
from flask_mail import Mail, Message
import secrets
from wtforms import StringField, PasswordField, EmailField
from wtforms.validators import InputRequired, Length, Email
from forms import FeedbackForm
from models import db, User, bcrypt
from functools import wraps

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///feedback.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'this_secret_key'
mail = Mail(app)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your-email@gmail.com'
app.config['MAIL_PASSWORD'] = 'your-email-password'
app.config['MAIL_DEFAULT_SENDER'] = 'your-email@gmail.com'

db.init_app(app)

class RegisterForm(FlaskForm):
    username = StringField('Username', validators=[InputRequired(), Length(max=20)])
    password = PasswordField('Password', validators=[InputRequired(), Email(), Length(max=50)])
    email = EmailField('Email', validators=[InputRequired(), Email(), Length(max=50)])
    first_name = StringField('First Name', validators=[InputRequired(), Length(max=30)])
    last_name = StringField('Last Name', validators=[InputRequired(), Length(max=30)])

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[InputRequired()])
    password = PasswordField('Password', validators=[InputRequired()])

@app.route('/register', method=['GET', 'POST'])
def register():
        if 'username' in session:
            return redirect(f"/users/{session['username']}")

        form = RegisterForm()
        if form.validate_on_submit():
            user = User.register(username, password, email, first_name, last_name)
            username = form.username.data
            password = form.password.data
            email = form.email.data
            first_name = form.first_name.data
            last_name = form.last_name.data


            db.session.add(user)
            db.session.commit()

            session['username'] = user.username
            return redirect(f"/user/{user.username}")           # Modified the /login and /register routes to redirect to /users/username

        return render_template('register.html', form=form)


@app.route('/login', method=['GET', 'POST'])
def login():
     if 'username' in session:
        return redirect(f"/users/{session['username']}")


     form = LoginForm()
     if form.validate_on_submit():
        user = User.authenticate(form.username.data, form.password.data)
        if user:
               session['username'] = user.username
               return redirect('/secret')
        else:
               form.username.errors.append('invalid username/password.')

        return render_template('login.html', form=form)

@app.route('/reset-password', methods=['GET', 'POST'])
def reset_password_request():
    if 'username' in session:
        return redirect(url_for('show_user', username=session['username']))

    form = EmailForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user:
            token = secrets.token_urlsafe()
            user.reset_token = token
            db.session.commit()
            msg = Message('Password Reset Request', recipients=[user.email])
            msg.body = f'Click the link to reset your password: {url_for("reset_password", token=token, _external=True)}'
            mail.send(msg)
            flash('Check your email for a password reset link')
        else:
            flash('No account found with that email')

    return render_template('reset_password_request.html', form=form)

@app.route('/reset-password/<token>', methods=['GET', 'POST'])
def reset_password(token):
    user = User.query.filter_by(reset_token=token).first_or_404()
    form = PasswordResetForm()
    if form.validate_on_submit():
        user.set_password(form.password.data)
        user.reset_token = None
        db.session.commit()
        flash('Your password has been reset')
        return redirect(url_for('login'))

    return render_template('reset_password.html', form=form)




@app.route('/secret')
def secret():
    if 'username' not in session:
         flash("You must be logged in to view this page!")
         return redirect('/login')
    return "You made it!"

@app.route('/logout')
def logout():
     session.pop('username')
     return redirect('/')

if __name__== '__main__':
    with app.app_context():
          db.create_all()
    app.run(debug=True)


####### Protecting Routes
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'username' not in session:
            flash("You must be logged in to view this page!")
            return redirect('/login')
        return f(*args, **kwargs)
    return decorated_function

@app.route('/secret')
@login_required
def secret():
    return "You made it!"

####  Log Out Users

@app.route('/logout')
def logout():
    session.pop('username')
    return redirect('/')



### Routes

@app.route('/users/<username>', methods=['GET'])
@login_required
def show_user(username):
    user = User.query.get_or_404(username)
    if 'username' not in session or (username != session['username'] and not session.get('is_admin')):
        return abort(401)

    return render_template('user.html', user=user)

@app.route('/users/<username>/delete', methods=['POST'])
@login_required
def delete_user(username):
    user = User.query.get_or_404(username)
    if 'username' not in session or (username != session['username'] and not session.get('is_admin')):
        return abort(401)

    db.session.delete(user)
    db.session.commit()
    session.pop('username')
    return redirect('/')

@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
@login_required
def add_feedback(username):
    if 'username' not in session or (username != session['username'] and not session.get('is_admin')):
        return abort(401)

    form = FeedbackForm()
    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data

        feedback = Feedback(title=title, content=content, username=username)
        db.session.add(feedback)
        db.session.commit()
        return redirect(f'/users/{username}')

    return render_template('add_feedback.html', form=form)

@app.route('/feedback/<int:feedback_id>/update', methods=['GET', 'POST'])
@login_required
def update_feedback(feedback_id):
    feedback = Feedback.query.get_or_404(feedback_id)
    if 'username' not in session or (feedback.username != session['username'] and not session.get('is_admin')):
        return abort(401)

    form = FeedbackForm(obj=feedback)
    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data
        db.session.commit()
        return redirect(f'/users/{feedback.username}')

    return render_template('update_feedback.html', form=form)

@app.route('/feedback/<int:feedback_id>/delete', methods=['POST'])
@login_required
def delete_feedback(feedback_id):
    feedback = Feedback.query.get_or_404(feedback_id)
    if 'username' not in session or (feedback.username != session['username'] and not session.get('is_admin')):
        return abort(401)

    db.session.delete(feedback)
    db.session.commit()
    return redirect(f'/users/{feedback.username}')

## 404 & 401 error handling
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(401)
def unauthorized(e):
    return render_template('401.html'), 401
