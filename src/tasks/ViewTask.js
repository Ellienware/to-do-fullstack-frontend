import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewTask() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    completed: "",
    dueDateTime:"",
  });

  const { id } = useParams();

  useEffect(() => {
    loadTask();
  }, []);

  const loadTask = async () => {
    const result = await axios.get(`http://localhost:8080/api/tasks/${id}`);
    setTask(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Task Details</h2>

          <div className="card">
            <div className="card-header">
              Details of Task id : {task.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Task:</b>
                  {task.title}
                </li>
                <li className="list-group-item">
                  <b>Description:</b>
                  {task.description}
                </li>
                <li className="list-group-item">
                  <b>Completed:</b>
                  {task.completed}
                </li>
                <li className="list-group-item">
                  <b>DueDateTime:</b>
                  {task.dueDateTime}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
