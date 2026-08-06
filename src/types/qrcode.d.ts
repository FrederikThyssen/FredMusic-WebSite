declare module 'qrcode' {
  export type QRCodeToDataURLOptions = {
    margin?: number;
    scale?: number;
    width?: number;
    color?: {
      dark?: string;
      light?: string;
    };
    errorCorrectionLevel?: "low" | "medium" | "quartile" | "high" | "L" | "M" | "Q" | "H";
  };

  type QRCodeModule = {
    toDataURL(text: string, options?: QRCodeToDataURLOptions): Promise<string>;
  };

  const qrcode: QRCodeModule;
  export default qrcode;
  export function toDataURL(text: string, options?: QRCodeToDataURLOptions): Promise<string>;
}
