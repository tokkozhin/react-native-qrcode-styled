import React from 'react';
import { StyleSheet } from 'react-native';
import QRCodeStyled from 'react-native-qrcode-styled';

export default function WithBackgroundImage() {
  return (
    <QRCodeStyled
      data={'QR with background'}
      style={styles.svg}
      padding={24}
      pieceSize={8}
      backgroundImage={{
        href: require('../../assets/code.jpg'),
        // ... any other svg Image props (x, y, preserveAspectRatio, opacity, ...etc)
      }}
    />
  );
}

const styles = StyleSheet.create({
  svg: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },
});
