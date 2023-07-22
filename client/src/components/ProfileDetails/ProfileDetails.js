import React from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { Typography, styled, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import CustomModal from "../modal/Modal";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';


// Styles...
const FormContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  @media (min-width: 768px) {
    width: calc(50% - 5rem);
    margin: 0 auto;
  }
`;

const Form = styled("form")`
  padding: 20px;
  border: 1px solid rgba(150, 150, 150, 0.5);
  border-radius: 5px;
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
  const { name, email, telephone, address, profileImage } = profile;
  const router = useRouter();

  return (
    <FormContainer>
      <Form noValidate>
        <Typography variant="h4" textAlign="center" color="textSecondary">
          WORK WISE
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
          <ProfileAvatar src={profileImage} alt={name} />
        </IconContainer>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              type="text"
              value={name}
              disabled
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
              fullWidth 
              required
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/")}
              startIcon={<ReplyAllIcon/>}
            >
              Back 
            </Button>
            <CustomModal
              title="SELECT THIS CANDIDATE"
              content="We will send a notification to our Candidate regarding your interest."
              textButton="Send"
            />
          </Grid>
        </Grid> 
      </Form>
    </FormContainer>
  );
};

export default ProfileDetails;
