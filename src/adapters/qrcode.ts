import QRC, { type QRCodeOptions } from 'qrcode';

import { transformBitArrayToMatrix } from '../helpers';
import type { BitMatrix } from '../types';

export type { QRCodeOptions, QRCodeErrorCorrectionLevel } from 'qrcode';
export type QRCodeMessage = string | QRC.QRCodeSegment[];

export function createQRCode(
  message: QRCodeMessage,
  options: QRCodeOptions
): { size: number; bitMatrix: BitMatrix } {
  const QRCodeData = QRC.create(message, options);
  const { size = 0, data = [] } = QRCodeData?.modules || {};
  const bitArray = Array.from(data).map((bit) => (bit ? 1 : 0));
  const bitMatrix = transformBitArrayToMatrix(bitArray, size);

  return {
    size,
    bitMatrix,
  };
}
