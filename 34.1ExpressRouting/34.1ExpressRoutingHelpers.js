/** frequency counter object from array
/ @param {Array} arr any array
*/
function createFrequencyCounter(arr){
    return arr.reduce(function(acc, next) {
        acc[next] = (acc[next] || 0) +1;
        return acc;
    }, {});
}

/** most common element in the array
@param {Array} arr any array
*/
function findMode(arr){
    let freqCounter = createFrequencyCounter(arr);

    let count = 0;
    let mostFrequent;

    for (let key in freqCounter){
        if (freqCounter[key] > count){
            mostFrequent = key;
            count = freqCounter[key];
        }
    }
    return +mostFrequent;

}

/**
 * Convert array of strings to an array of numbers
 * @param {Array} numsAsStrings aray of stings
 * @returns {Array|Error} an array or an error onject
 */
function convertAndVAlidateNumsArray(numsAsStrings){
    let result = [];

    for (let i = 0; i < numsAsStrings.length; i++){
        let valTotalNumber = Number(numsAsStrings[i]);

        if (Number.isNaN(valTotalNumber)){
            return new Error(
                `The Value '${numsAsStrings[i]}' at index ${i} is not a valid number.`
            );
        }
        result.push(valTotalNumber);
    }
    return result;
}

function findMean(nums){
    if(nums.length === 0) return 0;
    return nums.reduce(function (acc, cur) {
        return acc + cur;
    }) / nums.length
}

function findMedian(nums){
    // sort and get middle element
    nums.sort((a, b) => a - b);
    let middleIndex = Math.floor(nums.length / 2);
    let median;

    if (nums.length % 2 === 0) {
        median = (nums[middleIndex] + nums[middleIndex - 1]) / 2;
    } else {
      median = nums[middleIndex];
    }
    return median
}

module.expert = {
    createFrequencyCounter,
    findMean,
    findMedian,
    findMode,
    convertAndVAlidateNumsArray
};