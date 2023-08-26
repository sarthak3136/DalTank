import React, { useEffect, useState } from "react";

import "./Transition.css";

const Steps = () => {
  const [visibleSteps, setVisibleSteps] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setVisibleSteps((prevVisibleSteps) => prevVisibleSteps + 1);
    }, 1000);

    return () => {
      clearInterval(stepInterval);
    };
  }, []);

  const steps = [
    { number: "Have Innovative ideas?" },

    { number: "Publish them on DalTank" },

    { number: "Get Reviewed by Investors" },

    { number: "Start your startup journey" },
  ];

  return (
    <div className="step-container">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div
            className={`step ${
              index % 2 === 0 ? "circle-step" : "arrow-step"
            } ${index < visibleSteps ? "visible" : ""}`}
          >
            <span className="step-number">{step.number}</span>

            <span className="step-text">{step.text}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Steps;
