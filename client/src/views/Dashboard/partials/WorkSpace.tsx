import { IUser, IWorkspace } from '@/types/global';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Workspace() {
  /* EFFECTS & VIARBLES */
  const [workspace, setWorkspace] = useState<IWorkspace | false>(false);
  /*  */

  /* HOOKS */
  const { id } = useParams();
  /*  */

  /* EFFECTS & FUNCTIONS */
  // useEffect(() => {
  //   if (userInfo) {
  //     setWorkspace(userInfo.workspaces.find((space) => space.id === id));
  //   }
  // }, [userInfo, id]);

  /*  */

  return <div>{workspace && workspace.name}</div>;
}
