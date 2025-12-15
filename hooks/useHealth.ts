import { useState, useEffect } from "react";
import api from "../api/axios";

export interface HealthStatus {
  status: string;
  timestamp: Date;
}

export function useHealth() {
  const [status, setStatus] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<HealthStatus>("/health")
      .then((res) => setStatus(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { status, loading, error };
}
