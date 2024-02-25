import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '@root/routes';
import { useEffect } from 'react';
import { socketService } from '@services/socket/socket.service';
import Toast from '@components/toast/Toast';

import '@root/App.scss';
import { useSelector } from 'react-redux';

const App = () => {
  const { notifications } = useSelector((state) => state);

  useEffect(() => {
    socketService.setupSocketConnection();
  }, []);

  return (
    <>
      {notifications && notifications.length > 0 && (
        <Toast toastList={notifications} position="top-right" autoDelete autoDeleteTime={3000} />
      )}
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
};

export default App;
