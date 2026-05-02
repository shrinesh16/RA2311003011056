import { Log } from "../logging_middleware/logger";

interface AuthResponse {
  token_type: string;
  access_token: string;
  expires_in: number;
}

export const authenticate = async (): Promise<string> => {
  Log("frontend", "info", "api", "Starting authentication");

  try {
    const response = await fetch("/evaluation-service/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "sn8149@srmist.edu.in",
        name: "Shrinesh T M",
        rollNo: "RA2311003011056",
        accessCode: "QkbpxH",
        clientID: "42473bff-2f10-4cbd-9511-88fb3436e6f9",
        clientSecret: "SkZmcCYMuRBkakTm",
      }),
    });

    if (!response.ok) {
      Log("frontend", "error", "api", `Auth failed with status: ${response.status}`);
      throw new Error(`Authentication failed: ${response.status}`);
    }

    const data: AuthResponse = await response.json();
    localStorage.setItem("access_token", data.access_token);
    Log("frontend", "info", "api", "Authentication successful, token stored");
    return data.access_token;
  } catch (error) {
    Log("frontend", "error", "api", `Auth error: ${(error as Error).message}`);
    throw error;
  }
};
