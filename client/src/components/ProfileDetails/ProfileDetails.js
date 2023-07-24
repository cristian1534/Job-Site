import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { Typography, styled, Avatar, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import CustomModal from "../modal/Modal";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import { TypeAnimation } from "react-type-animation";

// Styles...
const FormContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    width: calc(50% - 5rem);
    margin: 0 auto;
    padding-top: 0;
  }

  @media (max-width: 767px) {
    button {
      width: auto;
      height: 50px;
      padding: 1rem;
    }
  }
`;

const Form = styled("form")`
  padding: 30px;
  border: 1px solid rgba(150, 150, 150, 0.5);
  border-radius: 20px;
  box-shadow: 5px 5px 5px rgb(220, 220, 220);
`;

const ProfileAvatar = styled(Avatar)`
  width: 70px;
  height: 70px;
  background-color: #1976d2;
`;

const IconContainer = styled("div")`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const ProfileDetails = ({ profile }) => {
  const {
    name,
    email,
    telephone,
    address,
    photo,
    experienceOne,
    experienceOneDate,
    experienceTwo,
    experienceTwoDate,
    skills,
  } = profile;
  const router = useRouter();
  const [animationTrigger, setAnimationTrigger] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationTrigger((prevTrigger) => prevTrigger + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <FormContainer style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <Form noValidate>
        <Typography variant="h4" textAlign="center" color="primary">
          <TypeAnimation
            sequence={["TOP CANDIDATE   ", 2000]}
            speed={30}
            key={animationTrigger}
          />
        </Typography>
        <Typography
          variant="body2"
          textAlign="center"
          color="textSecondary"
          m={2}
        >
          CANDIDATE PROFILE
        </Typography>
        <IconContainer>
          <ProfileAvatar src={photo} alt={name} />
        </IconContainer>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              type="text"
              value={name}
              disabled
              variant="standard"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              value={email}
              disabled
              variant="standard"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Telephone"
              type="tel"
              value={telephone}
              disabled
              variant="standard"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              type="text"
              value={address}
              disabled
              variant="standard"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Skills"
              type="text"
              value={skills}
              disabled
              variant="standard"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="experienceOne"
              type="text"
              value={experienceOne}
              disabled
              variant="standard"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="experienceOneDate"
              type="text"
              value={experienceOneDate}
              disabled
              variant="standard"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="experienceTwo"
              type="text"
              value={experienceTwo}
              disabled
              variant="standard"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="experienceTwoDate"
              type="text"
              value={experienceTwoDate}
              disabled
              variant="standard"
              fullWidth
              required
            />
          </Grid>
          <Grid
            item
            xs={12}
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/")}
              startIcon={<ReplyAllIcon />}
              style={{ borderRadius: "180px" }}
            >
              Back
            </Button>
            <Box ml={2}>
              <CustomModal
                title="SELECT THIS CANDIDATE"
                content="We will send a notification to our Candidate regarding your interest."
                textButton="Send"
              />
            </Box>
          </Grid>
        </Grid>
      </Form>
    </FormContainer>
  );
};

export default ProfileDetails;
