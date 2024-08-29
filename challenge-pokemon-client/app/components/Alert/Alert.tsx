import Button from "@mui/material/Button";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  open: boolean;
  message: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Alert({ open, message, setOpen }: Props) {
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
}
