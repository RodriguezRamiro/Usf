function unroll(square) {
    const result = [];
    let left = 0, right = square.length - 1;
    let top = 0, bottom = square.length - 1;

    while (left <= right && top <= bottom) {
      // Traverse from left to right along the top row
      for (let i = left; i <= right; i++) {
        result.push(square[top][i]);
      }
      top++;

      // Traverse from top to bottom along the right column
      for (let i = top; i <= bottom; i++) {
        result.push(square[i][right]);
      }
      right--;

      // Traverse from right to left along the bottom row
      if (top <= bottom) {
        for (let i = right; i >= left; i--) {
          result.push(square[bottom][i]);
        }
        bottom--;
      }

      // Traverse from bottom to top along the left column
      if (left <= right) {
        for (let i = bottom; i >= top; i--) {
          result.push(square[i][left]);
        }
        left++;
      }
    }

    return result;
  }

module.exports = unroll;
