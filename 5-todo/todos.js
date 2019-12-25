const todos = require("./todo-data");

const countTasks = () => {
  let todo = 0,
    doing = 0,
    done = 0;

  const countingFuncs = {
    todo: () => todo++,
    doing: () => doing++,
    done: () => done++
  };

  todos.forEach(data => {
    const { status } = data;
    countingFuncs[status] && countingFuncs[status]();
  });

  console.log(`현재상태: todo: ${todo}개, doing: ${doing}개, done: ${done}개`);
};

const filterTasks = status => {
  const filtered = todos.reduce((result, curr) => {
    if (curr.status === status) {
      result.push(curr.name);
    }
    return result;
  }, []);

  console.log(
    `${status}리스트: 총 ${filtered.length}건 - ${filtered.join(", ")}`
  );
};

const show = cmd => {
  switch (cmd) {
    case "all":
      countTasks();
      break;
    case "todo":
    case "doing":
    case "done":
      filterTasks(cmd);
      break;
    default:
      console.log("유효한 명령어가 아닙니다.");
  }
};

show("all");
show("todo");
