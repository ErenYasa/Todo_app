import { useAppSelector } from '@store/hooks';
import { Header } from '@components/Header';
import Main from '@components/MainContainer';
import { Modal } from '@components/Modal';
import ConfirmModal from '@components/Modal/Modals/Confirm.modal';
import { EditModal } from '@components/Modal/Modals/Edit.modal';

export function Root() {
  const modals = useAppSelector((state) => state.Modal.modals);
  
  return (
    <>
      <div className="root-container">
        <Header />
        <Main />
      </div>
      {modals['confirm'] && (
        <Modal type="confirm" name="confirm">
          <ConfirmModal />
        </Modal>
      )}
      {modals['editTodo'] && (
        <Modal className="modal--edit-todo" name="editTodo">
          <EditModal />
        </Modal>
      )}
    </>
  );
}
