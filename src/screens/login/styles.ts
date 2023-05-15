import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 40,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  form: {
    alignItems: 'center',
    width: '100%'
  },
  input: {
    backgroundColor: '#fff',
    width: '85%'
  },
  submitButton: {
    backgroundColor: '#4E89AE',
    width: '85%',
    borderRadius: 5,
    marginTop: 20
  },
  linksContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20
  },
  linkText: {
    color: '#4E89AE',
    marginTop: 15,
    letterSpacing: 1
  }
});
