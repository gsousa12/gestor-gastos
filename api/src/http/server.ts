import fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { serverConfig } from "./config/config";

export async function buildServer() {
  const server = fastify({
    ...serverConfig,
    ajv: {
      customOptions: {
        removeAdditional: "all",
        coerceTypes: true,
        useDefaults: true,
      },
    },
  }).withTypeProvider<TypeBoxTypeProvider>();

  // Hooks globais
  server.addHook("onRequest", async (request) => {
    // Log de todas as requisições
    request.log.info(
      { url: request.raw.url, method: request.raw.method },
      "incoming request"
    );
  });

  server.addHook("onResponse", async (request, reply) => {
    request.log.info(
      {
        url: request.raw.url,
        method: request.raw.method,
        statusCode: reply.statusCode,
      },
      "request completed"
    );
  });

  // Health Check
  server.get("/health", async () => {
    return { status: "ok", timestamp: new Date().toISOString() };
  });

  return server;
}
