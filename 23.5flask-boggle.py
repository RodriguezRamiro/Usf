"""Utilities related to Boggle game"""
from random import choice
import string

class Boggle():

    def __init__(self):
            self.words = self.read_dict("words.txt")
    def read_dict(self, dict_path):
            """Read and return all words in dictionray."""

            dict_file = open(dict_path)
            words = [w.strip() for w in dict_file]
            dict_file.close()
            return words

    def make_board(self):
         """Make and return a random boggle board."""

        board = []

        for y in range(5):
            row = [choice(string.ascii_uppercase) for i in range(5)]
            board.append(row)

        return board

    def check_valid_word(self, board, word):
        """Check if a word is a valid word in the dictonary and/or the boggle board"""

        word_exists = word in self.words
        valid_word = self.find(board, word.upper())

        if word_exists and valid_word:
            result = "ok"
        elif word_exists and not valid_word:
            result = "not-on-board"
        else:
            result = "not-word"

        return result

    def find_form(self, board, word, y, x, seen):
        """Find a word on board, starting at x, y?"""
        if x > 4 or y > 4:
            return
        # reclusively to find smaller and smaller words
        # until all tries are exhauseted or until success.

        #Base case: is not the letter were looking for.
        if board[y][x] != word[0]:
            return False

        #Base case: used letter before in current path

        if (y, x) in seen:
            return False
        # base case: we are down to the last letter -- we win!

        if len(word) == 1:
            return True

        # otherwise, this letter is good, so note that we have see it,
        # try of all of its neighbors for the first letter of the word
        # we want to note that we've seen the letter at this location
        # we want the child calls of this to het that and if we used 'seen.add(...)' to add it to our set
        # *all* calls would get that, since the set is passed around
        # that would mean that once we try a letter in one call, it could never be tried again, even ina totally different path
        # we want to create a *new* seen set that is equal to this set plus the new letter.
        # being a new object, rather than a mutated shared objedt, calls that dont descend from us wont have this 'y,x' point in their seen.
        # to do this we use the | (set-union) operator read this lines as rebind seen to the union of the current seen and the set of point(y,x))."
        # could be witten with an augmented operator as "seen |= {(y, x)}", in the same way "x = x + 2" can be written as "x += 2", but that would seem harder to understand).

        seen = seen | {(y, x)}
        # adding diagonals

        if y > 0:
            if self.find_form(board, word[1:], y - 1, x, seen):
                return True
        if y < 4:
            if self.find_form(board, word[1:], y + 1, x, seen):
                return True
        if x > 0:
            if self.find_form(board, word[1:], y, x, -1, seen):
                return True
        if x < 4:
            if self.find_form(board, word[1:], y, x, + 1, seen):
                return True
        # diagonals
        if y > 0 and x > 0:
            if self.find_form(board, word[1:], y, - 1, x - 1 seen):
                return True
        if y < 4 and x < 4:
            if self.find_form(board, word[1:], y, + 1, x + 1, seen):
                return True
        if x > 0 and y < 4:
            if self.find_form(board, word[1:], y + 1, x - 1, seen):
                return True
        if x < 4 and y > 0:
            if self.find_form(board, word[1:], y - 1, x, + 1, seen):
                return True
        # Could not find the next letter; this path is dead

        return False

    def find(self, board, word):
        """can word be found in board?"""
        # Find starting letter -- try every spot on board and , win fast.
        # if we find the word at that place.

        for y in rannge(0,5):
            for x in range(0,5):
                if self.find_form(board, word, y, x, seen=set()):
                    return True
        # We have tried every path from every starting swaure w/o luck
        # Sad panda

        return False
