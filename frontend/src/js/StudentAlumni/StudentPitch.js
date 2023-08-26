import React, { useEffect, useState } from "react";
import Header from "../Header";
import StudentIdeasCard from "./StudentIdeasCard";
import fakePitchData from "../ratings&feedback/FakePitchData";
import axios from "axios";

function StudentPitch() {
  const [studentIdeas, setStudentIdeas] = useState([]);
  const [selectedIdea, setSelectedIdea] = useState(null);
  const user = localStorage.getItem("user");
  const { _id } = JSON.parse(user);
  useEffect(() => {
    var userId = _id;

    axios
      .get(`https://group12-backend.onrender.com/getIdeaByUserId/${userId}`)
      .then((res) => {
        setStudentIdeas(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCardClick = (ideaData) => {
    setSelectedIdea(ideaData);
  };
  return (
    <div className="App">
      <Header />
      <h1 className="totalPitches" style={{ marginTop: "5rem" }}>
        Your Submitted Ideas
      </h1>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {studentIdeas.map((idea) => (
          <StudentIdeasCard
            key={idea._id}
            ideaId={idea._id}
            productName={idea.ideaName}
            image={idea.ideaProductLogoUrl}
            description={idea.ideaDescription}
            onSelect={() => handleCardClick(idea)}
          />
        ))}
      </div>
    </div>
  );
}

export default StudentPitch;
