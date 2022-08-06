import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MessageModal = ({ open, setOpen, modalText }) => {
  const handleSuccessModalClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleSuccessModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ textAlign: "center" }}>
          <img
            src="https://ak.picdn.net/shutterstock/videos/1068883754/thumb/11.jpg?ip=x480"
            width="60%"
            style={{ marginLeft: "auto", marginRight: "auto" }}
          />
        </Box>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ textAlign: "center", my: 2 }}
        >
          {modalText}
        </Typography>
        <Box sx={{ textAlign: "center" }}>
          <Button onClick={handleSuccessModalClose} variant="contained">
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default MessageModal;
