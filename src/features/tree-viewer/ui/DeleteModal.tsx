import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

function DeleteModal({ open, onDeleteAction, onClose }: {
  open: boolean;
  onDeleteAction: () => void;
  onClose: () => void;
}) {

  const onDeleteClick = () => {
    onDeleteAction();
    onClose();
  }

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="xs"
      onClose={onClose}
    >
      <DialogTitle id="alert-dialog-title">
        Rename node
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this node?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>Close</Button>
        <Button onClick={onDeleteClick} variant="contained" color="error">Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteModal;
