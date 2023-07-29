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
import { TypeAnimation } from "react-type-animation";
import { db } from "../../database/config";
import { useFirebaseApp } from "reactfire";
import "firebase/auth";
import { sendEmailVerification } from "firebase/auth";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../assets/wwlogo.png";
import Image from "next/image";

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


const RedirectTypography = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    display: inline-block;
    margin-left: 5px;
    text-decoration: none;
    color: #e65100;
    font-weight: bold;
    transition: color 0.3s ease;
    &:hover {
      color: #ff9100;
    }
  }
`;

// Logic...
const Register = () => {
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
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
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

  const onSubmit = async (data) => {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);

      await sendEmailVerification(userCredential.user);

      const user = userCredential.user;

      await user.updateProfile({
        displayName: data.name,
      });

      await db.collection("Subscription").add({
        uid: user.uid,
        name: data.name,
        email: data.email,
      });

      formRef.current.reset();
      notify("Please verify your email and activate your account.", "success");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      notify("Could not send a verification email at this time");
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
              style={{ color: "#e65100" }}
            >
              <TypeAnimation
                sequence={["Welcome!", 2000]}
                speed={30}
                key={animationTrigger}
              />
            </GreyTypography>
            <IconContainer>
              <Image src={Logo} alt="logo" style={{ width: "10rem", height: "auto"}}/>
            </IconContainer>
            <Stack spacing={2} width={1}>
              <TextField
                variant="standard"
                label="Name"
                type="text"
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
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
                variant="standard"
                label="Password"
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
                Register
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
