/*

Binary Search (이진 탐색)

이진 탐색은 오름차순으로 정렬된 리스트에 사용할 수 있는 검색 알고리즘이다.
원하는 값을 찾을 때까지 아래의 탐색 과정을 반복한다.

리스트의 중간값과 원하는 값을 비교해서
- '중간 값 > 원하는 값'일 경우 -> 중간 값보다 작은 쪽을 검색
- '중간 값 < 원하는 값'일 경우 -> 중간 값보다 큰 쪽을 검색

장점: 검색이 반복될 때마다 목표값을 찾을 확률은 두 배가 되므로 선형 탐색보다 속도가 빠르다. (시간복잡도: O(longN))
단점: 정렬된 리스트에만 사용할 수 있다.

*/

function binarySearch(arr, target, start = 0) {
  let mid = Math.floor(arr.length / 2);
  if (arr[mid] === target) {
    return `Target's location: index ${start + mid}`;
  } else if (arr[mid] > target) {
    return binarySearch(arr.slice(0, mid), target, start);
  } else if (arr[mid] < target) {
    return binarySearch(arr.slice(mid + 1), target, start + mid + 1);
  } else {
    return "No such target in the list!";
  }
}

console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 5));
console.log(binarySearch([1, 2, 3, 4, 5, 6], 8));
console.log(binarySearch([2, 17, 23, 38, 40, 51, 78, 90], 38));
