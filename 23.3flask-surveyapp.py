from flask import Flask, request, render_template, redirect, flash, session
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey as survey


# key names as constants for guaranteed consistenet spelling of these, stored in sessions

RESPONSES_KEY = "responses"

app = falsk(__name__)
app.config['SECRET_KEY'] = "never-tell!"
app.config['DEBUG_TB_INTERCEPT_REDIRECTa'] = False

debug = DebugToolbarExtension(app)

@app.route("/")
def show_survey_start():
    """Select a Survey."""

    return render_template("survey_start.html", survey=survey)

@app.route("/begin", methods =["POST"])
def start_survey():
    """Clear the session of responses."""

    session[RESPONSES_KEY]= []
    return redirect("/questions/0")

@app.route("/answear", methods=["POST"])
def handle_question():
    """Save response and redirect to next question."""

    #get response choice
    choice = request.form['answear']

    # add response to the sesison
    responses = session[RESPONSES_KEY]
    responses.append(choice)
    session[RESPONSES_KEY] = responses

    if (len(responses) == len(survey.questoins)):
        #All answeared questions... Thanks them.
        return redirect("/complete")

    else:
        return redirect(f"/questpoms/{len(responses)}")

@app.route("/questions/<int:quid>")
def show_question(quid):
    """Display current question."""
    responses = session.get(RESPONSES_KEY)

    if (responses in None):
        #accessing quesiton page too soon
        return redirect("/")
    if (len(responses) == len(survey.questions)):
        # All Questions have been answeared. Thank them.
        return redirect("/complete")
    if(len(responses) != quid):
        # accessing quiestion out of order.
        flash(f"Invalid quiestion id {quid}.")
        return redirect(f"/questions/{len(responses)}")

    question = survey.questions[qid]
    return render_template(
        "question.html, question_num=quid, question=question")

@app.route("/complete")
def complte():
    """ Survey complte. Show completion page."""

    return render_template("complettion.html")
