import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export const TodoListFetch = () => {
    const [task, setTask] = useState('');
    const [todos, setTodos] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editTask, setEditTask] = useState({});
    const [labelEdit, setLabelEdit] = useState('');
    const [completedEdit, setCompletedEdit] = useState();
    const baseURL = 'https://playground.4geeks.com/todo';
    const user = 'alex22bo';

    /*Función GET*/
    const getTodos = async () => {
        const uri = `${baseURL}/users/${user}`;
        const options = {
            method: 'GET'
        }
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log('error:', response.status, response.statusText)
            return
        }
        const data = await response.json();
        console.log(data);
        setTodos(data.todos);
    }
    useEffect(() => {
        getTodos()
    }, [])

    /*Función POST */
    const handleSubmitAdd = async (event) => {
        event.preventDefault();
        const dataToSend = {
            label: task,
            is_done: false
        };
        const uri = `${baseURL}/todos/${user}`
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        }
        const response = await fetch(uri, options);
        if (!response.ok) {
            //tratamos el error
            console.log('error:', response.status, response.statusText)
            return
        }
        setTask('')
        getTodos()
    }


    /* DELETE */
    const handleDelete = async (taskId) => {
        const uri = `${baseURL}/todos/${taskId}`
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(uri, options);
        if (!response.ok) {
            //tratamos el error
            console.log('error:', response.status, response.statusText)
            return
        }
        getTodos()
    }

    /* PUT */
    const handleEdit = (taskEdit) => {
        setIsEdit(true)
        setEditTask(taskEdit)
        setLabelEdit(taskEdit.label)
        setCompletedEdit(taskEdit.is_done)
    }

    const handleSubmitEdit = async (event) => {
        event.preventDefault();
        // DEFINIR BODY
        const dataToSend = {
            label: labelEdit,
            is_done: completedEdit
        };
        const uri = `${baseURL}/todos/${editTask.id}`;
        const options = {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        }
        const response = await fetch(uri, options);
        if (!response.ok) {
            //tratamos el error
            console.log('error:', response.status, response.statusText)
            return
        }
        getTodos()
        setIsEdit(false);
        setEditTask({})
        setLabelEdit('')
        setCompletedEdit(null)
    }

    const handleReturn = () => {
        setIsEdit(false)
        setEditTask({})
        setLabelEdit('')
        setCompletedEdit(null)
    }

    return (
        <div className="container my-5">
            <h1 className="text-secondary text-center">To-Do-List</h1>
            <div className="card p-4">
                {isEdit ?
                    (<form onSubmit={handleSubmitEdit}>
                        <div className="mb-3">
                            <label htmlFor="editTask" className="form-label">Edit Task</label>
                            <input type="text" className="form-control" id="editTask"
                                value={labelEdit} onChange={(event) => { setLabelEdit(event.target.value) }} />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="CompletedCheck"
                                checked={completedEdit} onChange={(event) => { setCompletedEdit(event.target.checked) }} />
                            <label className="form-check-label" htmlFor="CompletedCheck">Completed</label>
                        </div>
                        <button type="submit" className="btn btn-primary me-2">Submit</button>
                        <button type="reset" className="btn btn-secondary" onClick={handleReturn}>Return</button>
                    </form>)

                    :

                    (<form onSubmit={handleSubmitAdd}>
                        <div className="text-start mb-3">
                            <label htmlFor="addTask" className="form-label">Add Task</label>
                            <input type="text" className="form-control" id="addTask"
                                value={task} onChange={(event) => setTask(event.target.value)} />
                        </div>
                    </form>)
                }

                <h2 className="text-primary text-center mt-5">List</h2>
                <ul className="text-start list-group ">
                    {todos.map((item) => <li key={item.id}
                        className="list-group-item hidden-icon d-flex justify-content-between">
                        <div>
                            {item.is_done ?
                                <FontAwesomeIcon icon={faCheck} className="text-success me-2" />
                                :
                                <FontAwesomeIcon icon={faCircleXmark} className="text-danger me-2" />
                            }
                            {item.label}
                        </div>
                        <div>
                            <span onClick={() => handleEdit(item)}>
                                <FontAwesomeIcon icon={faPenToSquare} className="text-primary me-2" /></span>

                            <span onClick={() => handleDelete(item.id)}>
                                <FontAwesomeIcon icon={faTrash} className="text-danger" /></span>
                        </div>
                    </li>)}
                    <li className="list-group-item text-end">{todos.length === 0 ? 'No tasks, please add a new task' : todos.length + ' tasks'}</li>
                </ul>

            </div>
        </div>
    )
}