import { useState } from 'react'
import './App.css'

type Todo = {
  id: string;
  content: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inp, setInp] = useState<string>("");

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inp.trim() === "") return;

    const newTodo = {
      id: crypto.randomUUID(),
      content: inp.trim(),
      completed: false
    }

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setInp("");
  };

  const handleDeleteTodo = (id :string) => {
    setTodos(prevTodos =>
      prevTodos.filter((todo) =>
        todo.id !== id
      )
    );
  };

  const handleCompleteTodo = (id: string) => {
    setTodos(prevTodos =>
      prevTodos.map((todo) =>
        todo.id === id ?
          { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEditTodo = (id: string,content: string) => {
    setTodos(prevTodos =>
      prevTodos.map((todo) => 
        todo.id === id ? 
        {...todo, content: content} : todo        
      )
    );
  };

  //useEffect(() => console.log(todos), [todos]);

  return (
    <>
      <div className='flex justify-center items-center w-screen h-screen'>
        <div className='flex flex-col justify-center items-center'>
          <h1>TODO APP</h1>
          <form className='flex' onSubmit={handleAddTodo}>
            <input type="text" placeholder='Add Todo Item' value={inp} onChange={(e) => setInp(e.target.value)} />
            <button type='submit'>追加</button>
          </form>
          <div>
            {
              todos?.map((todo: Todo) => (
                <div key={todo.id} className='flex'>
                  <input type="checkbox" checked={todo.completed} onChange={() => handleCompleteTodo(todo.id)} />
                  <input type="text" value={todo.content} onChange={e => handleEditTodo(todo.id, e.target.value)} disabled={todo.completed} />
                  <button onClick={() => handleDeleteTodo(todo.id)}>削除</button>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default App
