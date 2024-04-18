import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import NavBar from "./Components/NavBar";
import LandingPage from "./Components/LandingPage";

import GoalForm from "./Components/GoalForm";

function App() {
  const navigate = useNavigate();
  const [toggleLogin, setToggleLogin] = useState(false);

  async function handleLogout() {
    localStorage.removeItem("token");

    await setToggleLogin(false);

    navigate("/login");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToggleLogin(true);
    }
  }, [])
  return (
    <>
      <NavBar
        handleLogout={handleLogout}
        toggleLogin={toggleLogin}
        setToggleLogin={setToggleLogin}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={<Login setToggleLogin={setToggleLogin} />}
        />
        <Route
          path="/register"
          element={<Register setToggleLogin={setToggleLogin} />}
        />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/task/goals"
            element={<GoalForm />}
          />
          <Route 
            path="/task/goals/edit/:id"
            element={<GoalForm />}
          />
          <Route
            path="/dashboard"
            element={<Dashboard handleLogout={handleLogout} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
