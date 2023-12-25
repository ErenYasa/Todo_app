import { Fragment, ReactNode } from 'react';
import { useAppSelector } from '@store/hooks';
import { useMediaQuery } from 'usehooks-ts';
import { Header } from '@components/Header';
import { Modal } from '@components/Modal';
import { ConfirmModal } from '@components/Modal/Modals/Confirm.modal';
import { EditModal } from '@components/Modal/Modals/Edit.modal';
import { MobileMenu } from '@/components/MobileMenu';
import { MediaBreakpoints, ModalNames } from '@/types/global';

type Props = {
  children: ReactNode;
  customClass?: string;
};

export function PanelLayout({ children }: Props) {
  /* Hooks */
  const modals = useAppSelector((state) => state.Modal.modals);
  const isMobile = useMediaQuery(`(max-width: ${MediaBreakpoints.SM})`);
  /*  */

  return (
    <Fragment>
      <Header fullWidth />
      <div className="root-container">{children}</div>
      {isMobile && <MobileMenu />}

      {/**
       * MODALS
       */}
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
      {/*  */}
    </Fragment>
  );
}
