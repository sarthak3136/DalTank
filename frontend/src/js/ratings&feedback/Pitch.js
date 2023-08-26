import React, { useEffect, useState } from "react";
import Header from "../Header";
import IdeasCard from "./IdeasCard";
import axios from "axios";

function Pitch() {
  const [allIdeas, setAllIdeas] = useState([]);

  useEffect(() => {
    axios
      .get("https://group12-backend.onrender.com/get-ideas")
      .then((res) => {
        console.log(res.data);
        setAllIdeas(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      <h1 className="totalPitches" style={{ marginTop: "5rem" }}>
        Total Pitches
      </h1>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {allIdeas.map((idea) => (
          <IdeasCard
            _id={idea._id}
            productName={idea.ideaName}
            image={idea.ideaProductLogoUrl}
            description={idea.ideaDescription}
          />
        ))}
      </div>
    </div>
  );
}

export default Pitch;
