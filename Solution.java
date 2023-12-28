
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Solution {

    public long maxSum(List<Integer> input, int targetNumberOfDistinctElements, int targetSubarrayLength) {

        long currentSum = 0;
        Map<Integer, Integer> uniques = new HashMap<>();

        for (int i = 0; i < targetSubarrayLength; ++i) {
            uniques.put(input.get(i), uniques.getOrDefault(input.get(i), 0) + 1);
            currentSum += input.get(i);
        }

        long maxSum = (uniques.size() >= targetNumberOfDistinctElements) ? currentSum : 0;

        for (int i = targetSubarrayLength; i < input.size(); ++i) {
            int outgoing = input.get(i - targetSubarrayLength);
            int ingoing = input.get(i);

            updateMap(uniques, outgoing, ingoing);
            currentSum += ingoing - outgoing;

            if (uniques.size() >= targetNumberOfDistinctElements) {
                maxSum = Math.max(maxSum, currentSum);
            }
        }
        return maxSum;
    }

    private void updateMap(Map<Integer, Integer> uniques, int outgoing, int ingoing) {
        if (outgoing == ingoing) {
            return;
        }
        uniques.put(outgoing, uniques.get(outgoing) - 1);
        if (uniques.get(outgoing) == 0) {
            uniques.remove(outgoing);
        }
        uniques.put(ingoing, uniques.getOrDefault(ingoing, 0) + 1);
    }
}
