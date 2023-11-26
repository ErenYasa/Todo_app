import { IUser, IWorkSpace } from '@/types/global';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useReadLocalStorage } from 'usehooks-ts';

export default function WorkSpace() {
  /* EFFECTS & VIARBLES */
  const [workSpace, setWorkSpace] = useState<IWorkSpace>();
  /*  */

  /* HOOKS */
  const { id } = useParams();
  const userInfo = useReadLocalStorage(`${process.env.APP_NAME}_user`) as IUser;
  /*  */

  /* EFFECTS & FUNCTIONS */
  useEffect(() => {
    if (userInfo) {
      setWorkSpace(userInfo.workSpaces.find((space) => space.id === id));
    }
  }, [userInfo, id]);

  /*  */

  return <div>{workSpace && workSpace.name}</div>;
}
