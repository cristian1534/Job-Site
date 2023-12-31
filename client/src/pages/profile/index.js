import React, { useRef, useState, useContext, useEffect } from "react";
import { userContext } from "@/components/user/User";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { Typography, styled, Avatar, Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { useForm } from "react-hook-form";
import { Select, MenuItem } from "@mui/material";
import { db, firebaseApp } from "@/database/config";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  background-color: #e65100;
`;

const IconContainer = styled("div")`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const ProfileDetails = () => {
  const [category, setCategory] = useState("Options");
  const { currentUser } = useContext(userContext);
  const router = useRouter();
  const form = useForm({
    name: "",
    email: "",
    telephone: "",
    address: "",
    skills: "",
    category: "",
    experienceOne: "",
    experienceOneDate: null,
    experienceTwo: "",
    experienceTwoDate: null,
    range: "",
    photo: "",
  });

  const [animationTrigger, setAnimationTrigger] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationTrigger((prevTrigger) => prevTrigger + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formRef = useRef();

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

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = async (data) => {
    if (isSubmit) return;
    setIsSubmit(true);
    try {
      const file = data.photo[0];
      const storageRef = firebaseApp.storage().ref();
      const fileRef = storageRef.child(`profile_photos/${file.name}`);
      const uploadTaskSnapshot = await fileRef.put(file);
      const url = await uploadTaskSnapshot.ref.getDownloadURL();

      if (currentUser) {
        await currentUser.updateProfile({
          photoURL: url,
        });
      }
      await db.collection("profiles").add({
        name: data.name,
        email: currentUser.email,
        telephone: data.telephone,
        address: data.address,
        skills: data.skills,
        category: category,
        experienceOne: data.experienceOne,
        experienceOneDate: data.experienceOneDate,
        experienceTwo: data.experienceTwo,
        experienceTwoDate: data.experienceTwoDate,
        range: data.range,
        photo: url,
      });

      formRef.current.reset();
      notify("Profile created successfully", "success");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err) {
      console.log(err.message);
      notify("Could not create Profile", "error");
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <FormContainer style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <Form noValidate onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <Typography variant="h4" textAlign="center" color="primary">
          <TypeAnimation
            sequence={["WORK WISE", 2000]}
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
          <ProfileAvatar src="" alt="" />
        </IconContainer>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              type="text"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              value={currentUser.email}
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Telephone"
              type="tel"
              {...register("telephone", { required: "Telephone is required" })}
              error={!!errors.telephone}
              helperText={errors.telephone?.message}
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              type="text"
              {...register("address", { required: "Address is required" })}
              error={!!errors.address}
              helperText={errors.address?.message}
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Skills"
              type="text"
              {...register("skills", { required: "Skills are required" })}
              error={!!errors.skills}
              helperText={errors.skills?.message}
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="select-area-label">Select Area</InputLabel>
            <Select
              id="select-area-label"
              value={category}
              {...register("category", { required: "Category is required" })}
              error={!!errors.category}
              helperText={errors.category?.message}
              variant="standard"
              fullWidth
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="Technology">Technology</MenuItem>
              <MenuItem value="Administration">Administration</MenuItem>
              <MenuItem value="Education">Education</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Job Experience"
              type="text"
              {...register("experienceOne", {
                required: "Experience is required",
              })}
              error={!!errors.experienceOne}
              helperText={errors.experienceOne?.message}
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last Job Experience Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("experienceOneDate", {
                required: "Experience date is required",
              })}
              error={!!errors.experienceOneDate}
              helperText={errors.experienceOneDate?.message}
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Job Experience"
              type="text"
              {...register("experienceTwo", {
                required: "Experience is required",
              })}
              error={!!errors.experienceTwo}
              helperText={errors.experienceTwo?.message}
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Job Experience Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("experienceTwoDate", {
                required: "Experience date is required",
              })}
              error={!!errors.experienceTwoDate}
              helperText={errors.experienceTwoDate?.message}
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              label="Range u$d per hour"
              {...register("range", { required: "Range is required" })}
              error={!!errors.range}
              helperText={errors.range?.message}
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              component="label"
              endIcon={<DriveFolderUploadIcon />}
              style={{ borderRadius: "180px" }}
            >
              Photo
              <input
                type="file"
                name="photo"
                style={{ display: "none" }}
                accept="image/*"
                {...register("photo")}
              />
            </Button>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={() => router.push("/")}
                startIcon={<ReplyAllIcon />}
                style={{ borderRadius: "180px" }}
              >
                Back
              </Button>
            </Box>
            <Box flexGrow={1} />
            <Box>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                endIcon={<LoginOutlinedIcon />}
                style={{ borderRadius: "180px" }}
                disabled={isSubmit}
              >
                Send
              </Button>
            </Box>
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
        </Grid>
      </Form>
    </FormContainer>
  );
};

export default ProfileDetails;
