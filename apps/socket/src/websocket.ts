import { createServer, IncomingMessage } from "node:http";
import type { Express } from "express";
import WebSocket, { WebSocketServer } from "ws";

const onConnect = (ws: WebSocket, request: IncomingMessage) => {
  const { headers } = request;

  const agentId = headers["x-identifier"]?.toString();
  if (agentId != null) {
    console.log(`Agent connected: ${agentId}`);
    // instanceClients[instanceId] = ws;
    // ws.on("message", onInstanceMessage);
    // ws.on("close", onInstanceClose(instanceId));
    return;
  }

  // For some reason you cannot set custom headers in the browser
  const clientId = headers["sec-websocket-protocol"]?.toString();
  if (clientId != null) {
    console.log(`Client connected: ${clientId}`);
    // clients[clientId] = ws;
    // ws.on("message", onClientMessage);
    // ws.on("close", onClientClose(clientId));
    return;
  }

  ws.close();
};

export const addSocket = (expressApp: Express) => {
  const server = createServer(expressApp);
  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", (request, socket, head) => {
    if (request.url == null) {
      socket.destroy();
      return;
    }

    const { pathname } = new URL(request.url, "ws://base.ws");
    if (pathname !== "/socket") {
      socket.destroy();
      return;
    }

    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  wss.on("connection", (ws, request) => onConnect(ws, request));

  return server;
};
