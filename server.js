const WebSocket = require("ws");

// Create WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Store connected clients with their IDs and permissions
const clients = new Map();

// Helper function to check if source client can message target client
function canMessageClient(sourceId, targetId) {
  const sourceClient = clients.get(sourceId);
  if (!sourceClient || !sourceClient.permissions) {
    return false;
  }

  // Check if source has permission to message target
  return sourceClient.permissions.includes(targetId);
}

wss.on("connection", (ws) => {
  // Generate unique client ID
  const clientId = Math.random().toString(36).substring(7);

  // Store client connection with empty permissions
  clients.set(clientId, {
    ws: ws,
    permissions: [], // Array of client IDs this client can message
  });

  // Send client their ID
  ws.send(
    JSON.stringify({
      type: "connected",
      clientId: clientId,
    })
  );

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);

      if (data.type === "requestPermission") {
        // Handle permission requests
        const targetId = data.targetId;
        if (clients.has(targetId)) {
          const client = clients.get(clientId);
          client.permissions.push(targetId);
          ws.send(
            JSON.stringify({
              type: "permissionGranted",
              targetId: targetId,
            })
          );
        }
      }
      // Route message to target client if permitted
      else if (data.targetId && clients.has(data.targetId)) {
        if (canMessageClient(clientId, data.targetId)) {
          const targetClient = clients.get(data.targetId).ws;
          targetClient.send(
            JSON.stringify({
              type: "message",
              from: clientId,
              content: data.content,
            })
          );
        } else {
          ws.send(
            JSON.stringify({
              type: "error",
              message: "You don't have permission to message this client",
            })
          );
        }
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  ws.on("close", () => {
    // Remove client when they disconnect
    clients.delete(clientId);
  });
});

console.log("WebSocket server running on port 8080");
