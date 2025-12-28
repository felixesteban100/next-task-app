// import { NextResponse } from "next/server";
// import { WebSocketServer } from "ws";
// import { dbChangeEmitter } from "@/db/mongodb/mongodb";

// let wss: WebSocketServer | null = null;

// export const GET = async () => {
//   // Create a response that upgrades to WebSocket
//   const { response } = NextResponse.next({ webSocket: true });

//   // @ts-ignore: WebSocket upgrade not typed yet
//   const ws = response.webSocket;

//   if (!wss) {
//     wss = new WebSocketServer({ noServer: true });
//   }

//   ws.on("connection", (socket: any) => {
//     console.log("Client connected");

//     // Listener functions for each collection
//     const listeners: Record<string, (change: any) => void> = {};

//     const COLLECTIONS = ["Task", "DEFAULT_TASKS", "Reflection Questions", "List to watch"];

//     COLLECTIONS.forEach((collectionName) => {
//       const listener = (change: any) => {
//         if (socket.readyState === socket.OPEN) {
//           socket.send(JSON.stringify({ collection: collectionName, change }));
//         }
//       };
//       listeners[collectionName] = listener;
//       dbChangeEmitter.on(collectionName, listener);
//     });

//     socket.on("close", () => {
//       console.log("Client disconnected");
//       COLLECTIONS.forEach((collectionName) => {
//         dbChangeEmitter.off(collectionName, listeners[collectionName]);
//       });
//     });
//   });

//   return response;
// };
