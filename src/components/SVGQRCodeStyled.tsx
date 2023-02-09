import React, { ForwardedRef, forwardRef, useEffect, useMemo } from 'react';

import { Svg, Defs, G, SvgProps, Image, ClipPath, ImageProps } from 'react-native-svg';

import type {
  PieceOptions,
  GradientOrigin,
  EyePosition,
  EyeOptions,
  AllEyesOptions,
  RenderCustomPieceItem,
  BitMatrix,
} from '../types';
import type { QRCodeMessage, QRCodeOptions } from '../adapters/qrcode';
import { transformEyeOptionsToCommonPattern } from '../helpers';
import { INNER_EYE_SIZE_IN_BITS, OUTER_EYE_SIZE_IN_BITS } from '../constants';
import useQRCodeData from '../hooks/useQRCodeData';
import SVGPieces, { DEFAULT_PIECE_SIZE } from './SVGPieces';
import SVGGradient from './SVGGradient';

export interface SVGQRCodeStyledProps extends QRCodeOptions, PieceOptions, SvgProps {
  data?: QRCodeMessage;
  onChangeSize?: (size: number) => void;
  pieceLiquidRadius?: number;
  outerEyesOptions?: EyeOptions | AllEyesOptions;
  innerEyesOptions?: EyeOptions | AllEyesOptions;
  renderCustomPieceItem?: RenderCustomPieceItem;
  isPiecesGlued?: boolean;
  padding?: number;
  backgroundImage?: ImageProps;
  children?: (pieceSize: number, bitMatrix: BitMatrix) => SvgProps['children'];
}

function SVGQRCodeStyled(
  {
    data = "I'm QR Code!",
    onChangeSize,
    pieceSize = DEFAULT_PIECE_SIZE,
    pieceScale,
    pieceRotation,
    pieceCornerType = 'rounded',
    pieceBorderRadius = 0,
    pieceStroke,
    pieceStrokeWidth,
    pieceLiquidRadius,
    isPiecesGlued = false,
    outerEyesOptions,
    innerEyesOptions,
    renderCustomPieceItem,
    padding,
    color = 'black',
    gradient,
    backgroundImage,
    version,
    maskPattern,
    toSJISFunc,
    errorCorrectionLevel = 'M',
    children,
    ...props
  }: SVGQRCodeStyledProps,
  ref?: ForwardedRef<Svg> | null
) {
  const qrCodeOptions = useMemo(
    () => ({
      version,
      errorCorrectionLevel,
      maskPattern,
      toSJISFunc,
    }),
    [errorCorrectionLevel, maskPattern, toSJISFunc, version]
  );
  const { qrCodeSize, bitMatrix } = useQRCodeData(data, qrCodeOptions);
  const svgSize = pieceSize * qrCodeSize;

  const transformedOuterEyesOptions = transformEyeOptionsToCommonPattern(outerEyesOptions);
  const transformedInnerEyesOptions = transformEyeOptionsToCommonPattern(innerEyesOptions);

  useEffect(() => {
    onChangeSize?.(qrCodeSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrCodeSize]);

  const _props = { ...props };
  if (padding) {
    const _size = svgSize + 2 * padding;
    _props.width = _size;
    _props.height = _size;
    _props.viewBox = `-${padding} -${padding} ${_size} ${_size}`;
  }

  const startGradientOuterEyeCoords: { [K in EyePosition]: GradientOrigin } = {
    topLeft: [0, 0],
    topRight: [svgSize - pieceSize * OUTER_EYE_SIZE_IN_BITS, 0],
    bottomLeft: [0, svgSize - pieceSize * OUTER_EYE_SIZE_IN_BITS],
  };

  const startGradientInnerEyeCoords: { [K in EyePosition]: GradientOrigin } = {
    topLeft: [2 * pieceSize, 2 * pieceSize],
    topRight: [svgSize - pieceSize * INNER_EYE_SIZE_IN_BITS + 2 * pieceSize, 2 * pieceSize],
    bottomLeft: [2 * pieceSize, svgSize - pieceSize * OUTER_EYE_SIZE_IN_BITS + 2 * pieceSize],
  };

  const Pieces = (
    <SVGPieces
      bitMatrix={bitMatrix}
      isPiecesGlued={isPiecesGlued}
      pieceLiquidRadius={pieceLiquidRadius}
      pieceBorderRadius={pieceBorderRadius}
      pieceCornerType={pieceCornerType}
      pieceRotation={pieceRotation}
      pieceScale={pieceScale}
      pieceSize={pieceSize}
      pieceStroke={pieceStroke}
      pieceStrokeWidth={pieceStrokeWidth}
      outerEyesOptions={transformedOuterEyesOptions}
      innerEyesOptions={transformedInnerEyesOptions}
      renderCustomPieceItem={renderCustomPieceItem}
    />
  );

  if (backgroundImage) {
    return (
      <Svg ref={ref} width={svgSize} height={svgSize} {..._props}>
        <Defs>
          <ClipPath id={'image'}>
            <G>{Pieces}</G>
          </ClipPath>
        </Defs>

        <Image
          x="0"
          y="0"
          width="100%"
          height="100%"
          preserveAspectRatio="xMaxYMax slice"
          {...backgroundImage}
          clipPath="url(#image)"
        />

        {children?.(pieceSize, bitMatrix)}
      </Svg>
    );
  }

  return (
    <Svg ref={ref} width={svgSize} height={svgSize} {..._props}>
      {(!!gradient || !!transformedOuterEyesOptions || !!transformedInnerEyesOptions) && (
        <Defs>
          {!!gradient && <SVGGradient id="gradient" size={svgSize} {...gradient} />}

          {!!transformedOuterEyesOptions &&
            Object.keys(transformedOuterEyesOptions).map((key) => {
              return (
                <SVGGradient
                  id={`${key}CornerSquareGradient`}
                  key={`${key}CornerSquareGradient`}
                  size={pieceSize * OUTER_EYE_SIZE_IN_BITS}
                  origin={startGradientOuterEyeCoords[key as EyePosition]}
                  {...transformedOuterEyesOptions?.[key as EyePosition]?.gradient}
                />
              );
            })}

          {!!transformedInnerEyesOptions &&
            Object.keys(transformedInnerEyesOptions).map((key) => {
              return (
                <SVGGradient
                  id={`${key}CornerDotGradient`}
                  key={`${key}CornerDotGradient`}
                  size={pieceSize * INNER_EYE_SIZE_IN_BITS}
                  origin={startGradientInnerEyeCoords[key as EyePosition]}
                  {...transformedInnerEyesOptions?.[key as EyePosition]?.gradient}
                />
              );
            })}
        </Defs>
      )}

      <G fill={gradient ? 'url(#gradient)' : color}>{Pieces}</G>
      {children?.(pieceSize, bitMatrix)}
    </Svg>
  );
}

const forwardedSVGQRCodeStyled = forwardRef(SVGQRCodeStyled);
forwardedSVGQRCodeStyled.displayName = 'SVGQRCodeStyled';

export default forwardedSVGQRCodeStyled;
