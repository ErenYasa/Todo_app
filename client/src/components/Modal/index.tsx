import { ReactElement, cloneElement, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import * as Icon from '@/icons';
import { IBaseModalProps } from './interfaces/modals.interface';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { closeModal } from '@store/slices/modal.slice';

export function Modal(props: IBaseModalProps) {
  const Modal = useAppSelector((state) => state.Modal);
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (Modal.modals[props.name]) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [Modal]);

  const close = () => {
    dispatch(closeModal({ name: props.name }));
  };

  const modalClassNames = classNames('modal', `modal--${props.type || 'std'}`, props.className);

  return createPortal(
    <dialog className={modalClassNames} ref={modalRef}>
      <header className="modal__header">
        <div className="modal__header__actions">
          <button type="button" className="header__actions__close__btn" onClick={close}>
            <Icon.Delete width="16" height="16" />
          </button>
        </div>
      </header>
      <div className="modal__body">
        {cloneElement(props.children as ReactElement, { toggle: close, data: Modal.modalData })}
      </div>
      {/* <form method="dialog" className="modal-backdrop">
          <button onClick={props.toggle}>close</button>
        </form> */}
    </dialog>,
    document.body,
  );
}
