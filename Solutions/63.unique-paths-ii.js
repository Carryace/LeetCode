/*
 * @lc app=leetcode id=63 lang=javascript
 *
 * [63] Unique Paths II
 */

// @lc code=start
/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
  // same process us unique-path problem
  // just add more restrictions from (i=1, j) or (i, j-1) to (i,j)

  // special boundary case handled
  if (obstacleGrid == null || obstacleGrid.length === 0) {
    return 0;
  }

  // set up height, width and res grid
  // result will bet res[m][n]
  let m = obstacleGrid.length;
  let n = obstacleGrid[0].length;
  let res = new Array(m).fill(0).map(e => new Array(n).fill(0));

  // initialize boundary grid for later
  for(let i = 0; i < m; i++) {
    if (i > 0 && res[i-1][0] === 0) {
      res[i][0] = 0;
    } else {
      res[i][0] = obstacleGrid[i][0] === 0 ? 1 : 0;
    }
  }

  for(let i = 0; i < n; i++) {
    if (i > 0 && res[0][i-1] === 0) {
      res[0][i] = 0;
    } else {
      res[0][i] = obstacleGrid[0][i] === 0 ? 1 : 0;
    }
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        res[i][j] = 0;
      } else {
        res[i][j] = res[i-1][j] + res[i][j-1];
      }
    }
  }

  return res[m - 1][n - 1];
};
// @lc code=end

