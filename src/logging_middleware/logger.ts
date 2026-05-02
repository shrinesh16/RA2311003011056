export type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";
export type LogPackage = "api" | "component" | "hook" | "page" | "state" | "style" | "utils" | "middleware";

export const Log = async (
  stack: "frontend",
  level: LogLevel,
  pkg: LogPackage,
  message: string
) => {
  const token = localStorage.getItem("access_token");
  try {
    const response = await fetch("/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ stack, level, package: pkg, message })
    });
    if (!response.ok) {
      console.error("Failed to send log to server", response.statusText);
    }
  } catch (error) {
    console.error("Error sending log:", error);
  }
};
