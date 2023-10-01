import checkIcon from '@assets/images/check.svg';
import errorIcon from '@assets/images/error.svg';
import infoIcon from '@assets/images/info.svg';
import warningIcon from '@assets/images/warning.svg';
import { createSlice } from '@reduxjs/toolkit';
import { cloneDeep, uniqBy } from 'lodash';

const initialState = [];
let list = [];
const toastIcons = [
  { success: checkIcon, color: '#2ecc71' },
  { error: errorIcon, color: '#e74c3c' },
  { warning: warningIcon, color: '#f1c40f' },
  { info: infoIcon, color: '#3498db' }
];

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const { message, type } = action.payload;
      const toast = toastIcons.find((toast) => toast[type]);
      const toastItem = {
        id: state.length,
        description: message,
        type,
        icon: toast[type],
        backgroundColor: toast.color
      };
      list = cloneDeep(list);
      list.unshift(toastItem);
      list = [...uniqBy(list, 'description')];
      return list;
    },
    clearNotification: () => {
      list = [];
      return [];
    }
  }
});

export const { addNotification, clearNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
