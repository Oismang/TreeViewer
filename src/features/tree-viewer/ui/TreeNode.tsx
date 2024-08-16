import { Collapse, IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { memo, useState } from "react";

const TreeNode = memo(({ name, isSelected, onNodeClick, onAddClick, onRenameClick, onDeleteClick, children }: {
  name: string;
  isSelected: boolean;
  onNodeClick: () => void;
  onAddClick: () => void;
  onRenameClick: () => void;
  onDeleteClick: () => void;
  children: JSX.Element;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onListItemClick = () => {
    setIsOpen(!isOpen);
    onNodeClick();
  }

  return (
    <>
      <ListItem sx={{ justifyItems: "flex-start" }}>
        <ListItemButton sx={{ flex: "none" }}
          selected={isSelected}
          onClick={onListItemClick}
        >
          {children.props.children.length > 0
            && (isOpen ? <ExpandLess /> : <ExpandMore />)
          }
          <ListItemText primary={name} />
        </ListItemButton>
        {isSelected &&
          <>
            <IconButton aria-label="add"
              onClick={onAddClick}>
              <AddCircleOutlineIcon />
            </IconButton>
            <IconButton aria-label="rename"
              onClick={onRenameClick}>
              <DriveFileRenameOutlineIcon />
            </IconButton>
            <IconButton aria-label="delete"
              onClick={onDeleteClick}>
              <DeleteForeverIcon />
            </IconButton>
          </>
        }
      </ListItem>
      {children.props.children.length > 0 &&
        <Collapse in={isOpen} sx={{ pl: 4 }}>
          <List>
            {children}
          </List>
        </Collapse>
      }
    </>
  );
})

export default TreeNode;
