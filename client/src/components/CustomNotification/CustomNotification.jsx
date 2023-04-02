import { useNotificationContext } from '../../context/NotificationContext';
import './CustomNotification.css'


const Notification = () => {
  const { hideNotification, notification } = useNotificationContext();

  // console.log(notification)

  return notification ? (
    <div
      className={`notification notification-${notification?.type} notification-${notification?.position}`}
    >
      <span>
        {notification?.custom ? notification?.custom : notification?.message}
      </span>
      <button className="notification-close" onClick={hideNotification}>
        +
      </button>
    </div>
  ) : null;
};


export default Notification;


