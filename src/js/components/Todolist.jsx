import React, { useState } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

//Proyecto con codigo de la primera versión del ToDoList entregado

export const Todolist = () => {
    const [inputValue, setInputValue] = useState("");
    const [tasks, setTasks] = useState([]);

    const addTask = (task) => {
        if (task.trim() !== "") {
            setTasks([...tasks, task])
            setInputValue("");
        }
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((t,i) => i !==index);
        setTasks(updatedTasks);
    };


    return (
        <div className="container my-5">
            <div className="card">
                <div className="card-body">
                    <h2>To-Do-List</h2>
                    <div className="input-group mb-3">
                    
                        <input
                            type="text"
                            className="form-control"
                            placeholder="What needs to be done?"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") addTask(inputValue)
                            }}
                        />
                    </div>
                    <ul className="list-group">
                        {tasks.map((task, index) => (
                            <li
                                key={index}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >{task}
                               <FontAwesomeIcon
                                    icon={faTimes}
                                    className="text-danger cursor-pointer"
                                    onClick={() => deleteTask(index)}
                                />
                            </li>
                        ))}
                    </ul>
                    <div className="text-center mt-3">
                    <label>tareas</label>
                    <input
                            type="text"
                            className="form-control"
                            placeholder="What needs to be done?"
                           
                        />
                        {tasks.length} task{tasks.length !== 1 ? "s" : ""}
                        
                    </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                        <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    )

}