import React from 'react';
import { StyleSheet } from 'react-native';
import QRCodeStyled from 'react-native-qrcode-styled';

export default function CustomEyes() {
  return (
    <QRCodeStyled
      data={'Custom Corners'}
      style={styles.svg}
      padding={20}
      pieceSize={8}
      pieceBorderRadius={4}
      gradient={{
        type: 'radial',
        options: {
          center: [0.5, 0.5],
          radius: [1, 1],
          colors: ['#ff7bc6', '#0f0080'],
          locations: [0, 1],
        },
      }}
      outerEyesOptions={{
        topLeft: {
          borderRadius: [20, 20, 0, 20],
        },
        topRight: {
          borderRadius: [20, 20, 20],
        },
        bottomLeft: {
          borderRadius: [20, 0, 20, 20],
        },
      }}
      innerEyesOptions={{
        borderRadius: 12,
        scale: 0.85,
      }}
    />
  );
}

const styles = StyleSheet.create({
  svg: {
    backgroundColor: 'white',
    borderRadius: 36,
    overflow: 'hidden',
  },
});
