import {
  Box,
  DialogTitle,
  IconButton,
  Typography,
  Dialog as MUIDialog
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import PropTypes from "prop-types";
// import {
//   StyledDialog,
//   StyledDialogTitle
// } from "../../../styles/components/Dialog";

const Dialog = ({ title, dialogSize, selfClose, onClose, open, children }) => {
  const handleClose = () => {
    onClose(false);
  };

  return (
    <MUIDialog
      open={open}
      onClose={handleClose}
      maxWidth={dialogSize}
      fullWidth
      disableScrollLock={true}
    >
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4">{title}</Typography>
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </DialogTitle>
      {selfClose ? (
        <Box sx={{ p: 3 }} onClick={handleClose}>
          {children}
        </Box>
      ) : (
        <Box sx={{ p: 3 }}>{children}</Box>
      )}
    </MUIDialog>
  );
};

Dialog.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  dialogSize: PropTypes.string,
  selfClose: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

Dialog.defaultProps = {
  title: "",
  dialogSize: "md",
  selfClose: false
};

export default Dialog;
