const app = require("./app");
const config = require("./config");

const port = config.server.port;
const host = config.server.host;

app.listen(port, host, () => {
    console.log(`Server Running on http://${host}:${port}`);
});

