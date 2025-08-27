import { StyleSheet, View } from 'react-native';
import QRCodeStyled from '../../../src';

export default function WithLogo() {
  return (
    <View style={styles.root}>
      <QRCodeStyled
        data={'QR code with logo'}
        style={styles.svg}
        padding={20}
        color={'#000'}
        errorCorrectionLevel={'H'}
        innerEyesOptions={{
          borderRadius: '20%',
          color: '#000',
        }}
        outerEyesOptions={{
          borderRadius: '30%',
          color: '#ffa114',
        }}
        logo={{
          href: require('../../assets/SVG_Logo.png'),
          padding: 4,
          // scale: 0.8,
          // hidePieces: false,
          // ... any other svg Image props (x, y, preserveAspectRatio, opacity, ...etc)
        }}
      />

      {/* OR you can add logo by adding classic RN Image component */}
      {/* 
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/SVG_Logo.png')} style={styles.logo} />
      </View> 
      */}

      {/* OR you can add svg logo into QRCodeStyles component as a children callback */}
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
