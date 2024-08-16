import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

function CreateModal({ open, onAddAction, onClose }: {
  open: boolean;
  onAddAction: (newName: string) => void;
  onClose: () => void;
}) {

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;

    onAddAction(name);
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
        Create node
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
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>Close</Button>
        <Button variant="contained" type="submit">Create</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateModal;
