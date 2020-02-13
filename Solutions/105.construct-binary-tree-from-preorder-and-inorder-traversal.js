/*
 * @lc app=leetcode id=105 lang=javascript
 *
 * [105] Construct Binary Tree from Preorder and Inorder Traversal
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * } 
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  // Empty treenode returned for boundary case
  if (!preorder) {
    return null;
  }

  return constructNode(preorder, inorder, 0, inorder.length - 1, 0);
};

var constructNode = function(preorder, inorder, start, end, pIndex) {
  if (start > end) {
    return null;
  }

  const root = new TreeNode(preorder[pIndex]);

  if (start === end) {
    return root;
  }
  let index = searchIndex(inorder, start, end, root.val);
  root.left = constructNode(preorder, inorder, start, index - 1, pIndex + 1);
  root.right = constructNode(preorder, inorder, index + 1, end, pIndex + (index - start) + 1);
  return root;
}

var searchIndex = function(inorder, start, end, data) {
  for (let i = start; i <= end; i++) {
    if (inorder[i] === data)  {
      return i;
    }
  }
  return -1;
}
// @lc code=end

