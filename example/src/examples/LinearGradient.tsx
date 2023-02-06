import React from 'react';
import { StyleSheet } from 'react-native';
import QRCodeStyled from 'react-native-qrcode-styled';

export default function LinearGradient() {
  return (
    <QRCodeStyled
      data={'LinearGradient'}
      style={styles.svg}
      padding={25}
      pieceSize={8}
      pieceBorderRadius={[0, 6, 0, 6]}
      isPiecesGlued
      gradient={{
        type: 'linear',
        options: {
          start: [0, 0],
          end: [1, 1],
          colors: ['#da0c8b', '#00bfff'],
          locations: [0, 1],
        },
      }}
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
