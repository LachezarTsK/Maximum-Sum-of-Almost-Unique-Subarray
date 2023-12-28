
/**
 * @param {number[]} input
 * @param {number} targetNumberOfDistinctElements
 * @param {number} targetSubarrayLength
 * @return {number}
 */
var maxSum = function (input, targetNumberOfDistinctElements, targetSubarrayLength) {

    let currentSum = 0;
    const uniques = new Map();

    for (let i = 0; i < targetSubarrayLength; ++i) {
        if (!uniques.has(input[i])) {
            uniques.set(input[i], 1);
        } else {
            uniques.set(input[i], uniques.get(input[i]) + 1);
        }
        currentSum += input[i];
    }

    let maxSum = (uniques.size >= targetNumberOfDistinctElements) ? currentSum : 0;

    for (let i = targetSubarrayLength; i < input.length; ++i) {
        const outgoing = input[i - targetSubarrayLength];
        const ingoing = input[i];

        updateMap(uniques, outgoing, ingoing);
        currentSum += ingoing - outgoing;

        if (uniques.size >= targetNumberOfDistinctElements) {
            maxSum = Math.max(maxSum, currentSum);
        }
    }
    return maxSum;
};

/**
 * @param {Map<number, number>} uniques
 * @param {number} outgoing
 * @param {number} ingoing
 * @return {void}
 */
function updateMap(uniques, outgoing, ingoing) {
    if (outgoing === ingoing) {
        return;
    }

    uniques.set(outgoing, uniques.get(outgoing) - 1);
    if (uniques.get(outgoing) === 0) {
        uniques.delete(outgoing);
    }

    if (!uniques.has(ingoing)) {
        uniques.set(ingoing, 1);
    } else {
        uniques.set(ingoing, uniques.get(ingoing) + 1);
    }
}
