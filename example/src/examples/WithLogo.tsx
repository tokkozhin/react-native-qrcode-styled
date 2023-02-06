import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import QRCodeStyled from 'react-native-qrcode-styled';

export default function WithLogo() {
  return (
    <View style={styles.root}>
      <QRCodeStyled
        data={'QR code with logo'}
        style={styles.svg}
        padding={20}
        pieceSize={8}
        color={'#000'}
        errorCorrectionLevel={'H'}
        innerEyesOptions={{
          borderRadius: 12,
          color: '#000',
        }}
        outerEyesOptions={{
          borderRadius: 12,
          color: '#ffa114',
        }}
      />

      {/*OR you can add svg logo into QRCodeStyles component as a children callback */}
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/SVG_Logo.png')} style={styles.logo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  logoContainer: {
    position: 'absolute',
    width: 88,
    height: 88,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '90%',
    height: '90%',
    top: -2,
  },
});
