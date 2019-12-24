# Node.js의 module.exports와 exports

Node.js는 모듈 단위로 각 기능을 분할할 수 있다. 모듈은 파일과 1대1 대응 관계를 가지며 하나의 모듈은 자신만의 독립적인 실행 영역(Scope)를 가지게 된다. 따라서 Client-side JavaScript와 달리 전역변수의 중복 문제가 발생하지 않는다.

모듈은 독립적인 파일 스코프를 갖기 때문에 모듈 안에 선언한 모든 것들은 기본적으로 해당 모듈 내부에서만 참조 가능하다. 만약 모듈 안에 선언한 항목을 외부에 공개하여 다른 모듈들이 사용할 수 있게 하고 싶다면 `module.exports` 객체 또는 `exports` 객체를 사용하면 된다.

그리고 공개된 모듈은 전역함수 require 함수를 사용하여 import할 수 있다.

<br />

## `module.exports` vs `exports`

`module` 객체는 일반 Javascript 객체이며 `export`라는 프로퍼티를 가지고 있다. `export` 프로퍼티는 일반 Javascript 변수로서 빈 객체를 기본값으로 가지고 있다.

Node.js는 Javascript 파일을 읽을 때마다 맨 마지막에 require함수의 리턴값으로 `module.exports`를 반환한다. Node.js에서 Javascript파일을 보는 방식을 간략하게 나타내보면 다음과 같다.

```js
var module = { exports: {} };
var exports = module.exports;

// your code

return module.exports;
```

`module.exports`, `exports`는 다음과 같은 참조관계를 가지고 있다.

```
exports ──참조──> module.exports ──참조──> { }
```

<br />

### 1. [module.exports](https://nodejs.org/api/modules.html#modules_module_exports)

`module.exports` 객체는

- `require()` 함수의 리턴값이다.
- Node.js에 의해 자동으로 생성되며 일반 Javascript 객체를 참조한다.
- 비어 있는 객체가 기본값이며 어떤 것으로도 자유롭게 변경할 수 있다.
- 다음의 두 가지 방법으로 `module.exports`를 사용할 수 있다.

  방법 1. 공개(public) 프로퍼티/메서드 추가<br />
  방법 2. 직접 작성한 객체나 함수로 대체(replace)

<br />

#### 방법 1 - 공개 프로퍼티/메서드 추가

> calculate.js

```js
const say = "hello";

module.exports.add = (a, b) => a + b;
module.exports.substract = (a, b) => a - b;
```

calculate.js은 독립적인 파일 스코프를 가지는 모듈이다. 기본적으로 내부의 코드는 모듈 내부에서만 참조할 수 있다. 하지만 add와 substract를 `module.exports`의 메서드로 추가하면 add 함수와 substract 함수는 외부에 공개된다. (say는 여전히 calculate 모듈에서만 유효한 private 변수로 남아있다.)

이제 다른 파일에서 require 함수를 사용하여 임의의 이름으로 calculator 모듈을 import하고 calculator 모듈이 공개한 코드를 사용할 수 있다. require함수의 인자에서 `.js`와 같은 파일 확장자는 생략 가능.

> index.js

```js
const { add, substract } = require("./calculator.js");

add(2, 3); // 5
substract(10, 1); // 9
```

<br />

#### 방법 2 - 직접 작성한 객체나 함수로 대체

`module.exports`는 기본적으로 빈 객체를 참조하고 있다. '방법 1'이 이 빈 객체에 프로퍼티/메서드를 추가하는 방법이었다면 '방법 2'는 `module.exports`가 참조하는 대상을 사용자가 정의한 새로운 객체 또는 함수로 바꾸는 것이다.

> calculate.js

```js
// 객체로 대체
module.exports = {
  add(a, b) {
    return a + b;
  },
  substract(a, b) {
    return a - b;
  }
};

// 함수로 대체
module.exports = function add(a, b) {
  return a + b;
};
```

> index.js

```js
// 객체로 대체한 경우
const calc = require("./calculator");

calc.add(1, 2); // 3
calc.substract(10, 1); // 9

// 함수로 대체한 경우
calc(1, 1); // 2
```

<br />

`module.exports`가 참조하는 대상을 클래스로 지정할 수도 있는데, 이렇게되면 다른 파일에서 해당 클래스를 확장하여 재사용할 수 있다는 장점이 있다.

> calculator-class.js

```js
module.exports = class Calculator {
  add(a, b) {
    return a + b;
  }
  substract(a, b) {
    return a - b;
  }
};
```

> upgrade-calc.js

```js
const Calculator = require("./calculator-class");

class UpgradedCalculator extends Calculator {
  multiply(a, b) {
    return a * b;
  }
  devide(a, b) {
    return a / b;
  }
}

module.exports = new UpgradedCalculator();
```

> index.js

```js
const calc = require("./upgrade-calc");

calc.add(2, 2); // 4
calc.multiply(3, 3); // 9
```

<br />

### 2. [exports](https://nodejs.org/api/modules.html#modules_exports_shortcut)

```
exports ──참조──> module.exports ──참조──> { }
```

`exports`는 `module.exports` 객체를 참조하고 있는 객체이고, 이러한 참조 관계 덕분에 `exports`를 사용해서 `module.exports`를 좀 더 간결하게 표현할 수 있다는 장점이 있다.

```
module.exports.a = ... === exports.a = ...
```

`module.exports`처럼 공개 프로퍼티/메서드를 추가하면 외부에서 require 함수를 통해 해당 모듈을 사용할 수 있는데,

주의할 점은 `module.exports` '방법 2' 처럼 참조대상을 직접 정의한 객체나 함수로 대체할 경우 **기존의 참조관계가 깨지면서 더이상 모듈로 기능하지 않는다**는 점이다. 다시 말해 외부에서 require 함수로 해당 모듈을 import할 수 없다.

```js
// Right
exports.add = function(a, b) {
  console.log(a + b);
};

exports.substract = function(a, b) {
  console.log(a - b);
};

// Wrong!!
exports = function(a, b) {
  console.log(a + b);
};
```

따라서 `exports` 객체를 사용할 때는 `module.exports`와의 참조관계가 깨지지 않도록 주의해야 한다. `module.exports`에는 어떤 값이든 대입해도 되지만, `exports`에는 반드시 객체처럼 속성명과 속성값을 대입해야 한다.

<br />

---

**Reference**

- https://poiemaweb.com/nodejs-module
- https://edykim.com/ko/post/module.exports-and-exports-in-node.js/
- https://stackoverflow.com/questions/16383795/difference-between-module-exports-and-exports-in-the-commonjs-module-system
- Node.js 교과서 (길벗)
