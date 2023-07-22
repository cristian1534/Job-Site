import React, { useState } from "react";
import { Button, Modal, Typography, Box, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
const CustomModal = ({ title, content, textButton }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen} endIcon={<SendIcon />}>
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
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            color="textSecondary"
          >
            {title}
          </Typography>
          <Typography variant="body1" gutterBottom color="textSecondary" m={3}>
            {content}
          </Typography>
          <TextField
            type="text"
            label="Write a message..."
            style={{ marginBottom: "1rem" }}
          />

          <Button
            variant="contained"
            onClick={handleClose}
            endIcon={<ForwardToInboxIcon />}
          >
            {textButton}
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
