import React, { useState, useContext } from "react";
import { Button, Modal, Typography, Box, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import { useRouter } from "next/router";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import sendEmail from "../Emailer/Emailer";
import { userContext } from "../user/User";

const CustomModal = ({ title, content, textButton, name, email }) => {
  const [open, setOpen] = useState(false);
  const [offer, setOffer] = useState("");
  const { currentUser } = useContext(userContext);

  const router = useRouter();
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    let toName = name; //pedro
    let fromName = currentUser.displayName;
    let contactEmail = currentUser.email;

    sendEmail(toName, fromName, email, offer, contactEmail)
      .then(() => {
        setOffer("");
        notify(
          "We have notified our Candidate regarding your interest",
          "success"
        );
        setTimeout(() => {
          router.push("/");
        }, 3000);
      })
      .catch(() => {
        setOffer("");
        notify("Could not send your concern at this time", "error");
        setTimeout(() => {
          router.push("/");
        }, 3000);
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
        endIcon={<SendIcon />}
        style={{ borderRadius: "180px" }}
      >
        Hire
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: "90%",
            maxWidth: 400,
            maxHeight: "90%",
            overflow: "auto",
            borderRadius: "20px",
          }}
        >
          <Typography variant="h5" component="h2" gutterBottom color="primary">
            {title}
          </Typography>
          <Typography variant="body1" gutterBottom color="textSecondary" m={3}>
            {content}
          </Typography>
          <TextField
            type="text"
            variant="standard"
            label="Write a message..."
            style={{ marginBottom: "2rem" }}
            onChange={(e) => setOffer(e.target.value)}
          />

          <Button
            variant="contained"
            onClick={handleClose}
            endIcon={<ForwardToInboxIcon />}
            style={{ borderRadius: "180px" }}
          >
            {textButton}
          </Button>
        </Box>
      </Modal>
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
    </div>
  );
};

export default CustomModal;
