import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  Divider,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const PopupModal = ({
  open,
  handleClose,
  children,
  title,
  fullWidth,
  maxWidth,
  actions,
  coustomClass,
}) => {
  return (
    <Dialog
      className={coustomClass}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle
        sx={{
          my: -1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {title}{" "}
        <CloseIcon sx={{ cursor: "pointer" }}   onClick={handleClose} color="black" size={34} />
      </DialogTitle>
      <Divider />
      <DialogContent>{children}</DialogContent>

      <DialogActions sx={{ paddingBottom: 2 }}>{actions}</DialogActions>
    </Dialog>
  );
};

export default PopupModal;
