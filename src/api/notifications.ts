import { Log } from "../logging_middleware/logger";

export interface Notification {
  id: string; 
  title?: string; 
  message: string; 
  type: "Event" | "Result" | "Placement";
  timestamp: string; 
}

export const fetchNotifications = async (): Promise<Notification[]> => {
  Log("frontend", "info", "api", "Fetching notifications started");
  const token = localStorage.getItem("access_token");
  
  try {
    const response = await fetch("/evaluation-service/notifications", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });

    if (!response.ok) {
      Log("frontend", "error", "api", `Fetch failed with status: ${response.status}`);
      throw new Error("Failed to fetch notifications");
    }

    const data: Notification[] = await response.json();
    Log("frontend", "info", "api", "Successfully fetched notifications");

    // Sort by priority: Placement (1) > Result (2) > Event (3)
    const priorityMap: Record<string, number> = {
      "Placement": 1,
      "Result": 2,
      "Event": 3
    };

    const sortedData = data.sort((a, b) => {
      const priorityA = priorityMap[a.type] || 4;
      const priorityB = priorityMap[b.type] || 4;

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      
      // If same priority, sort by latest timestamp
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    // Return top 10 notifications based on requirements
    return sortedData.slice(0, 10);
  } catch (error) {
    Log("frontend", "error", "api", `Error fetching notifications: ${(error as Error).message}`);
    throw error;
  }
};
