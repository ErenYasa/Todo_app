import { ReactElement, cloneElement, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import * as Icon from '@/icons';
import { BaseModalProps } from './defs';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { closeModal } from '@store/slices/modal.slice';

export function Modal({ name, children, className, title, type, kind, size }: BaseModalProps) {
  /* STATES & VARIABLES */
  const [isClose, setClose] = useState(false);
  /*  */

  /* HOOKS */
  const Modal = useAppSelector((state) => state.Modal);
  const dispatch = useAppDispatch();
  /*  */

  /* REFS */
  const modalRef = useRef<HTMLDialogElement>(null);
  /*  */

  /* EFFECTS & EVENTS */
  useEffect(() => {
    function handleEscPress(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        dispatch(closeModal({ name }));
      }
    }

    if (Modal.modals[name]) {
      modalRef.current?.showModal();
      
      document.addEventListener('keydown', handleEscPress);

      return () => {
        document.removeEventListener('keydown', handleEscPress);
      };
    } else {
      modalRef.current?.close();
      setClose(true);
    }
  }, [Modal]);

  const close = () => {
    setClose(true);
    dispatch(closeModal({ name }));
  };
  /*  */

  /* MISC */
  const typeHandler = type ? `modal__box--${type}` : '';
  const kindHandler = kind ? `modal__box--${kind}` : '';
  const sizeHandler = size ? `modal__box--${size}` : '';

  const modalClasses = classNames('modal', className);
  const modalBoxClasses = classNames('modal__box', typeHandler, kindHandler, sizeHandler, {
    'modal__box--close': isClose,
  });
  /*  */

  return createPortal(
    <dialog className={modalClasses} ref={modalRef}>
      <div className={modalBoxClasses}>
        <header className="modal__header">
          {title && <p className="modal__header__title">{title}</p>}
          <div className="modal__header__actions">
            <button type="button" className="header__actions__close__btn" onClick={close}>
              <Icon.Delete width="16" height="16" className="close__btn__icon" />
            </button>
          </div>
        </header>
        <div className="modal__body">
          {cloneElement(children as ReactElement, { toggle: close, data: Modal.modalData })}
        </div>
      </div>
      <form method="dialog" className="modal__backdrop">
        <button onClick={close}></button>
      </form>
    </dialog>,
    document.body,
  );
}
