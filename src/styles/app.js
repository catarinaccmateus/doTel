import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  header: {
    width: '100%',
  },
  input: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: 'black',
    backgroundColor: 'white',
    height: 25,
    marginTop: 10,
    padding: 5,
  },
  inputiOS: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: 'black',
    backgroundColor: 'white',
    height: 30,
    marginTop: 10,
    marginBottom: 0,
    padding: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#e6f2ff',
  },
  body: {
    flex: 1,
    backgroundColor: '#e6f2ff',
  },
  hotelScroll: {
    paddingTop: 30,
  },
  hotelList: {
    flex: 1,
    marginBottom: 10,
  },
  hotelItem: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    padding: 5,
  },
  hotelInfo: {
    flex: 8,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  hoteTitle: {
    fontWeight: '300',
    alignSelf: 'center',
  },
  hotelSubtitle: {
    color: '#999999',
  },
  hotelLink: {
    color: '#00264d',
  },
  button: {
    borderWidth: 1,
    borderColor: '#1f7a7a',
    borderRadius: 5,
    padding: 5,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  loader: {
    padding: 20,
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
    borderRadius: 50,
    marginBottom: 30,
    minHeight: 30,
    marginHorizontal: 30,
    padding: 10,
  },
  pageContent: { flex: 1, margin: 30 },
  mapLink: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  mapText: {
    fontWeight: '700',
  },
});
