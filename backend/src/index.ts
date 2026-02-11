import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./config/vite.config";
import { apiLogger } from "./middleware/logger.middleware";
import { errorHandler } from "./middleware/error-handler.middleware";
import { getServerPort, getServerHost } from "./config/server.config";
import { log } from "./utils/logger";

// Carrega variáveis de ambiente de .env (raiz do projeto e pasta backend)
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Primeiro tenta carregar da raiz do projeto
dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });
// Depois, carrega um .env específico do backend (se existir), sobrescrevendo chaves
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

// Declaração de módulo para adicionar rawBody ao Request
declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

// Cria a aplicação Express
const app = express();

// Middleware para parsing JSON com preservação do rawBody
app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

// Middleware para parsing de URL encoded
app.use(express.urlencoded({ extended: false }));

// Middleware de logging para requisições da API
app.use(apiLogger);

// Inicializa o servidor
(async () => {
  try {
    // Registra todas as rotas
    const server = await registerRoutes(app);

    // Middleware global de tratamento de erros
    app.use(errorHandler);

    // Configura Vite em desenvolvimento ou serve arquivos estáticos em produção
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // Obtém configurações do servidor
    const port = getServerPort();
    const host = getServerHost();

    // Tratamento de erros do servidor
    server.on("error", (err: any) => {
      if (err.code === "ENOTSUP") {
        log(
          "Windows networking issue detected. Try running as administrator: netsh winsock reset",
        );
      }
      console.error("Server error:", err);
    });

    // Inicia o servidor
    server.listen(port, host, () => {
      log(`serving on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();
