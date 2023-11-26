import { IUser } from '@/types/global';
import { useReadLocalStorage } from 'usehooks-ts';

export default function Welcome() {
  /* STATES & VARIABLES */
  const userInfo = useReadLocalStorage(`${process.env.APP_NAME}_user`) as IUser;
  /*  */

  return (
    <h3>
      Welcome {userInfo.firstName} {userInfo.lastName}
    </h3>
  );
}
