import { useEffect, useState } from 'react';
import { fetchNotifications, type Notification } from './api/notifications';
import { NotificationList } from './components/NotificationList';
import { Log } from './logging_middleware/logger';
import './App.css';

function App() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    
    const loadData = async () => {
      try {
        setLoading(true);
        Log("frontend", "info", "page", "App component mounted, fetching data");
        const data = await fetchNotifications();
        if (mounted) {
          setNotifications(data);
          Log("frontend", "info", "state", `Updated state with ${data.length} notifications`);
        }
      } catch (err) {
        if (mounted) {
          setError('Failed to load notifications');
          Log("frontend", "error", "state", "Updated state with error");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Campus Notifications</h1>
      </header>
      
      <main className="app-main">
        {loading && <p className="loading">Loading notifications...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && (
          <NotificationList notifications={notifications} />
        )}
      </main>
    </div>
  );
}

export default App;
