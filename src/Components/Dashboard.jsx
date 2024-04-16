import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

const Dashboard = ({ handleLogout }) => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context
  const API = import.meta.env.VITE_BASE_URL;
    const [tasks, setTasks] = useState([]);
console.log(user)
useEffect(() => {
  // fetchTasksByUser(user); 
}, [API, user.id]); 
const fetchTasksByUser = async () => {
  
    try {
        const response = await fetch(`${API}/task?user_id=${user.user_id}`, {
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
  return (
    <div>
      <br />
      <br />
      {user && (
        <h1>
          Welcome to TaskMate, {user.username[0].toUpperCase()}
          {user.username.slice(1).toLowerCase()}!
        </h1>
      )}
        <h3>
          Productivity made SMART.
        </h3>

      {/* Use user data as needed, for example: */}

      {/* <button onClick={handleLogout}>Logout</button> */}
    </div>
  );
};

export default Dashboard;
