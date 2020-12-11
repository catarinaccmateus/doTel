import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
  picture: {
    width: 200,
    height: 100,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: '300',
    marginBottom: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: '#1f7a7a',
    borderRadius: 5,
    padding: 5,
    marginVertical: 10,
  },
  cardFront: {
    backgroundColor: '#ff4d4d',
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  cardBack: {
    backgroundColor: '#66c2ff',
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
  },
  cardText: { fontWeight: 'bold', color: 'white', textAlign: 'center' },
});
