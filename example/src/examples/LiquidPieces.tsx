import { StyleSheet } from 'react-native';
import QRCodeStyled from '../../../src';

export default function LiquidPieces() {
  return (
    <QRCodeStyled
      data={'Liquid Pieces'}
      style={styles.svg}
      padding={25}
      pieceLiquidRadius={'50%'}
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
