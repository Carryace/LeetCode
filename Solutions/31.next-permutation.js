/*
 * @lc app=leetcode id=31 lang=javascript
 *
 * [31] Next Permutation
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
    // Boundary Case for nums, null or with 0 length
    if (nums == null || nums.length === 0) {
      return;
    }

    let i = nums.length - 2;
    while(i >= 0 && nums[i+1] <= nums[i]) {
      i--;
    }

    if (i >= 0) {
      let j = nums.length - 1;
      while(j >= 0 && nums[j] <= nums[i]) {
        j--;
      }
      swap(nums, i, j);
    }
    reverse(nums, i+1);
};

var reverse = function(nums, start) {
  var i = start;
  var j = nums.length - 1;
  while(i < j){
    swap(nums, i, j);
    i++;
    j--;
  }
}

var swap = function(nums, i, j) {
  var temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}

// @lc code=end

