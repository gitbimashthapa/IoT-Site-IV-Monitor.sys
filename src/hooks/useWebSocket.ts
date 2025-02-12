import { useState, useEffect, useCallback } from "react";
import { WebSocketService } from "../services/websocket";
import { IVData } from "../types";

// Use the environment variable, but provide a fallback that matches your ESP32's IP
const WEBSOCKET_URL =
  import.meta.env.VITE_WEBSOCKET_URL || "ws://192.168.1.100:81";
const MAX_HISTORY_LENGTH = 50;

export const useWebSocket = () => {
  const [connected, setConnected] = useState(false);
  const [currentData, setCurrentData] = useState<IVData>({
    volumeInMl: 0,
    percentage: 0,
    timestamp: new Date().toISOString(),
    isConnected: false,
    hx711Connected: false,
  });
  const [history, setHistory] = useState<IVData[]>([
    {
      volumeInMl: 0,
      percentage: 0,
      timestamp: new Date().toISOString(),
      isConnected: false,
      hx711Connected: false,
    },
  ]);

  const updateData = useCallback((data: IVData) => {
    console.log("Received WebSocket data:", data); // Add logging
    setCurrentData(data);
    setHistory((prev) => {
      const newHistory = [...prev, data];
      return newHistory.slice(-MAX_HISTORY_LENGTH);
    });
    setConnected(data.isConnected);
  }, []);

  useEffect(() => {
    console.log("Connecting to WebSocket:", WEBSOCKET_URL); // Add logging
    const wsService = WebSocketService.getInstance();

    wsService.connect(WEBSOCKET_URL).catch((error) => {
      console.error("Failed to connect to WebSocket:", error);
      setConnected(false);
    });

    const unsubscribe = wsService.subscribe(updateData);

    return () => {
      unsubscribe();
      wsService.disconnect();
    };
  }, [updateData]);

  return {
    connected,
    currentData,
    history,
  };
};
