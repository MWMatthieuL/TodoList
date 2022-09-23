const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const config = require("./config.js");
const routes = require("./controllers/routes.js");
const cors = require("cors")

module.exports = class Server {
  constructor() {
    this.app = express();

    this.app.use(cors())
    this.config = config[process.argv[2]] || config.development;
  }

  dbConnect() {
    const host = this.config.mongodb.host;
    const connect = mongoose.createConnection(host);

    connect.on("error", (err) => {
      setTimeout(() => {
        console.log(`[ERROR] users api dbConnect()-> ${err}`);
        this.connect = this.dbConnect(host);
      }, 5000);
    });

    connect.on("disconnected", (err) => {
      setTimeout(() => {
        console.log(
          `[DISCONNECTED] users api dbConnect()-> mongodb disconnected`
        );
        this.connect = this.dbConnect(host);
      }, 5000);
    });

    process.on("SIGINT", () => {
      connect.close(() => {
        console.log(
          "[API END PROCESS] users api dbConnect() -> close mongodb connection"
        );
        process.exit(0);
      });
    });

    return connect;
  }

  /**
   * Middleware
   */
  middleware() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }

  routes() {
    new routes.todos(this.app, this.connect);

    this.app.use((req, res) => {
      res.status(404).json({
        code: 404,
        message: "Not found",
      });
    });
  }

  /**
   * Run
   */
  run() {
    try {
      this.connect = this.dbConnect();
      this.middleware();
      this.routes();
      this.app.listen(3000, () => {
        console.log("Server is running at port 3002");
      }); // Permet de lancer l'api express
    } catch (err) {
      console.error(`[ERROR Server] -> ${err}`);
    }
  }
};
