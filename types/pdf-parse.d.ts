declare module "pdf-parse" {
  export type PdfParseResult = { text: string; numpages?: number; info?: unknown; metadata?: unknown };
  export default function pdfParse(dataBuffer: Buffer): Promise<PdfParseResult>;
}
