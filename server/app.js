const path = require("path");
const express = require("express");
const compression = require("compression");
const morgan = require("morgan");
const { createRequestHandler } = require("@remix-run/express");
const { createServer } = require("http"); // add this require

const BUILD_DIR = path.join(process.cwd(), "build");

function purgeRequireCache() {
    for (const key in require.cache) {
      if (key.startsWith(BUILD_DIR)) {
        delete require.cache[key];
      }
    }
}

function MakeApp() {
    const app = express();

    // create an httpServer from the Express app
    const httpServer = createServer(app);

    app.use(compression());
    app.disable("x-powered-by");
    app.use(
        "/build",
        express.static("public/build", { immutable: true, maxAge: "1y" })
    );
    app.use(express.static("public", { maxAge: "1h" }));
    app.use(morgan("tiny"));
    app.all(
    "*",
    process.env.NODE_ENV === "development"
        ? (req, res, next) => {
            purgeRequireCache();

            return createRequestHandler({
            build: require(BUILD_DIR),
            mode: process.env.NODE_ENV,
            })(req, res, next);
        }
        : createRequestHandler({
            build: require(BUILD_DIR),
            mode: process.env.NODE_ENV,
        })
    );
    return httpServer;
}



module.exports = { MakeApp }