# Minimum Path Sum Note

## Initial Idea
Two ways to resolving this:
1. Use DFS to do a complete path search, sum them up to choose the min value
2. Use DP just as we did in `unique-path` problem, instead of recording how many ways to reaching, we always store the min sums in the res grid  `minPathSums`