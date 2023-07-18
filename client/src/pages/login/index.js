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
import EngineeringIcon from "@mui/icons-material/Engineering";
import { TypeAnimation } from "react-type-animation";
import { useSelector, useDispatch } from "react-redux";
import { SET_LOGIN } from "@/redux/reducers/login";

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

const CustomEngineeringIcon = styled(EngineeringIcon)`
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
const Login = () => {
  const { email, password } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    dispatch(SET_LOGIN(data));
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
              Let's find a Job!
            </GreyTypography>
            <IconContainer>
              <CustomEngineeringIcon />
            </IconContainer>
            <Stack spacing={2} width={1}>
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
                Login
              </Button>
              <RedirectTypography variant="span">
                Don't have an account?
                <Link href="/register" underline="none">
                  Register
                </Link>
              </RedirectTypography>
            </Stack>
          </Form>
        </Grid>
      </Grid>
    </FormContainer>
  );
};

export default Login;
