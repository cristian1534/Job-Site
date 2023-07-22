import { Grid, Container, TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
import { db } from "@/database/config";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";

const FormContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: auto;
  border: 1px solid rgba(150, 150, 150, 0.5);
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgb(220, 220, 220);
`;

const IconContainer = styled("div")`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const CustomContactMailIcon = styled(ContactMailIcon)`
  width: 70px;
  height: 70px;
  color: #1976d2;
`;

const ContactForm = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const formRef = useRef(null);

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
      await db
        .collection("messages")
        .add({
          name: data.name,
          email: data.email,
          message: data.message,
        })
        .then((docRef) => {
          formRef.current.reset();
          notify(`We register your message as Id: ${docRef.id}`);
        });
    } catch (err) {
      return err.message;
    }
  };



  return (
    <motion.div
      variants={fadeIn("up", 0.3)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.7 }}
    >
      <FormContainer>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h5" color="primary" align="center">
              CONTACT US
            </Typography>
            <IconContainer>
              <CustomContactMailIcon />
            </IconContainer>
            <Typography
              variant="body1"
              color="textSecondary"
              align="center"
              m={3}
            >
              Our Team will be happy to keep in touch, mail your concern.
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate ref={formRef}>
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
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Give a valid email",
                      },
                    })}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    type="email"
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Message"
                    type="text"
                    {...register("message", {
                      required: "Message is required",
                    })}
                    error={!!errors.message}
                    helperText={errors.message?.message}
                    rows={4}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} textAlign="center">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    endIcon={<ForwardToInboxIcon />}
                  >
                    Send
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
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </FormContainer>
    </motion.div>
  );
};

export default ContactForm;
