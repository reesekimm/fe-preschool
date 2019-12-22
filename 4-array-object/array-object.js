const { dataObj, dataArr } = require("./data");

/*

1. 숫자 타입의 값을 가지는 프로퍼티를 뽑아 배열 만들기

*/

const getPropsWithNumber = (obj, result) => {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "number") {
      result.push(key);
      continue;
    }
    if (typeof value === "object" && !Array.isArray(value) && value !== null) {
      getPropsWithNumber(value, result);
    }
  }
  return result;
};

console.log(getPropsWithNumber(dataObj, []));

/*

2. type이 sk인 객체의 name으로 구성된 배열 만들기

*/

const getNamesWithTypeSk = (arr, type) =>
  arr.reduce((result, curr) => {
    if (curr.type === type) {
      result.push(curr.name);
    }
    return result.concat(getNamesWithTypeSk(curr.childnode, type));
  }, []);

console.log(getNamesWithTypeSk(dataArr, "sk"));

/*

3. reduce 만들기

*/

const myReduce = (arr, callback, initialValue) => {
  let accumulator = initialValue || arr[0];
  for (let i = initialValue ? 0 : 1, length = arr.length; i < length; i++) {
    accumulator = callback(accumulator, arr[i]);
  }
  return accumulator;
};

console.log(
  myReduce([1, 2, 3, 4, 5], (next, prev) => next + prev),
  10
);
