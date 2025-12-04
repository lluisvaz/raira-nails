/**
 * Configurações do servidor
 */
export const SERVER_CONFIG = {
  /**
   * Porta padrão do servidor
   */
  DEFAULT_PORT: 5000,

  /**
   * Host padrão (IPv4 localhost para evitar problemas no Windows)
   */
  DEFAULT_HOST: "127.0.0.1",
} as const;

/**
 * Obtém a porta do servidor a partir das variáveis de ambiente
 */
export function getServerPort(): number {
  return parseInt(process.env.PORT || String(SERVER_CONFIG.DEFAULT_PORT), 10);
}

/**
 * Obtém o host do servidor a partir das variáveis de ambiente
 */
export function getServerHost(): string {
  return process.env.HOST || SERVER_CONFIG.DEFAULT_HOST;
}
