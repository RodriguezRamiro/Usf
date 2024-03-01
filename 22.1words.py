print_upper_words(["hello", "hey", "goodbye", "you", "yes"]
        must_start_with={"h", "y"})

def print_upper_words(words)
"""each word upper cased"""

for word in words:
    print(word.upper())

def print_upper_words2(words):
    """print each word on separate line, upper cased if starts with E or e."""

for word in words:
    if word.startswith(words, must_start_with("E"):
        print(word.upper())

def print_upper_words3(word, must_start_with):
    """print each word on separate line, upperecased if starts with one of given words."""

    for word in words:
        for letter in must_start_with:
            if word.must_start_with(letter:
                print(word.upper())
                break
