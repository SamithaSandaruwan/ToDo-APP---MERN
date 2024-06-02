import { useEffect, useState } from "react"
import Create from "./Create"
import axios from "axios"
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";

const Home = () => {
    const [todos,setTodo] = useState([])

    useEffect(() => {
      axios.get ('http://localhost:3001/get')
      .then (result => setTodo(result.data))
      .catch(err => console.log(err))
    },[])

    
    const handleEdit = (id, done) => {
      axios.put(`http://localhost:3001/update/${id}`)
        .then(result => {
          // Update the specific todo item in the state
          setTodo(todos.map(todo => 
            todo._id === id ? { ...todo, done: !done } : todo
          ));
        })
        .catch(err => console.log(err));
    };

    const handleDelete = (id) =>{
      axios.delete ('http://localhost:3001/delete/'+id)
     .then (result => {location.reload(result.data)})
     .catch(err => console.log(err))
    }

  return (
    <div className="home">
      <h2>- To Do List -</h2>
      <Create/>
      {
        todos.length === 0
        ?
        <div><h2>No Record</h2></div>
        : todos.map(todo => (
          <div key={todo.id} className="task">
            <div className="checkbox" onClick={() => handleEdit(todo._id, todo.done)}>
                {todo.done ?
                  <BsFillCheckCircleFill className="icon" />
                  :
                  <BsCircleFill className="icon" />
                }
                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
              </div>
            <div>
              <span><BsFillTrashFill className="icon" onClick={()=>handleDelete(todo._id)} /></span>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Home
