import { Alert, CircularProgress, List } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { createNode, deleteNode, getTree, ITreeNode, renameNode } from "../services/tree-viewer-api";
import CreateModal from "./CreateModal";
import EditModal from "./EditModal";
import TreeNode from "./TreeNode";
import DeleteModal from "./DeleteModal";

export function TreeViewer() {
  const [tree, setTree] = useState<ITreeNode | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const [selectedNode, setSelectedNode] = useState<{ id: string; name: string } | null>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const getTreeData = useCallback(
    async () => {
      try {
        setError(null);
        setIsLoading(true);
        const treeData = await getTree() as ITreeNode;

        setTree(treeData);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }, [])

  useEffect(() => {
    getTreeData();
  }, [getTreeData]);

  const actionCreator = useCallback((callback: Function) => {
    return async function (...args: any[]) {
      try {
        await callback(...args);
        await getTreeData();
      } catch (error: any) {
        setError(error);
      }
    }
  }, [getTreeData]);

  const handleOnNodeClick = useCallback((id: string, name: string) => {setSelectedNode({ id, name })}, [])
  const createModalToggle = useCallback(() => setIsCreateModalOpen((prev) => !prev), []);
  const editModalToggle = useCallback(() => setIsEditModalOpen((prev) => !prev), []);
  const deleteModalToggle = useCallback(() => setIsDeleteModalOpen((prev) => !prev), []);

  const renderTree = useCallback((treeNode: ITreeNode) => {
    return <TreeNode key={treeNode.id}
      name={treeNode.name}
      isSelected={selectedNode?.id === treeNode.id}
      onNodeClick={handleOnNodeClick.bind(null, treeNode.id, treeNode.name)}
      onAddClick={createModalToggle}
      onRenameClick={editModalToggle}
      onDeleteClick={deleteModalToggle}
    >
      {treeNode?.children &&
        <>{treeNode?.children.map(child => renderTree(child))}</>
      }
    </TreeNode>
  }, [createModalToggle, deleteModalToggle, editModalToggle, handleOnNodeClick, selectedNode?.id])

  return (
    <section className="treeviewer">
      {isLoading && <CircularProgress />}
      {error && <Alert severity="error">{error.message}</Alert>}
      {tree &&
        <List key="tree">{renderTree(tree)}</List>
      }
      {selectedNode &&
        <>
          <CreateModal open={isCreateModalOpen}
            onAddAction={actionCreator(createNode.bind(null, selectedNode.id))}
            onClose={createModalToggle}
          />
          <EditModal open={isEditModalOpen}
            name={selectedNode.name}
            onEditAction={actionCreator(renameNode.bind(null, selectedNode.id))}
            onClose={editModalToggle}
          />
          <DeleteModal open={isDeleteModalOpen}
            onDeleteAction={actionCreator(deleteNode.bind(null, selectedNode.id))}
            onClose={deleteModalToggle}
          />
        </>
      }
    </section>
  );
}
