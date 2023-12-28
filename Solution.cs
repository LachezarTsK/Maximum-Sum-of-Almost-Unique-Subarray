
using System;
using System.Collections.Generic;

public class Solution
{
    public long MaxSum(IList<int> input, int targetNumberOfDistinctElements, int targetSubarrayLength)
    {
        long currentSum = 0;
        Dictionary<int, int> uniques = new Dictionary<int, int>();

        for (int i = 0; i < targetSubarrayLength; ++i)
        {
            if (!uniques.ContainsKey(input[i]))
            {
                uniques.Add(input[i], 1);
            }
            else
            {
                ++uniques[input[i]];
            }
            currentSum += input[i];
        }

        long maxSum = (uniques.Count >= targetNumberOfDistinctElements) ? currentSum : 0;

        for (int i = targetSubarrayLength; i < input.Count; ++i)
        {
            int outgoing = input[i - targetSubarrayLength];
            int ingoing = input[i];

            UpdateMap(uniques, outgoing, ingoing);
            currentSum += ingoing - outgoing;

            if (uniques.Count >= targetNumberOfDistinctElements)
            {
                maxSum = Math.Max(maxSum, currentSum);
            }
        }
        return maxSum;
    }

    private void UpdateMap(Dictionary<int, int> uniques, int outgoing, int ingoing)
    {
        if (outgoing == ingoing)
        {
            return;
        }
        if (--uniques[outgoing] == 0)
        {
            uniques.Remove(outgoing);
        }
        if (!uniques.ContainsKey(ingoing))
        {
            uniques.Add(ingoing, 1);
        }
        else
        {
            ++uniques[ingoing];
        }
    }
}
