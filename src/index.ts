import 'fast-text-encoding';
import QRCodeStyled from './components/SVGQRCodeStyled';
import SVGGradient from './components/SVGGradient';
import type { SVGQRCodeStyledProps } from './components/SVGQRCodeStyled';
import type { SVGGradientProps } from './components/SVGGradient';

export type { QRCodeMessage, QRCodeOptions } from './adapters/qrcode';

export * from './types';
export * from './constants';

export { default as useQRCodeData } from './hooks/useQRCodeData';

export {
  isCoordsOfOuterEyes,
  isCoordsOfInnerEyes,
  isCoordsOfTopRightOuterEye,
  isCoordsOfTopRightInnerEye,
  isCoordsOfTopLeftOuterEye,
  isCoordsOfTopLeftInnerEye,
  isCoordsOfBottomLeftOuterEye,
  isCoordsOfBottomLeftInnerEye,
} from './helpers';

export { SVGGradient };
export type { SVGQRCodeStyledProps, SVGGradientProps };

export default QRCodeStyled;
