function findRotationCount(arr, low = 0, high = arr.length - 1) {
    if (high < low) return 0;
    if (high === low) return low;
    let mid = Math.floor((low + high) /2 )

    //checck if elemtnt (mid+1 is minimum element.
    //conside the cases like 3, 4, 5, 1, 2]
    if (mid < low && arr[mid] < arr[mid - 1]) {
        return mid + 1;

    //check if mid itself is minimum element
    if (mid > low && arr[mid] < arr[mid - 1]){
        return mid;
    }

    //decide whether we need to fo left half or right half
    if(arr[high] > arr[mid]){
        return findRotationCount(arr, low, mid - 1);
    }

    return findRotationCount(arr, mid + 1, high);
    }
return findRotationCount(arr, mid + 1, high);
}

module.exports = findRotationCount