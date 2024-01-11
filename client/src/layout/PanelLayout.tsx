import { Fragment, useState } from 'react';
import { useAppSelector } from '@store/hooks';
import { useMediaQuery } from 'usehooks-ts';
import { Header } from '@components/Header';
import { Modal } from '@components/Modal';
import { ConfirmModal } from '@/components/Modal/Modals/ConfirmModal';
import { EditModal } from '@/components/Modal/Modals/EditTodoModal';
import { MobileMenu } from '@/components/MobileMenu';
import { MediaBreakpoints, ModalNames } from '@/types/global';
import { MobileSidebar } from '@/components/MobileSidebar';
import { PanelLayoutProps } from './defs';
import CreateWorkspaceModal from '@/components/Modal/Modals/CreateWorkspaceModal';

export function PanelLayout({ children }: PanelLayoutProps) {
  /* STATES & VARIABLES */
  const [openMobileSidebar, setOpenMobileSidebar] = useState(false);
  /*  */

  /* Hooks */
  const modals = useAppSelector((state) => state.Modal.modals);
  const isMobile = useMediaQuery(`(max-width: ${MediaBreakpoints.SM})`);
  /*  */

  /* EFFECTS & EVENTS */
  const handleMobileSidebarClick = () => {
    setOpenMobileSidebar(!openMobileSidebar);
  };
  /*  */

  return (
    <Fragment>
      <Header fullWidth />
      <div className="dashboard-page">{children}</div>
      {isMobile && (
        <Fragment>
          <MobileMenu mobileSidebarToggle={handleMobileSidebarClick} />
          {openMobileSidebar && <MobileSidebar open={openMobileSidebar} onClose={handleMobileSidebarClick} />}
        </Fragment>
      )}

      {/**
       * MODALS
       */}
      {modals[ModalNames.CONFIRM] && (
        <Modal type="confirm" name="confirm" size="small">
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
      {modals[ModalNames.CREATE_WORKSPACE] && (
        <Modal className="modal--create-workspace" size="small" name="createWorkspace" title="Create Workspace">
          <CreateWorkspaceModal />
        </Modal>
      )}
      {/*  */}
    </Fragment>
  );
}
