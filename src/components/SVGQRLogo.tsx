import { useEffect, useMemo } from 'react';
import { Image as SVGImage } from 'react-native-svg';

import type { QRCodeErrorCorrectionLevel } from '../adapters/qrcode';
import type { LogoOptions } from '../types';
import useQRCodeLogoSize from '../hooks/useQRCodeLogoSize';

export interface SVGQRLogoProps extends LogoOptions {
  qrSize: number;
  errorCorrectionLevel: QRCodeErrorCorrectionLevel;
  pieceSize: number;
  qrCodeSize: number;
}

export default function SVGQRLogo({
  qrSize,
  errorCorrectionLevel,
  pieceSize,
  qrCodeSize,
  padding = 0,
  scale = 1,
  href,
  x,
  y,
  onChange,
  ...props
}: SVGQRLogoProps) {
  const { width, height } = useQRCodeLogoSize({
    errorCorrectionLevel,
    logoHref: href,
    logoScale: scale,
    pieceSize,
    qrCodeSize,
  });

  const hasSize = width > 0 && height > 0;
  const logoX = Number(x ?? (width ? qrSize / 2 - width / 2 : 0));
  const logoY = Number(y ?? (height ? qrSize / 2 - height / 2 : 0));

  const logoArea = useMemo(
    () =>
      hasSize
        ? {
            x: logoX,
            y: logoY,
            width,
            height,
          }
        : undefined,
    [hasSize, logoX, logoY, width, height]
  );

  useEffect(() => {
    if (hasSize) {
      onChange?.(logoArea);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasSize, logoArea]);

  // padding limitations
  let _padding = padding;
  if (_padding * 2 > width) {
    _padding = width / 2;
  }
  if (_padding * 2 > height) {
    _padding = height / 2;
  }

  if (!hasSize) {
    return null;
  }

  return (
    <SVGImage
      href={href}
      x={logoX + _padding}
      y={logoY + _padding}
      preserveAspectRatio="xMidYMid meet"
      {...props}
      width={width - _padding * 2}
      height={height - _padding * 2}
    />
  );
}
