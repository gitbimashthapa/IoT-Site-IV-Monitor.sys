// ESM syntax for Node.js
import { WebSocketServer } from "ws";

// Create WebSocket server on port 81 to match ESP32 client
const wss = new WebSocketServer({ port: 81 });

// Store connected clients
const clients = new Set();

// Keep track of the latest data to send to new connections
let latestData = {
  volumeInMl: 0,
  percentage: 0,
  hx711Connected: true,
  timestamp: new Date().toISOString(),
};

//data for testing (remove in production)
function sendData() {
  latestData = {
    volumeInMl: Math.floor(Math.random() * 500),
    percentage: Math.floor(Math.random() * 100),
    hx711Connected: true,
    timestamp: new Date().toISOString(),
  };

  broadcastData(latestData);
}

// Broadcast data to all connected clients
function broadcastData(data) {
  clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

// Handle incoming connections
wss.on("connection", (ws) => {
  console.log("New client connected");
  clients.add(ws);

  // Send the latest data immediately upon connection
  ws.send(JSON.stringify(latestData));

  // Handle messages from clients
  ws.on("message", (data) => {
    try {
      const message = JSON.parse(data);
      console.log("Received:", message);

      // Update latest data
      latestData = { ...message, timestamp: new Date().toISOString() };

      // Broadcast to all other clients
      broadcastData(latestData);
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  // Handle client disconnection
  ws.on("close", () => {
    console.log("Client disconnected");
    clients.delete(ws);
  });

  // Handle errors
  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
    clients.delete(ws);
  });
});

// Keep track of server status
wss.on("listening", () => {
  console.log("WebSocket server running on port 81");
});

wss.on("error", (error) => {
  console.error("WebSocket server error:", error);
});

setInterval(sendData, 2000);
