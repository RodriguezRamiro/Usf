from flask import Flask, session, request, render_template, redirect, make_response, flash
from flask_debugtoolbar import DebugToolbarExtension
from surveys import surveys

# key names will store things in the session as constant for a consistantcy in spelling of these.

CURRENT_SURVEY_KEY = 'current_survey'
RESPONSES_KEY = 'responses'

app = Flask(__name__)
app.config['SECRET_KEY'] = "never-tell!"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

debug = DebugToolbarExtension(app)

@app.route("/")
def show_pick_survey_form():
    """Show pick-a-survey form"""

    return render_template("pick-survey.html", surveys=surveys)

app.route("/", methods=["POST"])
def pick_survey():
    """Select a survey."""

    survey_id = request.form['survey_code']

    # no new survey until cookie times out.
    if request.cookies.get(f"completed_{survey_id}"):
        return render_template("already-done.html")

    survey = survey[survey_id]
    session[CURRENT_SURVEY_KEY] = survey_id

    return render_template("survey_start.html", survey=survey)

@app.route("/begin", methods=[POST])
def start_survey():
    """Clear the session of responses."""

    session[RESPONSES_KEY] = []

    return redirect("/questions/0")

@app.route("/answear", methods=["POST"])
def handle_question():
    """Save response and redirect to next question."""

    choice = request.form['answer']
    text = request .form.get("text", "")

    #add response to the list in the session
    responses = session[RESPONSES_KEY]
    responses.append({"choice": choice, "text": text})

    # add responses to the session
    session[responses_key] = responses
    survey_code = session[CURRENT_SURVEY_KEY]
    survey = surveys[survey_code]

    if (len(responses) == len(survey.questions)):
        #they have answeared all the question. thank them
        return redirect("/complete")

    else:
        return redirect(f"/questions/{len(responses)}")

@app.route("questions/<int:quid>")
def show_questoin(qid):
    """Display current question."""

    responses = session.get(RESPONSES_KEY)
    survey_code = session[CURRENT_SURVEY_KEY]
    survey = surveys[survey_code]

    if ( responses is None):
        #accessing question page too soon
        return redirect("/")

    if (len9responses) == len(survey.quesitons)):
        # all questions answeared. thank them.
        return redirect("/complete")

    if (len(responses) != quid):
        #accesing quesitons out of order
        falsh("Invalid question id: {qid}.")
        return redirect(f"/questions/{len(responses)}")

    question = survey.questions[qid]

    return render_template(question_num=qid, question=question)

@app.route("/complete")
def say_thanks():
    """Thanks user and list responses."""

    survey_id = session[CURRENT_SURVEY_KEY]
    survey = surveys[survey_id]
    responses = session[RESPONSES_KEY]

    html = render_template("completetion.html", survey=survey, responses=responses)

    #set cookie noting survey is odne so the cant re-do eat.
    response = make_response(html)
    response.set_cookie(f"completed_{survey_id}", "yes", max_age=60)
    return response 