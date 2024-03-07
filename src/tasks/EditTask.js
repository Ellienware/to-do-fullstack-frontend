import React, {useEffect, useState}from 'react'
import axios from "axios";
import {Link, useNavigate,useParams} from "react-router-dom";

export default function EditTask() {
  let navigate=useNavigate();
  const {id}=useParams()
  const [task,setTask]=useState({
    title: "",
    description: "",
    completed: "false",
    dueDateTime:"",
  });

  const{title, description, completed,dueDateTime}= task

  const onInputChange=(e)=>{
    setTask({...task,[e.target.name]:e.target.value})
  };

  useEffect(()=>{
    loadTask()
  },[]);

  const onSubmit=async(e)=>{
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/tasks/${id}`,task)
    navigate("/");
  }

  const loadTask = async ()=>{
    const result=await axios.get(`http://localhost:8080/api/tasks/${id}`)
    setTask(result.data)
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Edit Task Infomation</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                name="title"
                value={title}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                name="description"
                value={description}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="completed" className="form-label">
                Completion Status
              </label>
              <select
                className="form-control"
                name="completed"
                value={completed}
                onChange={(e) => onInputChange(e)}
              >
                <option value="true">Completed</option>
                <option value="false">Not Completed</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="dueDateTime" className="form-label">
                Due Date and Time
              </label>
              <input
                type="datetime-local"
                className="form-control"
                name="dueDateTime"
                value={dueDateTime}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}