import React from 'react';
import { type Notification } from '../api/notifications';

interface Props {
  notification: Notification;
}

export const NotificationItem: React.FC<Props> = ({ notification }) => {
  const getBadgeColor = (type: string) => {
    switch(type) {
      case 'Placement': return '#4caf50';
      case 'Result': return '#2196f3';
      case 'Event': return '#ff9800';
      default: return '#9e9e9e';
    }
  };

  return (
    <div className="notification-item">
      <div className="notification-header">
        <span className="badge" style={{ backgroundColor: getBadgeColor(notification.type) }}>
          {notification.type}
        </span>
        <span className="timestamp">
          {new Date(notification.timestamp).toLocaleString()}
        </span>
      </div>
      {notification.title && <h3 className="title">{notification.title}</h3>}
      <p className="message">{notification.message}</p>
    </div>
  );
};
