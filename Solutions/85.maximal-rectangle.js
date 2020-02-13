/*
 * @lc app=leetcode id=85 lang=javascript
 *
 * [85] Maximal Rectangle
 */

// @lc code=start
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function(matrix) {
  // Initial Idea
  // 1. Brute-Force method: go from each point(not 0), try to reach max
  // width and max height, choose maximum rec at the end
  // 2. Use DP, use each point as a right-bottom end of a rec, calculate
  // the maximum rec that can use it as right-bottom end, then choose the
  // max rectangle space we have

  // 2 is NOT working..... need to revise that to use histogram to resovle
  // this problem 

  // Boundary Case
  if (matrix == null || 
    matrix.length === 0 || 
    matrix[0].length === 0) {
    return 0;
  } 

  // dp two dimension arr
  let m = matrix.length;
  let n = matrix[0].length;
  let dp = new Array(m).fill(0).map(e => new Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    dp[0][i] = matrix[0][i] === 0 ? 0 : 1;
  }

  for (let i = 1; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] !== 0) {
        dp[i][j] = dp[i-1][j] + 1;
      }
    }
  }

  // find max rectangle histogram
  let maxRec = 0;
  for (let i = 0; i < m; i++) {
    maxRec = Math.max(maxRec, maxRectHistogram(dp[i]));
  }
  
  return maxRec;
};

// How to calculate the max histogram space
const maxRectHistogram = (heights) => {
  if (heights.length == 1) {
    return heights[0];
  }

}
// @lc code=end

