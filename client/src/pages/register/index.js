import React from "react";
import { Grid, TextField, Button, Stack, Typography, Container } from "@mui/material";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";
import Link from "next/link";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import WorkIcon from "@mui/icons-material/Work";

// Styles...
const FormContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled("form")`
  padding: 20px;
  border: 1px solid rgba(150, 150, 150, 0.5);
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgb(220, 220, 220);
`;

const GreyTypography = styled(Typography)`
  color: #555555;
`;

const IconContainer = styled("div")`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const CustomWorkIcon = styled(WorkIcon)`
  width: 70px;
  height: 70px;
  color: #1976d2;
`;

const RedirectTypography = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    ::before {
      content: " ";
    }
  }
`;

// Logic...
const Register = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormContainer>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <GreyTypography variant="h5" m={2} align="center">
              Welcome to WORK WISE
            </GreyTypography>
            <IconContainer>
              <CustomWorkIcon />
            </IconContainer>
            <Stack spacing={2} width={1}>
              <TextField
                label="Name"
                type="text"
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <TextField
                label="Email"
                type="email"
                {...register("email", { required: "Email is required" })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Password"
                type="password"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                endIcon={<LoginOutlinedIcon />}
              >
                Register
              </Button>
              <RedirectTypography variant="span">
                already account?
              </RedirectTypography>
              <RedirectTypography variant="span">
                <Link href="/login" style={{ textDecoration: "none" }}>
                  LOGIN
                </Link>
              </RedirectTypography>
            </Stack>
          </Form>
        </Grid>
      </Grid>
    </FormContainer>
  );
};

export default Register;
