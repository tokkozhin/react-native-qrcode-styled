import { StyleSheet } from 'react-native';
import QRCodeStyled from '../../../src';

export default function CutCornersPieces() {
  return (
    <QRCodeStyled
      data={'Cut Corners Pieces'}
      style={styles.svg}
      padding={25}
      pieceCornerType={'cut'}
      pieceBorderRadius={['50%', 0, '50%']}
      isPiecesGlued
      color={'#59387e'}
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
