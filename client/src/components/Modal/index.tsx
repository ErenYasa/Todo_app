import { ReactElement, cloneElement, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import * as Icon from '../Icons';
import classNames from 'classnames';
import { IBaseModalProps } from './interfaces/modals.interface';

export function Modal(props: IBaseModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (props.isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [props.isOpen]);

  const modalClassNames = classNames('modal', `modal--${props.type || 'std'}`, props.className);

  return props.isOpen ? (
    createPortal(
      <dialog id="my_modal_2" className={modalClassNames} ref={modalRef}>
        <header className="modal__header">
          <div className="modal__header__actions">
            <button type="button" className="header__actions__close__btn" onClick={props.toggle}>
              <Icon.Delete width="16" height="16" />
            </button>
          </div>
        </header>
        <div className="modal__body">{cloneElement(props.children as ReactElement, { toggle: props.toggle })}</div>
        {/* <form method="dialog" className="modal-backdrop">
          <button onClick={props.toggle}>close</button>
        </form> */}
      </dialog>,
      document.body,
    )
  ) : (
    <></>
  );
}
