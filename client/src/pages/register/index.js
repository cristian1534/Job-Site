import React from "react";
import {
  Grid,
  TextField,
  Button,
  Stack,
  Typography,
  Container,
  Link,
} from "@mui/material";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import WorkIcon from "@mui/icons-material/Work";
import { SET_REGISTER } from "@/redux/reducers/auth";
import { useSelector, useDispatch } from "react-redux";

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
    display: inline-block;
    margin-left: 5px;
    text-decoration: none;
    color: #1976d2;
    font-weight: bold;
    transition: color 0.3s ease;
    &:hover {
      color: #1565c0;
    }
  }
`;

// Logic...
const Register = () => {
  const { name, email, password } = useSelector((state) => state.auth.register);
  const dispatch = useDispatch();

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
    dispatch(SET_REGISTER(data));
    console.log(name, email, password)
  };

  return (
    <FormContainer>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            <GreyTypography
              variant="h5"
              m={2}
              align="center"
              style={{ color: "#1976d2" }}
            >
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
                Already have an account?
                <Link href="/login" underline="none">
                  Login
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
