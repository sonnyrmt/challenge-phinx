import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Modal from "@mui/material/Modal";
import { modalStyle } from "@/app/helpers/constants";
import { useState } from "react";
import Image from "next/image";

export const TypesChart = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        color="info"
        sx={{ mt: 1 }}
        variant="outlined"
        onClick={handleOpen}
      >
        Type Damage
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Image
            width={420}
            height={450}
            src={"/typechart.png"}
            alt="typechart"
          />
        </Box>
      </Modal>
    </div>
  );
};

export default TypesChart;
