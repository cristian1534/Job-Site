import React, { useEffect, useState } from "react";
import { Box, Container, Divider, Typography } from "@mui/material";
import { styled } from "@mui/material";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";

// Styles...
const BoxContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  padding: 3rem;

  @media (max-width: 600px) {
    padding: 2rem;
  }
`;

const Image = styled("img")`
  width: 100%;
  max-width: 400px;
  height: auto;
`;

const Banner = (props) => {
  const [animationTrigger, setAnimationTrigger] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationTrigger((prevTrigger) => prevTrigger + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <BoxContainer>
        <Typography variant="h4" color="primary" align="center" mb={3}>
          <TypeAnimation
            sequence={[`${props.title}`, 2000]}
            speed={30}
            key={animationTrigger}
          />
        </Typography>
        <motion.div
          variants={fadeIn("down", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
        >
          <Typography
            variant="body1"
            color="textSecondary"
            align="center"
            mb={3}
          >
            {props.subTitle}
          </Typography>
        </motion.div>
        <motion.div
          variants={fadeIn("down", 0.3)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
        >
          <Image src={props.url} alt="banner" />
          {props.redirection && (
            <Typography
              variant="body1"
              color="textSecondary"
              align="center"
              m={2}
              padding="0 1rem"
            >
              Become part of our candidates, it is very simple just{" "}
              <Link href="/register" style={{ textDecoration: "none" }}>
                <b style={{ color: "#1976d2" }}>REGISTER</b>
              </Link>{" "}
              here.
            </Typography>
          )}
        </motion.div>
      </BoxContainer>
      <Divider light />
    </Container>
  );
};

export default Banner;
