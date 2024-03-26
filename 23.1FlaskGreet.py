from flask import Flask

app = Flask(__name__)

@app.route('/welcom')
def welcom():
        return "welcome"

@app.route('/welcome/back')
def welcome_back():
    return "welcome back"

@app.route('/welcome/home')
def welcome_home():
      return "welcome home"