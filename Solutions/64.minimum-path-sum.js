/*
 * @lc app=leetcode id=64 lang=javascript
 *
 * [64] Minimum Path Sum
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
  // two ways of calculating this
  // 1. use DFS to visited all available paths and choose a min
  // 2. use DP as we did in unique-paths problems

  if (grid == null || grid.length === 0) {
    return 0;
  }

  let m = grid.length;
  let n = grid[0].length;
  let minPathSums = new Array(m)
          .fill(0)
          .map(e => new Array(n).fill(0));
  
  for(let i = 0; i < m; i++) {
    minPathSums[i][0] = i > 0 
      ? grid[i][0] + minPathSums[i - 1][0]
      : grid[i][0];
  }

  for(let i = 0; i < n; i++) {
    minPathSums[0][i] = i > 0
      ? grid[0][i] + minPathSums[0][i - 1]
      : grid[0][i];
  }

  for(let i = 1; i < m; i++) {
    for(let j = 1; j < n; j++) {
      minPathSums[i][j] = Math.min(
          minPathSums[i-1][j], 
          minPathSums[i][j-1],
        ) + grid[i][j];
    }
  }

  return minPathSums[m-1][n-1];
};
// @lc code=end

