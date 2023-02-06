import React from 'react';
import { StyleSheet } from 'react-native';
import QRCodeStyled from 'react-native-qrcode-styled';

export default function GluedRoundedPieces() {
  return (
    <QRCodeStyled
      data={'Glued Rounded Pieces'}
      style={styles.svg}
      padding={20}
      pieceSize={7}
      pieceBorderRadius={4}
      isPiecesGlued
      color={'#1d5480'}
      preserveAspectRatio="none"
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
