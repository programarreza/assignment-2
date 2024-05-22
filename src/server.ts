import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log("Connection to DB Successfully");

    mongoose.connection.on("error", (error) => {
      console.log("DB connection error:", error);
    });

    app.listen(config.port, () => {
      console.log(`E-shop server listening on port ${config.port}`);
    });
  } catch (error: unknown) {
    console.log(error);
  }
}

main();
