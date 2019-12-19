/*

03 다각형의 넓이 구하기

- 모든 넓이 값을 얻을 수 있는 'getArea' 함수를 만든다.
- 호출된 순서대로 함수정보(함수명, 전달인자, 결과)를 출력하는 'printExecutionSequence'함수를 만든다.

*/

const {
  getCircle,
  getRectangle,
  getTrapezoid,
  getCylinder
} = require("../2-js-function/getArea1");

const queue = [];

const getSumOfCircles = (start, fin) => {
  const oneCircle = r => Math.pow(r, 2) * Math.PI;
  let sum = oneCircle(start);

  const addCircle = r => {
    if (r <= fin) {
      sum += oneCircle(r);
      addCircle(r + 1);
    } else {
      return;
    }
  };
  addCircle(start + 1);

  const result = `반지름이 1부터 ${fin}까지 1씩 증가할 때, ${fin}개의 원의 넓이의 합: ${sum}`;
  console.log(result);
  return result;
};

const print = data => {
  console.log("\n계산수행순서 및 결과를 출력합니다.\n");
  const printRecord = (value, key) => {
    console.log(`${key}`);
    console.log(`호출 함수: ${value.func}`);
    console.log(
      `전달 인자: ${value.args.reduce(
        (acc, curr) => acc + "" + ", " + (curr + "")
      )}`
    );
    console.log(`결과: ${value.result}`);
    console.log("");
  };
  data.forEach(printRecord);
  console.log("출력 완료");
};

const printExecutionSequence = () => {
  const record = new Map();
  let order = 1;
  for (let i = 0, length = queue.length; i < length; i += 3) {
    record.set(order, {
      func: queue[i],
      args: queue[i + 1],
      result: queue[i + 2]
    });
    order += 1;
  }
  print(record);
};

const getArea = (...args) => {
  const numbers = args.slice(1);

  switch (args[0]) {
    case "circle":
      Number.isInteger(args[2]) && 1 < args[2]
        ? args[1] === 1
          ? queue.push(args[0], numbers, getSumOfCircles(...numbers))
          : queue.push(args[0], numbers, "유효한 인자를 입력해 주세요.")
        : queue.push(args[0], numbers, getCircle(...numbers));
      break;
    case "rect":
      queue.push(args[0], numbers, getRectangle(...numbers));
      break;
    case "trapezoid":
      queue.push(args[0], numbers, getTrapezoid(...numbers));
      break;
    case "cylinder":
      queue.push(args[0], numbers, getCylinder(...numbers));
      break;
    default:
      console.log("유효한 인자를 입력해 주세요.");
  }
};

// Test

getArea("circle", 1, 4, 5);
getArea("circle", 2);
getArea("circle", null, 2);
getArea("circle", 1, 0);
getArea("rect", "hello", 8);
getArea("rect", -1, 1);
getArea("trapezoid", 0, 10, 1);
getArea("cylinder", 1, 11);

printExecutionSequence();
