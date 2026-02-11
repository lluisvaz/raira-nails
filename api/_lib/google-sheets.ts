import { google, sheets_v4 } from "googleapis";

export interface AppendOptions {
  spreadsheetId: string;
  sheetName?: string; // aba/guia, default "Leads"
}

function getJwtClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!clientEmail || !privateKey) {
    throw new Error("Credenciais do Google não configuradas (GOOGLE_CLIENT_EMAIL/GOOGLE_PRIVATE_KEY)");
  }

  // Corrige \n escapados vindos de variáveis de ambiente
  privateKey = privateKey.replace(/\\n/g, "\n");

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

/**
 * Retorna o nome da aba em notação A1, sempre entre aspas simples e escapando aspas internas
 */
function a1QuotedSheetName(name: string): string {
  return `'${name.replace(/'/g, "''")}'`;
}

/**
 * Garante que a aba exista; cria se não existir.
 */
async function ensureSheetExists(
  sheets: sheets_v4.Sheets,
  spreadsheetId: string,
  sheetName: string,
): Promise<void> {
  const getResp = await sheets.spreadsheets.get({ spreadsheetId });
  const exists = (getResp.data.sheets || []).some(
    (s) => s.properties?.title === sheetName,
  );

  console.log(`[sheets] sheet '${sheetName}' exists=${exists} in spreadsheet ${spreadsheetId}`);

  if (!exists) {
    console.log(`[sheets] creating sheet '${sheetName}' in spreadsheet ${spreadsheetId}`);
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          { addSheet: { properties: { title: sheetName } } },
        ],
      },
    });
  }
}

export async function appendLeadRow(
  opts: AppendOptions,
  row: (string | number | boolean | null | undefined)[],
): Promise<void> {
  const { spreadsheetId, sheetName = "Leads" } = opts;
  const auth = getJwtClient();
  const sheets = google.sheets({ version: "v4", auth });

  // Garante que a aba existe e gera range sempre com nome entre aspas
  await ensureSheetExists(sheets, spreadsheetId, sheetName);
  const range = `${a1QuotedSheetName(sheetName)}!A:Z`;

  console.log(`[sheets] appending ${1} row(s) to ${spreadsheetId} range ${range}`);
  const resp = await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [row.map((v) => (v == null ? "" : String(v)))],
    },
  });
  const updatedRange = (resp.data as any)?.updates?.updatedRange;
  console.log(`[sheets] append ok. updatedRange=${updatedRange ?? "<none>"}`);
}
