import { useAppSelector } from '@store/hooks';
import { Header } from '@components/Header';
import { Modal } from '@components/Modal';
import ConfirmModal from '@components/Modal/Modals/Confirm.modal';
import { EditModal } from '@components/Modal/Modals/Edit.modal';
import { ModalNames } from '@/types/global';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  customClass?: string;
};

export function PanelLayout({ children }: Props) {
  const modals = useAppSelector((state) => state.Modal.modals);

  return (
    <>
      <div className="root-container">
        <Header />
        {children}
      </div>
      {modals[ModalNames.CONFIRM] && (
        <Modal type="confirm" name="confirm">
          <ConfirmModal />
        </Modal>
      )}
      {modals[ModalNames.EDIT_TODO] && (
        <Modal className="modal--edit-todo" name="editTodo">
          <EditModal />
        </Modal>
      )}
      {modals[ModalNames.CREATE_TODO] && (
        <Modal className="modal--edit-todo" name="editTodo">
          <EditModal />
        </Modal>
      )}
    </>
  );
}
