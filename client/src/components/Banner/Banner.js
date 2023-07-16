import React from "react";
import { Box, Container, Divider, Typography } from "@mui/material";
import { styled } from "@mui/material";
import Link from "next/link";

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
  return (
    <Container>
      <BoxContainer>
        <Typography variant="h4" color="primary" align="center" mb={3}>
          {props.title}
        </Typography>
        <Typography variant="body1" color="textSecondary" align="center" mb={3}>
          {props.subTitle}
        </Typography>
        <Image src={props.url} alt="banner" />
      </BoxContainer>
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
            <b style={{ color: "blue" }}>REGISTER</b>
          </Link>{" "}
          here.
        </Typography>
      )}
      <Divider light />
    </Container>
  );
};

export default Banner;
