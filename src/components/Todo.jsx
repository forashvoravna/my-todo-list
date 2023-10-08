import React from 'react'
import { useState } from 'react'
import { backend } from './backend';
import "../../node_modules/bootstrap/dist/css/bootstrap.css"
import "./Todo.css"

export default function Todo() {
    const [todoList, setTodoList] = useState(backend);
    const [todo, setTodo] = useState("");
    const data = todoList;



    function onChangeHandler(e){
      setTodo(e.target.value)
      console.log(todo);
    }

    function onChecked(id){
      data.map((item) =>{
        if(item.id === id){
          item.status = !item.status
        }    
    })
    console.log(data);
    setTodoList(data)
    }

    function onDelete(id){
      let save = data.filter((item) => item.id !== id)
      setTodoList(save)
      console.log(todoList);
    }

    function addTodo(e){

      let obj = {
        id: todoList.length + 1,
        todo :todo,
        status: false
      }
      console.log(obj);

      setTodoList(todoList => [...todoList,obj])

    }

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>№</th>
            <th>Check</th>
            <th>ToDo</th>
            <th>isDelete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) =>{
            return(
              <tr  key={item.id}>
                 <td>{item.id}</td>
                 <td><input type="checkbox" defaultChecked={item.status} onChange = {()=>onChecked(item.id)} ></input></td>
                 <td className={item.status ? "overline" : ""}>{item.todo}</td>
                 <td><button className="btn btn-danger" onClick = {()=>onDelete(item.id)}>delete</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="input-group in">
        <input type="text" className="form-control "
         placeholder="Todo kiriting" name="todo"
          onChange={onChangeHandler} />
        <button className="btn btn-primary" type='submit' onClick={addTodo}>Add</button>
      </div>
    </>
  )
}
