const express = require("express");
const app = express();
const PORT = process.env.PORT ? +process.env.PORT : 8000;

app.get("/", (_, res) => {
  res.status(200).json({
    status: "Success",
    message: "Hello from express server",
  });
});

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

/*
node -v && npm -v
v22.18.0
10.9.3
locally installed
*/
