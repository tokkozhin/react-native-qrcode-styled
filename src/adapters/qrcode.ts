import QRC from 'qrcode';

import { transformBitArrayToMatrix } from '../helpers';
import type { BitMatrix } from '../types';

// Declared here instead of re-exported from '@types/qrcode', which is a devDependency
// and references Node types (Buffer, stream) that do not exist in React Native.
// QRC.create() below keeps them compatible with the qrcode API.
export type QRCodeErrorCorrectionLevel =
  | 'low'
  | 'medium'
  | 'quartile'
  | 'high'
  | 'L'
  | 'M'
  | 'Q'
  | 'H';

export type QRCodeMaskPattern = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type QRCodeOptions = {
  version?: number; // QR code version, calculated if not set
  errorCorrectionLevel?: QRCodeErrorCorrectionLevel; // default 'M'
  maskPattern?: QRCodeMaskPattern; // calculated if not set
  toSJISFunc?: (codePoint: string) => number; // converts a kanji to its Shift JIS value
};

export type QRCodeSegment =
  | { mode: 'numeric'; data: string | number }
  | { mode: 'alphanumeric'; data: string }
  | { mode: 'byte'; data: Uint8Array | Uint8ClampedArray }
  | { mode: 'kanji'; data: string }
  | { mode?: never; data: string | Uint8Array | Uint8ClampedArray };

export type QRCodeMessage = string | QRCodeSegment[];

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
