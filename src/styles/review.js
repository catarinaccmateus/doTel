import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f2ff',
  },

  button: {
    borderWidth: 1,
    borderColor: '#1f7a7a',
    borderRadius: 5,
    padding: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    margin: 15,
  },
  buttonText: {
    color: '#00264d',
    alignSelf: 'center',
  },
  reviewButton: { width: 200, alignSelf: 'center' },
  reviewInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 30,
    minHeight: 30,
    marginHorizontal: 30,
    padding: 10,
    width: '100%',
  },
  scroll: { margin: 20, alignItems: 'center' },
  rate: { flexDirection: 'row', marginVertical: 20, marginBottom: 50 },
  title: {
    fontSize: 24,
    alignSelf: 'center',
    color: '#00264d',
    marginBottom: 10,
  },
  loader: { marginVertical: 10 },
  largeInput: { height: 100 },
});
