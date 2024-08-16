const treeId = process.env.REACT_APP_TREE_ID as string;
const baseUrl = process.env.REACT_APP_BASE_URL as string;

export interface ITreeNode {
  id: string;
  name: string;
  children: ITreeNode[];
}

export const getTree = async (): Promise<ITreeNode> => {
  return fetchWrapper<ITreeNode>("/api.user.tree.get?", { treeName: treeId });
};

export const createNode = async (parentId: string, name: string) => {
  return fetchWrapper<void>(
    "/api.user.tree.node.create?",
    {
      treeName: treeId,
      parentNodeId: parentId,
      nodeName: name,
    },
    { method: "POST" }
  );
};

export const renameNode = async (id: string, newName: string) => {
  return fetchWrapper<void>(
    "/api.user.tree.node.rename?",
    {
      treeName: treeId,
      nodeId: id,
      newNodeName: newName,
    },
    { method: "POST" }
  );
};

export const deleteNode = async (nodeId: string) => {
  return fetchWrapper<void>(
    "/api.user.tree.node.delete?",
    {
      treeName: treeId,
      nodeId: nodeId,
    },
    { method: "POST" }
  );
};

async function fetchWrapper<T>(
  url: string,
  queryParams: any,
  options?: RequestInit
): Promise<T> {
  try {
    const params = queryParams
      ? new URLSearchParams(queryParams).toString()
      : "";

    const response = await fetch(baseUrl + url + params, options);
    const isContentTypeJson = response.headers
      .get("content-type")
      ?.includes("application/json");

    const responseData = isContentTypeJson
      ? await response.json()
      : { status: response.status, statusText: response.statusText };

    if (!response.ok) {
      throw new Error(
        "Fetch error, message: " + responseData?.data?.message ||
          responseData?.statusText
      );
    }

    return responseData as T;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

