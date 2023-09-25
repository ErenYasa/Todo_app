import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction, Slice } from '@reduxjs/toolkit';
import { IModalState } from '@store/interfaces/modal.slice.interface';

const initialState: IModalState = {
  modals: {
    createTodo: false,
    editTodo: false,
    deleteTodo: false,
  },
  modalData: {},
};

export const modalSlice: Slice<IModalState> = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, { payload }: PayloadAction<{ name: ModalNames; data: any }>) => {
      const { name, data } = payload;

      state.modals[name] = true;
      state.modalData[name] = data;
    },
    closeModal: (state, { payload }: PayloadAction<{ name: ModalNames }>) => {
      state.modals[payload.name] = false;
      state.modalData[payload.name] = {};
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach((key) => {
        state.modals[key] = false;
      });
      state.modalData = {};
    },
  },
});

export const { openModal, closeModal, closeAllModals } = modalSlice.actions;

export default modalSlice.reducer;
