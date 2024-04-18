import { useOutletContext, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";


const Dashboard = ({ handleLogout }) => {
  const { user } = useOutletContext(); // Access user data provided by the Outlet's context
  const API = import.meta.env.VITE_BASE_URL;
  const Navigate = useNavigate();
    // const [tasks, setTasks] = useState([]); If we needed ALL tasks displayed, you would need this. 
    const [redTask, setRed] = useState([]);
    const [yellowTask, setYellow] = useState([]);
    const [greenTask, setGreen] = useState([]);



useEffect(() => {
  fetch(`${API}/task/${user.id}`)
  .then((res) => res.json())
  .then((data) => {
    const redTask = data.filter(task => task.cat_id === 1);
    const yellowTask = data.filter(task => task.cat_id === 2);
    const greenTask = data.filter(task => task.cat_id === 3);

    setRed(redTask)
    setYellow(yellowTask)
    setGreen(greenTask)

  });
}, [API, user.id]); 



  return (
    <div style={{
      backgroundImage: `url(${`https://res.cloudinary.com/djg5i10dg/image/upload/c_crop,w_2160,h_1215,x_0,y_472,ar_16:9/v1713412296/pattern_cross-section_1_2_0-0_0_1__ffffff_c0b7d1_iduu8f.png`})`,
      backgroundSize: "cover",
    }} className="pb-24">
      <br />
      <br />
      <div className="border bg-slate-50 rounded-sm w-max ml-3 shadow-xl">
      {user && (
        <h1 className="text-4xl ml-5">
          Welcome to TaskMate, {user.username[0].toUpperCase()}
          {user.username.slice(1).toLowerCase()}!
        </h1>
      )}
        <h3 className="text-2xl ml-5">
          Productivity made SMART.
        </h3>
        </div>
        <div className="goalForm-button flex justify-center">
          <button className="bg-sky-300 rounded-xl py-2 px-10 my-10 shadow-xl hover:bg-sky-500"onClick= {() => Navigate("/task/goals")} >
          + Add New Task
          </button>
        </div>
        <div className="grid grid-cols-3 h-80 gap-3 mx-8">
            <div className="RedTasks grid-cols-1 bg-red-500 shadow-2xl rounded-sm">
                <h2 className="redTitle text-center text-2xl font-semibold my-2">Red Tasks</h2>
                <ul className="ml-3">
                    {redTask.map(task => (
                        <li className="p-1 inline-block border-2 border-white bg-white mb-2 rounded shadow-lg hover:bg-zinc-200"
                        onClick={() => Navigate(`/task/goals/edit/${task.task_id}`)}key={task.task_id}>{task.title}</li>
                    ))}
                </ul>
            </div>
            <div className="YellowTasks grid-cols-1 bg-yellow-300 shadow-2xl rounded-sm">
                <h2 className="yellowTitle text-center text-2xl font-semibold my-2">Yellow Task</h2>
                <ul className="ml-3">
                    {yellowTask.map(task => (
                       <li className="p-1 inline-block border-2 border-white bg-white mb-2 rounded shadow-lg hover:bg-zinc-200"
                       onClick={() => Navigate(`/task/goals/edit/${task.task_id}`)}key={task.task_id}>{task.title}</li>
                    ))}
                </ul>
            </div>
            <div className="GreenTasks grid-cols-1 bg-green-500 shadow-2xl rounded-sm">
                <h2 className="greenTitle text-center text-2xl font-semibold my-2">Green Tasks</h2>
                <ul className="ml-3">
                    {greenTask.map(task => (
                        <li className="p-1 inline-block border-2 border-white bg-white mb-2 rounded shadow-lg hover:bg-zinc-200"
                        onClick={() => Navigate(`/task/goals/edit/${task.task_id}`)}key={task.task_id}>{task.title}</li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  );
};

export default Dashboard;
