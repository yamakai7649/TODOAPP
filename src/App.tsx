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
        <div className='flex flex-col items-center w-2/3 h-3/4 rounded-3xl bg-gray-100 gap-2 p-4'>
          <h1 className='text-3xl font-medium'>TODO APP</h1>
          <form className='flex w-2/3 ' onSubmit={handleAddTodo}>
            <input type="text" placeholder='Add Todo Item' value={inp} onChange={(e) => setInp(e.target.value)} />
            <button type='submit' disabled={inp ? false : true}>追加</button>
          </form>
          <div className='w-2/3'>
            {
              todos.length === 0 ?
                <p>Nothing yet</p>
                :
                todos.map((todo: Todo) => (
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
