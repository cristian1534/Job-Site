import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { Typography } from "@mui/material";

export const NoCandidates = () => {
  const [animationTrigger, setAnimationTrigger] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationTrigger((prevTrigger) => prevTrigger + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Typography variant="h6" color="textSecondary">
        <TypeAnimation
          sequence={["No Candidates Here", 2000]}
          speed={30}
          key={animationTrigger}
        />
      </Typography>
    </div>
  );
};
