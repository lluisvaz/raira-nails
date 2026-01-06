import type { Request, Response, NextFunction } from "express";

/**
 * Middleware global para tratamento de erros
 */
export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Log stack para diagnóstico, mas não quebra o servidor em produção
  if (process.env.NODE_ENV !== "test") {
    console.error(err);
  }

  res.status(status).json({ message });
}
