import React, { useEffect, useState, useContext } from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { Typography, styled, Avatar, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import CustomModal from "../modal/Modal";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import { TypeAnimation } from "react-type-animation";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { userContext } from "../user/User";
import { useDispatch } from "react-redux";
import { deleteProfileById } from "@/redux/reducers/profileById";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const { currentUser } = useContext(userContext);
  const dispatch = useDispatch();
  const { id } = router.query;
  const notify = (message, type) => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        toast(message);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationTrigger((prevTrigger) => prevTrigger + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleDeleteProfile = async (id) => {
    try {
      await dispatch(deleteProfileById(id));
      notify("Profile has been deleted", "success");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err) {
      notify("Profile could not be deleted", "error");
    }
  };

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
              label="Last Job Experience"
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
              label="Last Job Experience Date"
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
              label="Job Experience"
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
              label="Job Experience Date"
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
          {currentUser && currentUser.email === email && (
            <Grid
              item
              xs={12}
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                style={{ borderRadius: "180px" }}
                variant="outlined"
                color="success"
              >
                <ModeEditIcon style={{ color: "green" }} />
              </Button>
              <Box ml={2}>
                <Button
                  style={{ borderRadius: "180px" }}
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteProfile(id)}
                >
                  <DeleteIcon style={{ color: "red" }} />
                </Button>
              </Box>
            </Grid>
          )}
          <ToastContainer
            position="top-center"
            autoClose={3000}
            pauseOnHover={false}
            transition={Slide}
            hideProgressBar={false}
            closeOnClick={true}
            limit={5}
            theme="light"
          />
        </Grid>
      </Form>
    </FormContainer>
  );
};

export default ProfileDetails;
