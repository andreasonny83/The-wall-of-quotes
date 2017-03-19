const apiKey = 'AIzaSyBRBI7YL63c3n4x1zRvButCn8mBg2cNEMM';
const authDomain = 'the-wall-of-quotes.firebaseapp.com';
const databaseURL = 'https://the-wall-of-quotes.firebaseio.com';
const storageBucket = 'the-wall-of-quotes.appspot.com';
const apiUrl = 'https://the-wall-of-quotes-api.herokuapp.com';
// const apiUrl = 'http://localhost:3012'; // For Dev only
const version = '1.1.0';

export class ConstantService {
  public static get API_KEY() { return apiKey; }
  public static get AUTH_DOMAIN() { return authDomain; }
  public static get DB() { return databaseURL; }
  public static get BUCKET() { return storageBucket; }
  public static get API_URL() { return apiUrl; }
  public static get VERSION() { return version; }
}
