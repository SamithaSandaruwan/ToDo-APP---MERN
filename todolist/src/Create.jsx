import { useState } from "react"
import axios from "axios"

function Create() {
  const [task,setTask] =useState()
  const handleClick = () =>{
    axios.post('http://localhost:3001/add' ,{task:task})
    .then(result => {
      location.reload(result)
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="mt-2">
      <div className="create_form">
        <input type="text"  placeholder="Enter task" onChange={(e) => setTask(e.target.value)}/>
        <button type="button" onClick={handleClick} >Add</button>
      </div>
    </div>  
  )
}

export default Create
