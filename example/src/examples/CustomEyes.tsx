import { StyleSheet } from 'react-native';
import QRCodeStyled from '../../../src';

export default function CustomEyes() {
  return (
    <QRCodeStyled
      data={'Custom Corners'}
      style={styles.svg}
      padding={20}
      pieceBorderRadius={'50%'}
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
          borderRadius: ['40%', '40%', 0, '40%'],
        },
        topRight: {
          borderRadius: ['40%', '40%', '40%'],
        },
        bottomLeft: {
          borderRadius: ['40%', 0, '40%', '40%'],
        },
      }}
      innerEyesOptions={{
        borderRadius: '50%',
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
