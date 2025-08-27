import { useMemo } from 'react';

import type { BitMatrix } from '../types';
import { createQRCode, type QRCodeMessage, type QRCodeOptions } from '../adapters/qrcode';
import { consoleError } from '../helpers';

export default function useQRCodeData(
  data: QRCodeMessage,
  options: QRCodeOptions
): { bitMatrix: BitMatrix; qrCodeSize: number } {
  const QRCodeData = useMemo(() => {
    try {
      return createQRCode(data, options);
    } catch (error) {
      consoleError(error);
      return;
    }
  }, [data, options]);

  const { size: qrCodeSize = 0, bitMatrix = [] } = QRCodeData || {};

  return {
    bitMatrix,
    qrCodeSize,
  };
}
