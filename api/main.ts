import { serverConfig } from "../api/src/http/config/config";
import { buildServer } from "../api/src/http/server";

async function start() {
  try {
    const server = await buildServer();

    await server.listen({
      port: serverConfig.port,
      host: serverConfig.host,
    });

    console.log(
      `Server listening on http://${serverConfig.host}:${serverConfig.port}`
    );
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
}

start();
