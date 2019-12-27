# 자바스크립트 호이스팅(Hoisting)

호이스팅(Hoisting)은 변수 또는 함수가 자신이 속한 실행 컨텍스트의 최상단으로 끌어올려진것 처럼 동작하는 것을 말한다.

```js
console.log(a); // (1)
b(); // (2)

var a = "Hello";

function b() {
  console.log("Function 'b' is hoisted!");
}

console.log(a); // (3)
```

```
undefined ─ (1)
Function 'b' is hoisted! ─ (2)
Hello ─ (3)
```

(1) 변수 `a`를 초기화하기 전이지만 에러가 아닌 `undefined`이 출력되었다. → 호이스팅<br />
(2) 함수 `b`를 초기화하기 전이지만 `b`가 정상적으로 호출되었다. → 호이스팅<br />
(3) line 4에서 변수 `a`를 초기화 한 뒤에는 해당 값("Hello")이 정상적으로 출력되었다.

(1), (2)와 같이 선언 하지 않은 변수/함수를 사용할 수 있었던 이유는 무엇일까? 여기에 대한 답은 자바스크립트 엔진이 실행 컨텍스트를 생성하는 과정에서 찾아볼 수 있다.

<br />

## 실행 컨텍스트의 생성 과정

[실행 컨텍스트](https://reese-dev.netlify.com/javascript/execution-context/)는 코드가 실행되는 환경을 말하며 **Creation Phase**와 **Execution Phase** 두 단계에 걸쳐 생성된다. 각 단계에서 일어나는 일들을 간략하게 정리하면 다음과 같다.

### 1. Creation Phase

- Global Object, this, Outer Environment를 메모리에 할당한다.
- parser가 코드를 읽어가며(run through) 변수와 함수가 명시된 위치를 파악하고 각각의 변수/함수에 해당하는 메모리 공간을 확보한다. ─ 생성(instantiation)

  위 과정이 끝나면 자바스크립트 엔진은 메모리상에 존재하는 변수/함수에 접근해서 사용할 수 있게 된다.<br />→ 호이스팅이 발생하는 원인!

### 2. Execution Phase

- 변수에 실질적인 값을 할당한다. ─ 초기화(initialization)
- 코드를 실행한다.

<br />

이제 자바스크립트 엔진이 실행 컨텍스트의 Creation Phase에서 변수/함수를 생성(instatiation)하는 과정을 조금 더 자세히 살펴보면서 호이스팅이 일어나는 원리를 알아보자.

<br />

## 변수의 생성 그리고 호이스팅

앞서 소스코드에서 변수 `a`를 다루는 부분만 추출해보았다. line 1의 `console.log(a);`가 에러 대신 `undefined`를 출력한다.

```js{1}
console.log(a); // undefined

var a = "Hello";

console.log(a); // Hello
```

이렇게 선언하지 않은 변수를 사용할 수 있었던 이유는, 엔진이 실행 컨텍스트의 Creation Phase에서 변수의 선언부 `var a`를 메모리에 올리고 `undefined`라는 값을 임의로 할당하여 변수 `a`를 초기화 하기 때문이다.

변수의 선언부 `var a`를 메모리에 올린 후 Execution Phase에서 "Hello"라는 실질적인 값을 할당하기 전까지 엔진은 `a`라는 변수의 존재는 알고 있지만 그 값은 모르는 상태가 된다. 이러한 상태를 표시하기 위해 `a`에 `undefined`라는 값을 할당해두는 것이다. undefine의 사전적 의미대로 '아직 정의되지 않은', '확실하지 않은' 변수라는 뜻을 나타낸다.

이렇게 `var`로 선언된 변수는 생성(instantiation)과 동시에 `undefined`라는 값으로 초기화(initialization)되기 때문에 선언되기 전에 사용하더라도 에러가 발생하지 않는다.

코드로 표현해보면 다음과 같이 나타낼 수 있겠다.

```js{1}
var a; // var a = undefined;

console.log(a); // undefined

a = "Hello";

console.log(a); // Hello
```

> 변수의 선언부가 끌어올려지고(hoisted), `undefined`로 초기화 되어 있다.

<br />

## 함수의 생성 그리고 호이스팅

함수의 경우 정의된 방식에 따라 호이스팅 여부가 달라진다.

### 1. function declaration

```js
b(); // Function 'b' is hoisted!

function b() {
  console.log("Function 'b' is hoisted!");
}
```

함수 선언문 형태로 정의된 함수는 Creation Phase에서 함수가 **통째로** 메모리에 올라간다. 즉, 자신이 속해있는 실행 컨텍스트의 최상단으로 '통째로' 호이스팅 되기 때문에 선언하기 전에 호출해서 사용할 수 있다.

<br />

### 2. function expression

```js
console.log(c); // undefined
c(); // Uncaught TypeError: c is not a function

var c = function() {
  console.log("Function 'c' is hoisted!");
};
```

반면 함수 표현식 형태로 정의된 함수는 `var`로 선언된 변수와 마찬가지로 **선언부만** 메모리에 올라간다.(선언부만 호이스팅 된 셈)

`c`라는 변수 메모리에는 `undefined`이 들어있기 때문에 line 4에서 함수를 할당하기 전에 호출하면 에러가 발생한다.

<br />

## let 그리고 const

```js
console.log(say);
// Uncaught ReferenceError: Cannot access 'say' before initialization

let say = "Good bye";
```

`let`이나 `const`로 선언한 변수 역시 `var` 변수 처럼 선언부만이 메모리에 올라간다.(선언부만 호이스팅) **하지만 `undefined`으로 초기화되지는 않는다.**

초기화 되기 전까지의 변수는 **Temporal dead zone(TDZ)**에 들어있다고 표현하며, TDZ에 들어있는 변수에 접근할 경우 ReferenceError가 발생한다.

<br />

---

- https://developer.mozilla.org/ko/docs/Glossary/Hoisting
- 인사이드 자바스크립트 (한빛미디어)
- You don't know JS (타입과 문법, 스코프와 클로저)
