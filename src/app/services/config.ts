const apiKey = "AIzaSyBRBI7YL63c3n4x1zRvButCn8mBg2cNEMM";
const authDomain = "the-wall-of-quotes.firebaseapp.com";
const databaseURL = "https://the-wall-of-quotes.firebaseio.com";
const storageBucket = "the-wall-of-quotes.appspot.com";
const messagingSenderId = "942256978505";
const apiUrl = 'https://the-wall-of-quotes-api.herokuapp.com/';

export class ConstantService {
  public static get API_KEY() { return apiKey; }
  public static get AUTH_DOMAIN() { return authDomain; }
  public static get DB() { return databaseURL; }
  public static get BUCKET() { return storageBucket; }
  public static get SENDER_ID() { return messagingSenderId; }
  public static get API_URL() { return apiUrl; }
}
