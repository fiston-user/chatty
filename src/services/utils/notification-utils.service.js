import { notificationService } from '@services/api/notifications/notifications.service';
import { socketService } from '@services/socket/socket.service';
import { Utils } from '@services/utils/utils.service';
import { timeAgo } from '@services/utils/timeago.utils';
import { cloneDeep, find, findIndex, remove, sumBy } from 'lodash';

export class NotificationUtils {
  static socketIONotification(profile, notifications, setNotifications, type, setNotificationCount) {
    socketService?.socket?.on('insert notification', (data, userToData) => {
      if (profile?._id === userToData.userTo) {
        notifications = [...data];
        if (type === 'notificationPage') {
          setNotifications(notifications);
        } else {
          const mappedNotifications = NotificationUtils.mapNotificationDropdownItems(
            notifications,
            setNotificationCount
          );
          setNotifications(mappedNotifications);
        }
      }
    });

    socketService?.socket?.on('update notification', (notificationId) => {
      notifications = cloneDeep(notifications);
      const notificationData = find(notifications, (notification) => notification._id === notificationId);
      if (notificationData) {
        const index = findIndex(notifications, (notification) => notification._id === notificationId);
        notificationData.read = true;
        notifications.splice(index, 1, notificationData);
        if (type === 'notificationPage') {
          setNotifications(notifications);
        } else {
          const mappedNotifications = NotificationUtils.mapNotificationDropdownItems(
            notifications,
            setNotificationCount
          );
          setNotifications(mappedNotifications);
        }
      }
    });

    socketService?.socket?.on('delete notification', (notificationId) => {
      notifications = cloneDeep(notifications);
      remove(notifications, { _id: notificationId });
      if (type === 'notificationPage') {
        setNotifications(notifications);
      } else {
        const mappedNotifications = NotificationUtils.mapNotificationDropdownItems(notifications, setNotificationCount);
        setNotifications(mappedNotifications);
      }
    });
  }

  static mapNotificationDropdownItems(notificationData, setNotificationCount) {
    const items = [];
    for (const notification of notificationData) {
      const item = {
        _id: notification?._id,
        topText: notification?.topText ? notification?.topText : notification?.message,
        subText: timeAgo.transform(notification?.createdAt),
        createdAt: notification?.createdAt,
        username: notification?.userFrom ? notification?.userFrom.username : notification?.username,
        avatarColor: notification?.userFrom ? notification?.userFrom.avatarColor : notification?.avatarColor,
        profilePicture: notification?.userFrom ? notification?.userFrom.profilePicture : notification?.profilePicture,
        read: notification?.read,
        post: notification?.post,
        imgUrl: notification?.imgId
          ? Utils.appImageUrl(notification?.imgVersion, notification?.imgId)
          : notification?.gifUrl
            ? notification?.gifUrl
            : notification?.imgUrl,
        comment: notification?.comment,
        reaction: notification?.reaction,
        senderName: notification?.userFrom ? notification?.userFrom.username : notification?.username,
        notificationType: notification?.notificationType
      };
      items.push(item);
    }

    const count = sumBy(items, (selectedNotification) => {
      return !selectedNotification.read ? 1 : 0;
    });
    setNotificationCount(count);
    return items;
  }

  static async markMessageAsRead(messageId, notification, setNotificationDialogContent) {
    if (notification.notificationType !== 'follows') {
      const notificationDialog = {
        createdAt: notification?.createdAt,
        post: notification?.post,
        imgUrl: notification?.imgId
          ? Utils.appImageUrl(notification?.imgVersion, notification?.imgId)
          : notification?.gifUrl
            ? notification?.gifUrl
            : notification?.imgUrl,
        comment: notification?.comment,
        reaction: notification?.reaction,
        senderName: notification?.userFrom ? notification?.userFrom.username : notification?.username
      };
      setNotificationDialogContent(notificationDialog);
    }
    await notificationService.markNotificationAsRead(messageId);
  }
}
