import { useCallback, useEffect, useState } from 'react';
import { Image, PixelRatio } from 'react-native';
import type { ImageProps as SVGImageProps } from 'react-native-svg';

import type { QRCodeErrorCorrectionLevel } from '../adapters/qrcode';
import { QR_ECL_PERS } from '../constants';
import { consoleWarn } from '../helpers';

type LogoSize = { width: number; height: number };

type UseQRCodeLogoSizeProps = {
  errorCorrectionLevel: QRCodeErrorCorrectionLevel;
  logoHref: SVGImageProps['href'];
  logoScale: number;
  pieceSize: number;
  qrCodeSize: number;
};

export default function useQRCodeLogoSize({
  errorCorrectionLevel,
  logoHref,
  logoScale,
  pieceSize,
  qrCodeSize,
}: UseQRCodeLogoSizeProps): LogoSize {
  const [transformedLogoSize, setTransformedLogoSize] = useState<LogoSize>({ width: 0, height: 0 });

  const transformLogoSize = useCallback(
    (width: number, height: number) => {
      const [widthPt, heightPt] = [width / PixelRatio.get(), height / PixelRatio.get()];

      const sLogo = widthPt * heightPt;
      const sQR = qrCodeSize ** 2 * pieceSize ** 2;
      const logoRatio = width / height;
      const maxS = sQR * QR_ECL_PERS[errorCorrectionLevel];

      let newWidth;
      let newHeight;

      if (sLogo > maxS) {
        const k = Math.sqrt(maxS / logoRatio);
        newWidth = Math.floor(k * logoRatio) * logoScale;
        newHeight = Math.floor(k) * logoScale;
      } else {
        newWidth = widthPt * logoScale;
        newHeight = heightPt * logoScale;
      }

      const roundedWidthInPiece = Math.round(newWidth / pieceSize);
      const roundedHeightInPiece = Math.round(newHeight / pieceSize);

      if (roundedWidthInPiece === roundedHeightInPiece) {
        newWidth =
          pieceSize *
          (roundedWidthInPiece % 2 === 0 ? roundedWidthInPiece - 1 : roundedWidthInPiece);
        newHeight = newWidth;
      } else if (roundedWidthInPiece > roundedHeightInPiece) {
        newWidth =
          pieceSize *
          (roundedWidthInPiece % 2 === 0 ? roundedWidthInPiece - 1 : roundedWidthInPiece);
        newHeight =
          pieceSize *
          (newWidth % pieceSize !== 0 ? roundedHeightInPiece - 1 : roundedHeightInPiece);
      } else {
        newHeight =
          pieceSize *
          (roundedHeightInPiece % 2 === 0 ? roundedHeightInPiece - 1 : roundedHeightInPiece);
        newWidth =
          pieceSize * (newHeight % pieceSize !== 0 ? roundedWidthInPiece - 1 : roundedWidthInPiece);
      }

      setTransformedLogoSize({ width: newWidth, height: newHeight });
    },
    [errorCorrectionLevel, logoScale, pieceSize, qrCodeSize]
  );

  useEffect(() => {
    if (logoHref) {
      // if logo is static
      if (typeof logoHref === 'number') {
        const { width, height } = Image.resolveAssetSource(logoHref);
        transformLogoSize(width, height);
      }

      // if logo is string & remote
      if (typeof logoHref === 'string') {
        Image.getSize(logoHref, transformLogoSize, () =>
          consoleWarn('Something wrong with logo url: ' + logoHref)
        );
      }

      // if logo is object & remote
      if (
        typeof logoHref !== 'string' &&
        typeof logoHref !== 'number' &&
        !Array.isArray(logoHref) &&
        logoHref.uri
      ) {
        Image.getSize(logoHref.uri, transformLogoSize, () =>
          consoleWarn('Something wrong with logo url: ' + logoHref.uri)
        );
      }
    }
  }, [logoHref, transformLogoSize]);

  return transformedLogoSize;
}
