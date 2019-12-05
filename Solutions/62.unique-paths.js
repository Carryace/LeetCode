/*
 * @lc app=leetcode id=62 lang=javascript
 *
 * [62] Unique Paths
 */

// @lc code=start
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  // thinking about dynamic programming solution
  // if p(i,j) means the total unique paths from (0,0) to (i,j)
  // then what is the total count for p(i,j) represented from adjcent points
  // there is two way to reach p(i, j)
  // either from p(i-1,j) or from p(i, j-1)
  // So, we have a formula here: p(i-1,j) + p (j-1, i) = p(i, j)

  // Boundary Case for 0 * 0
  if (m === 0 && n === 0) {
    return 0;
  }

  let pathCounts = new Array(m);
  // Set up (0, 0) to (0, m) and (0, 0) to (n, 0) to 1
  for (let i = 0; i <= m - 1; i++) {
    pathCounts[i] = new Array(n);
    pathCounts[i][0] = 1;
  }

  for (let i = 0; i <= n - 1; i++) {
    pathCounts[0][i] = 1;
  }

  // move from the top left to bot right
  for (let i = 0; i <= m - 1; i++) {
    for (let j = 0; j <= n - 1; j++) {
      if (i == 0 || j == 0) {
        continue;
      }
      pathCounts[i][j] = pathCounts[i-1][j] + pathCounts[i][j-1];
    }
  }

  return pathCounts[m-1][n-1];
};
// @lc code=end

