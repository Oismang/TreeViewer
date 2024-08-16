import { Container, Typography } from '@mui/material';
import { TreeViewer } from './features/tree-viewer';

function App() {
  return (
    <Container component="main" sx={{ pt: 3 }}>
      <Typography variant="h3" component="h1" textAlign="center">Tree Viewer</Typography>
      <TreeViewer />
    </Container>
  );
}

export default App;
