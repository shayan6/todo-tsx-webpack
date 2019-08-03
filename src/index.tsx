import React, { Fragment, useState } from "react";
import ReactDom from "react-dom";

type formEle = React.FormEvent<HTMLFormElement>;
interface ITodo {
  text: string;
  complete: boolean;
}
export default function App(): JSX.Element {
  const [value, setValue] = useState<string>("");
  const [todos, setTodo] = useState<ITodo[]>([]);
  const handleSubmit = (e: formEle): void => {
    e.preventDefault();
    addTodos(value);
    setValue("");
  };
  const addTodos = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }];
    setTodo(newTodos);
  };

  const completeTodo = (index: number) => {
    const newTodo: ITodo[] = [...todos];
    newTodo[index].complete = !newTodo[index].complete;
    setTodo(newTodo);
  };

  const removeTodo = (index: number) => {
    const newTodo: ITodo[] = [...todos];
    newTodo.splice(index, 1);
    setTodo(newTodo);
  };

  console.log(todos);

  return (
    <Fragment>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        {/* onchange nh hoga to const value change nhe hosake gi */}
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          required
        />
        <section>
          {todos.map((val:ITodo, index:number) => (
            <Fragment key={index}>
              <div
                style={{ textDecoration: val.complete ? "line-through" : "" }}
              >
                {val.text}
              </div>
              <button type="button" onClick={() => completeTodo(index)}>
                {val.complete ? "Incomplete" : "Complete"}
              </button>
              <button type="button" onClick={() => removeTodo(index)}>
                {" "}
                &times;{" "}
              </button>
            </Fragment>
          ))}
        </section>
        <button> Submit </button>
      </form>
    </Fragment>
  );
}

const root = document.getElementById("app-root");

ReactDom.render(<App />, root);
