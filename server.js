const app = require("./src/api/config/express")();
const port = app.get("port");

app.listen(port, () => {
  console.log(`Server currently running on PORT ${port}`);
});
