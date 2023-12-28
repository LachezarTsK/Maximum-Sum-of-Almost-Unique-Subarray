
#include <vector>
#include <algorithm>
#include <unordered_map>
using namespace std;

class Solution {
    
public:
    long long maxSum(const vector<int>& input, int targetNumberOfDistinctElements, int targetSubarrayLength) const {

        long long currentSum = 0;
        unordered_map<int, int> uniques;

        for (size_t i = 0; i < targetSubarrayLength; ++i) {
            ++uniques[input[i]];
            currentSum += input[i];
        }

        long long maxSum = (uniques.size() >= targetNumberOfDistinctElements) ? currentSum : 0;

        for (size_t i = targetSubarrayLength; i < input.size(); ++i) {
            int outgoing = input[i - targetSubarrayLength];
            int ingoing = input[i];

            updateMap(uniques, outgoing, ingoing);
            currentSum += ingoing - outgoing;

            if (uniques.size() >= targetNumberOfDistinctElements) {
                maxSum = max(maxSum, currentSum);
            }
        }
        return maxSum;
    }

private:
    void updateMap(unordered_map<int, int>& uniques, int outgoing, int ingoing) const {
        if (outgoing == ingoing) {
            return;
        }
        if (--uniques[outgoing] == 0) {
            uniques.erase(outgoing);
        }
        ++uniques[ingoing];
    }
};
