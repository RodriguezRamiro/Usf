/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;

    const queue = [{ node: this.root, depth: 1 }];

    while (queue.length > 0) {
      const { node, depth } = queue.shift();

      // If this is a leaf node, return its depth
      if (!node.left && !node.right) return depth;

      if (node.left) queue.push({ node: node.left, depth: depth + 1 });
      if (node.right) queue.push({ node: node.right, depth: depth + 1 });
    }

    return 0; // Default return if no nodes
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    const depthHelper = (node) => {
      if (!node) return 0;
      const leftDepth = depthHelper(node.left);
      const rightDepth = depthHelper(node.right);
      return Math.max(leftDepth, rightDepth) + 1;
    };

    return depthHelper(this.root);
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    let maxPathSum = -Infinity;

    const maxSumHelper = (node) => {
      if (!node) return 0;

      const leftSum = Math.max(maxSumHelper(node.left), 0);
      const rightSum = Math.max(maxSumHelper(node.right), 0);

      const currentSum = node.val + leftSum + rightSum;
      maxPathSum = Math.max(maxPathSum, currentSum);

      return node.val + Math.max(leftSum, rightSum);
    };

    maxSumHelper(this.root);
    return maxPathSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    let result = null;

    const traverse = (node) => {
      if (!node) return;

      if (node.val > lowerBound) {
        if (result === null || node.val < result) {
          result = node.val;
        }
      }

      traverse(node.left);
      traverse(node.right);
    };

    traverse(this.root);
    return result;
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    const findDepthAndParent = (node, target, depth, parent) => {
      if (!node) return [null, null];
      if (node === target) return [depth, parent];

      const [leftDepth, leftParent] = findDepthAndParent(node.left, target, depth + 1, node);
      if (leftDepth !== null) return [leftDepth, leftParent];

      return findDepthAndParent(node.right, target, depth + 1, node);
    };

    const [depth1, parent1] = findDepthAndParent(this.root, node1, 0, null);
    const [depth2, parent2] = findDepthAndParent(this.root, node2, 0, null);

    return depth1 === depth2 && parent1 !== parent2;
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    const result = [];

    const serializeHelper = (node) => {
      if (!node) {
        result.push('null');
        return;
      }
      result.push(node.val);
      serializeHelper(node.left);
      serializeHelper(node.right);
    };

    serializeHelper(tree.root);
    return JSON.stringify(result);
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(stringTree) {
    const values = JSON.parse(stringTree);
    let index = 0;

    const deserializeHelper = () => {
      if (values[index] === 'null') {
        index++;
        return null;
      }

      const node = new BinaryTreeNode(values[index++]);
      node.left = deserializeHelper();
      node.right = deserializeHelper();
      return node;
    };

    return new BinaryTree(deserializeHelper());
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    const findLCA = (node, p, q) => {
      if (!node) return null;
      if (node === p || node === q) return node;

      const left = findLCA(node.left, p, q);
      const right = findLCA(node.right, p, q);

      if (left && right) return node;
      return left ? left : right;
    };

    return findLCA(this.root, node1, node2);
  };

module.exports = { BinaryTree, BinaryTreeNode };
