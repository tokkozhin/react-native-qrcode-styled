import React from 'react';
import { StyleSheet } from 'react-native';
import QRCodeStyled from 'react-native-qrcode-styled';

export default function RainStyle() {
  return (
    <QRCodeStyled
      data={'Rain Style'}
      style={styles.svg}
      padding={25}
      pieceSize={8}
      pieceScale={[0.85, 1.1]}
      color={'#106cb3'}
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
