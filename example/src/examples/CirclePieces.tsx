import React from 'react';
import { StyleSheet } from 'react-native';
import QRCodeStyled from 'react-native-qrcode-styled';

export default function CirclePieces() {
  return (
    <QRCodeStyled
      data={'Styling Pieces'}
      style={styles.svg}
      padding={25}
      pieceSize={8}
      pieceBorderRadius={4}
      color={'#F57F17'}
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
