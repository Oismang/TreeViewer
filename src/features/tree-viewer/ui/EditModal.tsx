import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

function EditModal({ open, name, onEditAction, onClose }: {
  open: boolean;
  name: string;
  onEditAction: (newName: string) => void;
  onClose: () => void;
}) {

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;

    onEditAction(name);
    onClose();
  }

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="xs"
      onClose={onClose}
      PaperProps={{
        component: "form",
        onSubmit,
      }}
    >
      <DialogTitle id="alert-dialog-title">
        Edit node
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          required
          id="name"
          margin="dense"
          name="name"
          label="node name"
          variant="outlined"
          defaultValue={name}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>Close</Button>
        <Button variant="contained" type="submit">Edit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditModal;
