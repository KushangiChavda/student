const app = require("./src/app");

// Required color declaration for best command UI.
const SKY_BLUE = "\x1b[36m%s\x1b[0m";
const YELLOW = "\x1b[33m%s\x1b[0m";
const RED = "\x1b[31m%s\x1b[0m";

app.listen(3000, () => {
  console.log(YELLOW, "Web service is running on http://localhost:3000");
});
