import { StyleSheet } from 'react-native';
import QRCodeStyled from '../../../src';

export default function WithBackgroundImage() {
  return (
    <QRCodeStyled
      data={'QR with background'}
      style={styles.svg}
      padding={24}
      pieceScale={1}
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
