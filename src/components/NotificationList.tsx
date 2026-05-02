import React, { useState } from 'react';
import { type Notification } from '../api/notifications';
import { NotificationItem } from './NotificationItem';
import { Log } from '../logging_middleware/logger';

interface Props {
  notifications: Notification[];
}

export const NotificationList: React.FC<Props> = ({ notifications }) => {
  const [filter, setFilter] = useState<string>('All');
  const [view, setView] = useState<'All' | 'Top10'>('All');

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    Log("frontend", "info", "component", `Filter changed to ${newFilter}`);
  };

  const handleViewChange = (newView: 'All' | 'Top10') => {
    setView(newView);
    Log("frontend", "info", "component", `View changed to ${newView}`);
  };

  let filteredList = filter === 'All' 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  if (view === 'Top10') {
    filteredList = filteredList.slice(0, 10);
  }

  return (
    <div className="notification-list-container">
      <div className="controls">
        <div className="view-controls">
          <button 
            className={view === 'All' ? 'active' : ''} 
            onClick={() => handleViewChange('All')}
          >
            All Notifications
          </button>
          <button 
            className={view === 'Top10' ? 'active' : ''} 
            onClick={() => handleViewChange('Top10')}
          >
            Top 10 Notifications
          </button>
        </div>
        <div className="filter-controls">
          <select value={filter} onChange={(e) => handleFilterChange(e.target.value)}>
            <option value="All">All Types</option>
            <option value="Placement">Placement</option>
            <option value="Result">Result</option>
            <option value="Event">Event</option>
          </select>
        </div>
      </div>

      <div className="list">
        {filteredList.length === 0 ? (
          <p className="no-data">No notifications found.</p>
        ) : (
          filteredList.map((notif, index) => (
            <NotificationItem key={notif.id || index} notification={notif} />
          ))
        )}
      </div>
    </div>
  );
};
