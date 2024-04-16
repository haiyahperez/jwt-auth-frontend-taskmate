import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from './ProtectedRoute'; 
import { useOutletContext } from "react-router-dom";

const Task = () => {
    const API = import.meta.env.VITE_BASE_URL;
    const [tasks, setTasks] = useState({
        title:''
});
    const { user } = useOutletContext();

    useEffect(() => {
        const fetchTasksByUser = async () => {
          
            try {
                const response = await fetch(`${API}/task?user_id=${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error fetching tasks: ${response.statusText}`);
                }

                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchTasksByUser(user); 
    }, [API, user.id]); 

    // const redTasks = tasks.filter(task => task.cat_id === 1);
    // const yellowTasks = tasks.filter(task => task.cat_id === 2);
    // const greenTasks = tasks.filter(task => task.cat_id === 3);

    return (
        <div>
            <div className="RedTasks">
                <h2>Red Tasks</h2>
                <ul>
                    {redTasks.map(task => (
                        <li key={task.task_id}>{task.title}</li>
                    ))}
                </ul>
            </div>
            <div className="YellowTasks">
                <h2>Yellow Tasks</h2>
                <ul>
                    {yellowTasks.map(task => (
                        <li key={task.task_id}>{task.title}</li>
                    ))}
                </ul>
            </div>
            <div className="GreenTasks">
                <h2>Green Tasks</h2>
                <ul>
                    {greenTasks.map(task => (
                        <li key={task.task_id}>{task.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Task;
