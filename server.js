// server.js
const WebSocket = require("ws");

// ポート3000でWebSocketサーバーを作成
const wss = new WebSocket.Server({ port: 3000 });

wss.on("connection", (ws) => {
  console.log("クライアントが接続されました");

  // クライアントからメッセージを受信
  ws.on("message", (message) => {
    console.log("クライアントから受信:", message);

    // 受信メッセージを全てのクライアントに送信
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`サーバーからの返信: ${message}`);
      }
    });
  });

  // 接続が切断されたときの処理
  ws.on("close", () => {
    console.log("クライアントが切断されました");
  });
});

console.log("WebSocketサーバーがポート3000で起動しました");
