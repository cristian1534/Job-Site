import React from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { Typography, styled, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

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

  @media (max-width: 767px) {
    button {
      width: auto;
      height: 50px;
      padding: 1rem;
    }
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

const ProfileDetails = () => {
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
          <ProfileAvatar src="" alt="" />
        </IconContainer>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              type="text"
              disabled
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              disabled
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Telephone"
              type="tel"
              disabled
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              type="text"
              disabled
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/")}
              startIcon={<ReplyAllIcon />}
            >
              Go Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              component="label"
              endIcon={<DriveFolderUploadIcon />}
            >
              Upload Image
              <input type="file" style={{ display: "none" }} />
            </Button>
          </Grid>
        </Grid>
      </Form>
    </FormContainer>
  );
};

export default ProfileDetails;
