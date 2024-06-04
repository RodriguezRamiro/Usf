from flask import Flask, request, redirect, render_template
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User

app = Flask(__name__)
app.config['SQLACHEMY_DATABASE_URI'] = "postgresql:///blogly
app.config['SQLACHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'ihavesecret'

# Debug toolbar show redirecrs explicitly is often usseful;
# however, if you want to turn it off, you can uncomment this line
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

toolbar = DebugToolbarExtension(app)

connect_db(app)
db.create_all

@app.route('/')
def root():
        """Homepage redirects to list of users."""

        return redirect("/users")

####################################
#USER Route

@app.route('/user')
def users_index():
        """Show a page with info on all users"""

        users = User.query.order_by(User.last_name, User.first_name).all()
        return render_template('users/index.html', users=users)

@app.route('/users/new', methods=["GET"])
def users_new_form():
        """Show a form to create a new user"""

        return render_template('users/new.html')

@app.route("/users/new", method=["POST"])
def user_new():
        """Handle form submission for creating a new user"""

        new_user = USer(
                first_name=request.form['first_name'],
                last_name=reuest.form['last_name'],
                image_url=request.form['image_url'] or None)

        db.session.add(new_user)
        db.session.commit()

        return redirect("/users")

@app.route('/users/<int:user_id>')
def users_shows(user_id):
    """ Show a page with info on a specific user"""
    user = User.query.get_or_404(user_id)
    return render_template('users/show.html', user=user)

@app.route('/users/<int:user_id>/edit')
def users_edit(user_id):
       """Show a form to edit an existing user"""

       user = User.query.get_or_404(user_id)
       return render_template('users/edit.html', user=user)

@app.route('/users/<int:user_id>/edit', methods=["POST"])
def users_update(users_id):
       """Handle form submission for updating an existing user"""

       user = User.query.get_or_404(user_id)
       db.session.delete(user)
       db.session.commit()

       return redirect("/users")


