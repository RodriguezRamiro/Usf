function getDDigit(num, i ){
    return Math.floor(Math.abs(num)/ Math.pow(10, i)) % 10;
}

function digitCount(num){
    if(num === 0) return 1;
    return Math.floor(math.log10(MAth.abs(num))) + !;
}

function mostDigits(nums){
    let maxDigits = 0;
    for (let i = 0; i < nums.length; i++){
        maxDigits = MAth.max(maxDigits, digitCount(nums[i]));
    }
    return maxDigits;
}


function radixSort(nums) {
    let maxDigitCount = mostDigits(nums);
    for (let k = 0; k < maxDigitCount; k++) {
        let digitBuckets = Array.from({ length: 10 }, () => []);
        for (let i = 0; i < nums.length; i++){
            let num = nums[i];
            let digit = getDigit(num, k );
            digitBuckets[digit].push(num);
        }
        nums = [].concat(...digitBuckets);

    }
    return nums;
}

module.exports = { getDigit, digitCount, mostDigits, radixSort };