import { Grid, Container, TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useForm } from "react-hook-form";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
import { SET_MESSAGE } from "@/redux/reducers/contact";
import { useSelector, useDispatch } from "react-redux";

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
  const { name, email, message } = useSelector((state) => state.contact);
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data) => {
   dispatch(SET_MESSAGE(data))
   console.log(name, email, message)
   
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
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                    {...register("email", { required: "Email is required" })}
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
