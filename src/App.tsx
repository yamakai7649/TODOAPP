import { useMemo, useState } from 'react'
import { Trash } from 'lucide-react';
import './App.css'

type Todo = {
  id: string;
  content: string;
  completed: boolean;
  deleted: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inp, setInp] = useState<string>("");
  const [option, setOption] = useState<string>("all");

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inp.trim() === "") return;

    const newTodo = {
      id: crypto.randomUUID(),
      content: inp.trim(),
      completed: false,
      deleted: false,
    }

    setTodos(todos => [...todos, newTodo]);
    setInp("");
  };

  const handleDeleteTodo = (id :string) => {
    setTodos(todos => 
      todos.map(todo => 
        todo.id === id ?
          { ...todo, deleted: true } : todo
      )
    );
  };

  const handleCompleteTodo = (id: string) => {
    setTodos(todos =>
      todos.map((todo) =>
        todo.id === id ?
          { ...todo, completed: true } : todo
      )
    );
  };

  const handleEditTodo = (id: string,content: string) => {
    setTodos(todos =>
      todos.map((todo) => 
        todo.id === id ? 
        {...todo, content: content} : todo        
      )
    );
  };

  const filteredTodos: Todo[] = useMemo(() => {
    if (option === "all") return todos.filter(todo => !todo.deleted);
    if (option === "active") return todos.filter(todo => !todo.completed && !todo.deleted);
    if (option === "completed") return todos.filter(todo => todo.completed && !todo.deleted);
    return todos.filter(todo => todo.deleted);
  },[todos, option]);

  /*useEffect(() => {
    console.log(todos);
    console.log(filteredTodos);
  }, [todos, filteredTodos]);*/

  return (
    <>
      <div className='flex justify-center items-center w-screen h-screen'>
        <div className='flex flex-col items-center w-2/3 h-3/4 rounded-3xl bg-gray-200 gap-6 p-8 pb-10'>
          <h1 className='text-3xl font-medium'>TODO APP</h1>
          <form className='flex w-2/3 gap-3' onSubmit={handleAddTodo}>
            <input className="flex-1 p-3 px-4 bg-white rounded outline-none" type="text" placeholder='Add Todo Item' value={inp} onChange={(e) => setInp(e.target.value)} />
            <button className='cursor-pointer px-4 rounded bg-black text-white hover:bg-gray-600' type='submit' disabled={inp ? false : true}>Add</button>
          </form>
          <div>
            <select value={option} onChange={(e)=> setOption(e.target.value)}>
              <option value="all">all</option>
              <option value="active">active</option>
              <option value="completed">completed</option>
              <option value="deleted">deleted</option>
            </select>
          </div>
          <div className='w-3/5 flex flex-1 flex-col gap-4 overflow-auto relative'>
            {
              filteredTodos.length === 0 ?
                <p className='text-xl absolute left-1/2 top-2/5 -translate-x-1/2'>Nothing yet</p>
                :
                filteredTodos.map((todo: Todo) => (
                  <div key={todo.id} className='flex gap-4'>
                    <input className='cursor-pointer' type="checkbox" checked={todo.completed} onChange={() => handleCompleteTodo(todo.id)} />
                    <input className={`flex-1 rounded p-3 px-4 outline-none text-sm ${todo.completed ? `bg-gray-300 cursor-not-allowed text-gray-600` : `bg-white`}`} type="text" value={todo.content} onChange={e => handleEditTodo(todo.id, e.target.value)} disabled={todo.completed} />
                    <button className='cursor-pointer' onClick={() => handleDeleteTodo(todo.id)}><Trash size={20} /></button>
                  </div>
                ))
            }
          </div>
          {
            filteredTodos.length !== 0 &&
            <div className='w-3/5 flex'>
              <p>{filteredTodos.length} items left</p>
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default App
