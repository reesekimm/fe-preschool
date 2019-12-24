/*

02 자바스크립트 함수

1. 반지름을 입력받아 원의 넓이를 계산하는 함수를 만든다.
2. 필요한 인자를 입력받아 사각형의 넓이를 계산하는 함수를 만든다.
3. 필요한 인자를 입력받아 사다리꼴의 넓이를 계산하는 함수를 만든다.
4. 필요한 인자를 입력받아 원기둥의 넒이를 계산하는 함수를 만든다.
5. 숫자가 아니면 에러를 반환하도록 구현한다.
6. 인자의 갯수가 부족하면 에러를 반환한다.

*/

const { pow, PI } = Math;

const getCircle = r => {
  const circle = checkArgs(r) || `반지름${r} 원의 넓이: ${pow(r, 2) * PI}`;
  console.log(circle);
  return circle;
};

const getRectangle = (a, b) => {
  const rect = checkArgs(a, b) || `가로${a} 세로${b} 사각형의 넓이: ${a * b}`;
  console.log(rect);
  return rect;
};

const getTrapezoid = (a, b, h) => {
  const trapezoid =
    checkArgs(a, b, h) ||
    `가로${a} 세로${b} 높이${h} 사다리꼴의 넓이: ${((a + b) * h) / 2}`;
  console.log(trapezoid);
  return trapezoid;
};

const getCylinder = (r, h) => {
  const areaOfCircle = pow(r, 2) * PI;
  const cylinder =
    checkArgs(r, h) ||
    `반지름${r} 높이${h} 원기둥의 넓이: ${2 * areaOfCircle + 2 * r * PI * h}`;
  console.log(cylinder);
  return cylinder;
};

const checkArgs = (...args) => {
  let err;
  if (args.includes(undefined)) {
    err = "[Error] 인자의 갯수가 부족합니다.";
    return err;
  }
  for (let i = 0, length = args.length; i < length; i++) {
    if (typeof args[i] !== "number") {
      err = "[Error] 숫자를 입력해 주세요.";
      return err;
    }
    if (args[i] <= 0) {
      err = "[Error] 0보다 큰 숫자를 입력해 주세요.";
      return err;
    }
  }
  return err;
};

// Test Cases

// getCircle(7);
// getCircle();
// getCircle(10, 2);
// getRectangle(8, 2);
// getRectangle(12, "hello");
// getRectangle(true, 20);
// getTrapezoid(10, 2, 3);
// getTrapezoid(0, 11, 5);
// getTrapezoid(undefined, 1, 4);
// getCylinder(3, 10);
// getCylinder(20);

module.exports = { getCircle, getRectangle, getTrapezoid, getCylinder };
