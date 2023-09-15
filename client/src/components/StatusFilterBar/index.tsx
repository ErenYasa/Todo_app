import * as Button from '../Button';

export function StatusFilterBar() {
  return (
    <div className="status-filter-bar">
      <div className="status-filter-bar__left-todos">1 todos left</div>
      <div className="status-filter-bar__status-btns">
        <Button.Soft type="button" className="active">
          all
        </Button.Soft>
        <Button.Soft type="button" className="">
          completed
        </Button.Soft>
        <Button.Soft type="button" className="">
          incomplete
        </Button.Soft>
      </div>
    </div>
  );
}
