import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div style={{ textAlign: "center", marginTop: 100 }}>
      <h1>Welcome to TaskMate!</h1>

      <h3>
      To start, click the link below to find your tasks. 
      </h3>
      <Link to="/dashboard">Let's Get To Work</Link>
    </div>
  );
}

export default LandingPage;
