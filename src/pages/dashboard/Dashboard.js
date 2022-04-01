import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <Link to="/dashboard/?name=vuhainam&age=21" replace>
      Test Param
    </Link>
  );
}

export default Dashboard;
