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
import {
  deleteProfileById,
  updateProfileById,
} from "@/redux/reducers/profileById";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

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
  const router = useRouter();
  const [animationTrigger, setAnimationTrigger] = useState(0);
  const [user, setUser] = useState(profile);
  const [isEdit, setIsEdit] = useState(true);
  const { currentUser } = useContext(userContext);
  const dispatch = useDispatch();
  const { id } = router.query;
  const notify = (message, type) => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      default:
        toast(message);
    }
  };

  const form = useForm({
    defaultValues: {
      name: profile.name,
      email: profile.email,
      telephone: profile.telephone,
      address: profile.address,
      photo: profile.photo,
      experienceOne: profile.experienceOne,
      experienceOneDate: profile.experienceOneDate,
      experienceTwo: profile.experienceTwo,
      experienceTwoDate: profile.experienceTwoDate,
      skills: profile.skills,
    },
  });

  const { register, handleSubmit } = form;

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

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const onSubmit = async (data) => {
    try {
      const updatedProfile = { ...user, ...data };
      await dispatch(
        updateProfileById({ profileId: user.id, newData: updatedProfile })
      );
      setUser(updatedProfile);
      setIsEdit(!isEdit);
      notify("Profile has been updated", "success");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err) {
      setIsEdit(!isEdit);
      notify("Profile could not be updated", "error");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  };

  return (
    <FormContainer style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
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
          <ProfileAvatar src={user.photo} alt={name} />
        </IconContainer>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              type="text"
              {...register("name")}
              value={user.name}
              disabled={isEdit}
              variant="standard"
              fullWidth
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              type="email"
              {...register("email")}
              value={user.email}
              disabled={isEdit}
              variant="standard"
              fullWidth
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Telephone"
              name="telephone"
              type="tel"
              {...register("telephone")}
              value={user.telephone}
              disabled={isEdit}
              variant="standard"
              fullWidth
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              type="text"
              {...register("address")}
              value={user.address}
              disabled={isEdit}
              variant="standard"
              fullWidth
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Skills"
              name="skills"
              type="text"
              {...register("skills")}
              value={user.skills}
              disabled={isEdit}
              variant="standard"
              fullWidth
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Job Experience"
              name="experienceOne"
              type="text"
              {...register("experienceOne")}
              value={user.experienceOne}
              disabled={isEdit}
              variant="standard"
              fullWidth
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Job Experience Date"
              name="experienceOneDate"
              type="text"
              {...register("experienceOneDate")}
              value={user.experienceOneDate}
              disabled={isEdit}
              variant="standard"
              fullWidth
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Job Experience"
              name="experienceTwo"
              type="text"
              {...register("experienceTwo")}
              value={user.experienceTwo}
              disabled={isEdit}
              variant="standard"
              fullWidth
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Job Experience Date"
              name="experienceTwoDate"
              type="text"
              {...register("experienceTwoDate")}
              value={user.experienceTwoDate}
              disabled={isEdit}
              variant="standard"
              fullWidth
              required
              onChange={handleChange}
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
            {currentUser && currentUser.email !== user.email && (
              <Box ml={2}>
                <CustomModal
                  title="SELECT THIS CANDIDATE"
                  content="We will send a notification to our Candidate regarding your interest."
                  textButton="Send"
                />
              </Box>
            )}
            {currentUser && currentUser.email === user.email && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<ModeEditIcon />}
                style={{ borderRadius: "180px" }}
                type="submit"
                disabled={isEdit}
              >
                Update
              </Button>
            )}
          </Grid>
          {currentUser && currentUser.email === user.email && (
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
                onClick={handleEdit}
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
              </Box>
            </Grid>
          )}
        </Grid>
      </Form>
    </FormContainer>
  );
};

export default ProfileDetails;
