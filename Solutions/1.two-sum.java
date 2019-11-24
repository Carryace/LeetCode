import java.util.ArrayList;
import java.util.HashMap;

/*
 * @lc app=leetcode id=1 lang=java
 *
 * [1] Two Sum
 */

// @lc code=start
class Solution {
    public int[] twoSum(int[] nums, int target) {
      int[] res = new int[2];
      HashMap<Integer, ArrayList<Integer>> arrMap = new HashMap<Integer, ArrayList<Integer>>();
      for(int i = 0; i < nums.length; i++) {
        if (!arrMap.containsKey(nums[i])) {
          ArrayList<Integer> indices = new ArrayList<Integer>();
          indices.add(i);
          arrMap.put(nums[i], indices);
        } else {
          ArrayList<Integer> cur = arrMap.get(nums[i]);
          cur.add(i);
          arrMap.put(nums[i], cur);
        }
      }
      for (int i = 0; i < nums.length; i++) {
        int rest = target - nums[i];
        if (arrMap.containsKey(rest)) {
          if (rest == nums[i]) {
            if (arrMap.get(nums[i]).size() > 1) {
              res[0] = arrMap.get(nums[i]).get(0);
              res[1] = arrMap.get(nums[i]).get(1);
              break;
            }
          } else {
            res[0] = i;
            res[1] = arrMap.get(rest).get(0);
            break;
          }
        }
      }
      return res;
    }
}
// @lc code=end

