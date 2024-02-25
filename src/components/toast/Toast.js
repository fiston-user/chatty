import { cloneDeep } from 'lodash';
import PropTypes from 'prop-types';
import { useState, useCallback, useRef, useEffect } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { Utils } from '@services/utils/utils.service';
import { useDispatch } from 'react-redux';

import '@components/toast/Toast.scss';

const Toast = (props) => {
  const { toastList, position, autoDelete, autoDeleteTime = 2000 } = props;
  const [list, setList] = useState(toastList);
  const listData = useRef([]);
  const dispatch = useDispatch();

  const deleteToast = useCallback(() => {
    listData.current = cloneDeep(list);
    listData.current.splice(0, 1);
    setList([...listData.current]);
    if (!listData.current.length) {
      list.length = 0;
      Utils.dispatchClearNotification(dispatch);
    }
  }, [list, dispatch]);

  useEffect(() => {
    setList([...toastList]);
  }, [toastList]);

  useEffect(() => {
    const tick = () => {
      deleteToast();
    };
    if (autoDelete && toastList.length && list.length) {
      const interval = setInterval(tick, autoDeleteTime);
      return () => clearInterval(interval);
    }
  }, [autoDelete, autoDeleteTime, deleteToast, list.length, toastList.length]);

  return (
    <div className={`toast-notification-container ${position}`}>
      {list.map((toast, i) => (
        <div
          data-testid="toast-notification"
          key={i}
          className={`toast-notification toast ${position}`}
          style={{ backgroundColor: toast.backgroundColor }}
        >
          <button className="cancel-button" onClick={() => deleteToast()}>
            <IoCloseSharp />
          </button>
          <div className={`toast-notification-image ${toast.description.length <= 73 ? 'toast-icon' : ''}`}>
            <img src={toast.icon} alt="" />
          </div>
          <div className={`toast-notification-message ${toast.description.length <= 73 ? 'toast-message' : ''}`}>
            {toast.description}
          </div>
        </div>
      ))}
    </div>
  );
};

Toast.propTypes = {
  toastList: PropTypes.array,
  position: PropTypes.string,
  autoDelete: PropTypes.bool,
  autoDeleteTime: PropTypes.number
};

export default Toast;
