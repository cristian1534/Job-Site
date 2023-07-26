import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
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
import { useFirebaseApp } from "reactfire";
import "firebase/auth";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TypeAnimation } from "react-type-animation";

// Styles...
const FormContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Form = styled("form")`
  padding: 30px;
  border: 1px solid rgba(150, 150, 150, 0.5);
  border-radius: 20px;
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
  const firebase = useFirebaseApp();
  const formRef = useRef(null);
  const router = useRouter();

  const [animationTrigger, setAnimationTrigger] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationTrigger((prevTrigger) => prevTrigger + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password)
        .then((userCredential) => {
          const user = userCredential.user;
          if (user.emailVerified) {
            notify("You've logged in successfully", "success");
            setTimeout(() => router.push("/"), 3000);
          } else {
            notify(
              "Please verify your email. Then try to Log in again",
              "error"
            );
          }
        })
        .catch((err) => {
          notify("Email or Password Wrong", "error");
        });
      formRef.current.reset();
    } catch (err) {
      return err.message;
    }
  };

  return (
    <FormContainer>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Form noValidate onSubmit={handleSubmit(onSubmit)} ref={formRef}>
            <GreyTypography
              variant="h5"
              m={2}
              align="center"
              style={{ color: "#1976d2" }}
            >
              <TypeAnimation
                sequence={["TIME TO WORK!", 2000]}
                speed={30}
                key={animationTrigger}
              />
            </GreyTypography>
            <IconContainer>
              <CustomEngineeringIcon />
            </IconContainer>
            <Stack spacing={2} width={1}>
              <TextField
                variant="standard"
                label="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Give a valid email",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Password"
                variant="standard"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                endIcon={<LoginOutlinedIcon />}
                style={{ borderRadius: "180px" }}
              >
                Login
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
              <RedirectTypography variant="span">
                Don't have an account?
                <Link href="/register" underline="none">
                  Register
                </Link>
              </RedirectTypography>
              <RedirectTypography variant="span">
                <Link href="/recover" underline="none">
                  Forgot Password
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
