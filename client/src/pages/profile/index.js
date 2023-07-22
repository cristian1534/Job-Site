import React from "react";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import { Typography, styled, Avatar } from "@mui/material";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { useForm } from "react-hook-form";
import { Select, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";

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
    photo: "",
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const { messages } = useSelector((state) => state.contact)

  const onSubmit = (data) => {
    const photoFile = data.photo;
  };

  return (
    <FormContainer style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      {
        messages.map(x => (
          <p key={x}>{x.name}</p>
        ))
      }
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
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
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email?.message}
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
             <InputLabel id="select-area-label">Select Area</InputLabel>
            <Select
            id="select-area-label"
              label="Category"
              value={form.category}
              {...register("category", { required: "Category is required" })}
              error={!!errors.category}
              helperText={errors.category?.message}
              variant="outlined"
              fullWidth
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
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              component="label"
              endIcon={<DriveFolderUploadIcon />}
            >
              Photo
              <input type="file" name="photo" style={{ display: "none" }} />
            </Button>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="primary"
              onClick={() => router.push("/")}
              startIcon={<ReplyAllIcon />}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              endIcon={<LoginOutlinedIcon />}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Form>
    </FormContainer>
  );
};

export default ProfileDetails;
