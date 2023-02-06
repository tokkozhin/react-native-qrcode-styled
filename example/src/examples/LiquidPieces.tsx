import React from 'react';
import { StyleSheet } from 'react-native';
import QRCodeStyled from 'react-native-qrcode-styled';

export default function LiquidPieces() {
  return (
    <QRCodeStyled
      data={'Liquid Pieces'}
      style={styles.svg}
      padding={25}
      pieceSize={8}
      pieceLiquidRadius={4}
      color={'#c9a73f'}
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
