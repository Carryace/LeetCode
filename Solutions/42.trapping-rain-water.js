/*
 * @lc app=leetcode id=42 lang=javascript
 *
 * [42] Trapping Rain Water
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
  // consider situations for each point
  // At that point, the possible height will be:
  // min(maxLeft, maxRight) - crtHeight, if it is > 0
  
  // Boundary Case for null or empty array
  if (height == null || height.length === 0) {
    return 0;
  }

  // Calculate leftMax and rightMax for each element
  let leftMaxArr = [];
  let crtMax = 0;
  height.forEach((e, i) => {
    leftMaxArr.push(crtMax);
    crtMax = Math.max(crtMax, e);
  });

  let rightMaxArr = [];
  crtMax = 0;
  for(let i = height.length -1; i >= 0; i--) {
    rightMaxArr[i] = crtMax;
    crtMax = Math.max(crtMax, height[i]);
  }

  // Calculate and sum up water
  let ans = 0;
  height.forEach((e, i) => {
    let trappedRain = Math.min(leftMaxArr[i], rightMaxArr[i]) - height[i];
    ans += trappedRain > 0 ? trappedRain : 0;
  })
    
  return ans;
};
// @lc code=end

