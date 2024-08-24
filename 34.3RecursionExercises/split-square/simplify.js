/* simplify redundant splits in square*/

function simplify(s){
    // base case: just an int
    if (s === 0 || s === 1) return s;

    // simplify quadrants recursivly
    s = s.map(simplify);

    // simplify if founr integers are the same
    if (Number.isInteger(s[0]) && s.every(q => q === s[0])) return s[0];

    return s;
}

