import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";

const Home = (authenticated) => {
  let navigate = useNavigate();

  return (
    <div className="pt-5 mx-auto">
      <h1>Welcome to Chatty</h1>
      <p className="lead">Here you can send and receive messages.</p>
      <Button color="primary" block onClick={() => navigate("/chat")} className="p-2">
        Start
      </Button>
    </div>
  );
};

export default Home;
