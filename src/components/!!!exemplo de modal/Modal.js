import "./Modal.css";

import { useContext, useState } from "react";
import AuthContext from "../../store/contexts/AuthContext";

import { Button, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  minWidth: "350px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ModalExample = () => {
  const { user } = useContext(AuthContext);

  const [open, setOpen] = useState({
    services: false,
  });

  return (
    <div className="professional-component-container">
      <Typography color="#1976d2" align="center" variant="h4">
        CONFIGURAÇÕES
        <Divider style={{ marginBottom: "25px", borderColor: "#1976d2" }} />
      </Typography>
      <Button
        style={{ width: "50%", minWidth: "300px" }}
        variant="contained"
        onClick={() => setOpen({ ...open, services: true })}
      >
        Manage Services
      </Button>
      <Modal
        open={open.services}
        onClose={() => setOpen({ ...open, services: false })}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>MODAL</Box>
      </Modal>
    </div>
  );
};

export default ModalExample;
