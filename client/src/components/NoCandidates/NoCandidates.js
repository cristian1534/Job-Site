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
      <Typography variant="h3" color="primary">
        <TypeAnimation
          sequence={["NO CANDIDATES SO FAR...", 2000]}
          speed={30}
          key={animationTrigger}
        />
      </Typography>
    </div>
  );
};
