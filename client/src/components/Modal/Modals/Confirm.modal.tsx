import { useDeleteTodoMutation } from '@/services/todo';
import * as Button from '../../Button';

type Props = {
  toggle: () => void;
  data: any;
};

export default function ConfirmModal(props: Props) {
  /* Queries */
  const [deleteTodo, { isLoading }] = useDeleteTodoMutation({});
  /*  */

  /* Events & Functions */

  const handlePositiveClick = () => {
    deleteTodo(props.data.confirm).then(() => {
      props.toggle();
    });
  };

  const handleNegativeClick = () => {
    props.toggle();
  };
  /*  */

  return (
    <>
      <p className="modal--confirm__title">Are you sure?</p>
      <div className="modal--confirm__btn__group">
        <Button.DefaultOutline onClick={handleNegativeClick}>No</Button.DefaultOutline>
        <Button.Default onClick={handlePositiveClick}>Yes</Button.Default>
      </div>
    </>
  );
}
