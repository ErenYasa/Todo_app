import * as Button from '../../Button';

export default function ConfirmModal() {
  return (
    <>
      <p className='modal--confirm__title'>Are you sure?</p>
      <div className='modal--confirm__btn__group'>
        <Button.DefaultOutline>No</Button.DefaultOutline>
        <Button.Default>Yes</Button.Default>
      </div>
    </>
  );
}
