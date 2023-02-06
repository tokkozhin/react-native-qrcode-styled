import React from 'react';

import { StyleSheet } from 'react-native';
import QRCodeStyled, {
  // isCoordsOfCornerDot,
  // isCoordsOfCornerSquare,
  RenderCustomPieceItem,
} from 'react-native-qrcode-styled';
import { Path } from 'react-native-svg';

export default function CustomPieces() {
  const renderCustomPieceItem: RenderCustomPieceItem = ({ x, y, pieceSize, bitMatrix }) => {
    if (
      bitMatrix[y]?.[x] === 1
      // !isCoordsOfCornerSquare(x, y, bitMatrix.length) && // <-- add this if you want to exclude corner squares from svg
      // !isCoordsOfCornerDot(x, y, bitMatrix.length) // <-- add this if you want to exclude corner dot from svg
    ) {
      const c = Math.round(Math.random() * 120);

      return (
        <Path
          fill={`rgb(${c},${c},${c})`}
          key={`piece_${x}_${y}`}
          d={`
          M${pieceSize * x} ${pieceSize * y} 
          L${pieceSize * (x + 1)} ${pieceSize * y} 
          L${pieceSize * (x + 1)} ${pieceSize * (y + 1)} 
          L${pieceSize * x} ${pieceSize * (y + 1)} z
        `}
        />
      );
    }

    return null;
  };

  return (
    <QRCodeStyled
      data={'Custom QR Code'}
      style={styles.svg}
      padding={25}
      pieceSize={8}
      renderCustomPieceItem={renderCustomPieceItem}
    />
  );
}

const styles = StyleSheet.create({
  svg: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
  },
});
