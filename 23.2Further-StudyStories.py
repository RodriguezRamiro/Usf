"""Madlibs Stories."""

class Story:
    """Madlibs story.
    to make a story, pass a code, a title, a list of prompts, and the text of the template.
    >>> s = Story(
            "simple",
            "A Simple Tale",
            ["noun", "verb"],
            "i love to {verb} a good {noun}.")
    To generate text from a story, pass in a dictoinary-like thing of {prompt: answer, promp:answer):
    >>> ans = {"verb": "eat", "noun": "mango"}
    >>>s.generate(ans)
    'Ilove to eat a good mango.'
    """
    def __init__(self, code , title, words, text):
        """Create story with words and template text."""

        self.code = code
        self.title = title
        self.prompts = words
        self.template = text

    def generate(self, answers):
        """Substitute answer into text."""
        text = self.template
        for (key, val) in answers.item():
            text = text.replace("{" + key + "}",val)

        return text
story1 = Story(
    "history",
    "A History Tale",
    ["place", "noun", "verb", "adjective", "plural_noun"],
    """Once upon a time in a long-ago {place}, there lived a
       large {adjective} {noun}. It loved to {verb} {plural_noun}."""
)

story2 = Story(
    "omg",
    "An exciting Adventure",
    ["noun", "verb"],
    """OMG!! OMG!! I love to {verb} a {noun}!"""
)
stories = {s.code: s for s in [story1, story2]}