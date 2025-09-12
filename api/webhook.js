export default function handler(req, res) {
  if (req.method === "POST") {
    const events = req.body.events;

    // 簡單回覆訊息
    if (events.length > 0) {
      const event = events[0];

      if (event.type === "message" && event.message.type === "text") {
        console.log("使用者傳來：", event.message.text);

        // 回覆訊息
        replyMessage(event.replyToken, "Hi! 我是你的戒色小幫手 🙌");
      }
    }

    res.status(200).send("OK");
  } else {
    res.status(405).send("Method Not Allowed");
  }
}

// 呼叫 LINE Messaging API 回覆訊息
async function replyMessage(replyToken, message) {
  const fetch = (await import("node-fetch")).default;

  await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      replyToken: replyToken,
      messages: [{ type: "text", text: message }],
    }),
  });
}
