const browserStackConfig = require('./browserstack.config');

const date = new Date();
const dateForDisplay = date.toDateString();
const buildNameForDisplay = `${browserStackConfig.BUILD}: ${dateForDisplay}`;

exports.config = {
  user: browserStackConfig.BROWSERSTACK_USER,
  key: browserStackConfig.BROWSERSTACK_KEY,
  updateJob: false,
  specs: [
    './specs/readyMainTest.js',
  ],
  twitterUserName: browserStackConfig.TWITTER_USER_NAME,
  twitterPassword: browserStackConfig.TWITTER_PASSWORD,
  exclude: [],
  capabilities: [
    {
      name: 'readyMainTest: iPhone XR 12',
      build: buildNameForDisplay,
      device: 'iPhone XR',
      os_version: '12',
      app: browserStackConfig.BROWSERSTACK_IPA_URL,
      browserName: 'iPhone',
      real_mobile: true,
      acceptSslCerts: true,
      'browserstack.console': 'info',
      'browserstack.appium_version': '1.17.0',
      'browserstack.local': false,
      'browser.geoLocation': 'US',
      isAndroid: false,
      isCordovaFromAppStore: true,
      isIOS: true,
      isMobileScreenSize: true,
    },
//    {
//      name: 'readyMainTest: %device1%os1 %os_version1',
//      build: buildNameForDisplay,
//      device: '%device1',
//      os: '%os1',
//      os_version: '%os_version1',
//      app: browserStackConfig.BROWSERSTACK_IPA_URL,
//      browserName: '%browserName1',
//      browser_version: '%browser_version1',
//      real_mobile: true,
//      acceptSslCerts: true,
//      'browserstack.console': 'info',
//      'browserstack.appium_version': '%browserstack.appium_version1',
//      'browserstack.local': false,
//      'browser.geoLocation': 'US',
//      isAndroid: false,
//      isCordovaFromAppStore: true,
//      isIOS: true,
//      isMobileScreenSize: true,
//    },
//    {
//      name: 'readyMainTest: %device2%os2 %os_version2',
//      build: buildNameForDisplay,
//      device: '%device2',
//      os: '%os2',
//      os_version: '%os_version2',
//      app: browserStackConfig.BROWSERSTACK_IPA_URL,
//      browserName: '%browserName2',
//      browser_version: '%browser_version2',
//      real_mobile: true,
//      acceptSslCerts: true,
//      'browserstack.console': 'info',
//      'browserstack.appium_version': '%browserstack.appium_version2',
//      'browserstack.local': false,
//      'browser.geoLocation': 'US',
//      isAndroid: false,
//      isCordovaFromAppStore: true,
//      isIOS: true,
//      isMobileScreenSize: true,
//    },
//    {
//      name: 'readyMainTest: %device3%os3 %os_version3',
//      build: buildNameForDisplay,
//      device: '%device3',
//      os: '%os3',
//      os_version: '%os_version3',
//      app: browserStackConfig.BROWSERSTACK_IPA_URL,
//      browserName: '%browserName3',
//      browser_version: '%browser_version3',
//      real_mobile: true,
//      acceptSslCerts: true,
//      'browserstack.console': 'info',
//      'browserstack.appium_version': '%browserstack.appium_version3',
//      'browserstack.local': false,
//      'browser.geoLocation': 'US',
//      isAndroid: false,
//      isCordovaFromAppStore: true,
//      isIOS: true,
//      isMobileScreenSize: true,
//    },
//    {
//      name: 'readyMainTest: %device4%os4 %os_version4',
//      build: buildNameForDisplay,
//      device: '%device4',
//      os: '%os4',
//      os_version: '%os_version4',
//      app: browserStackConfig.BROWSERSTACK_IPA_URL,
//      browserName: '%browserName4',
//      browser_version: '%browser_version4',
//      real_mobile: true,
//      acceptSslCerts: true,
//      'browserstack.console': 'info',
//      'browserstack.appium_version': '%browserstack.appium_version4',
//      'browserstack.local': false,
//      'browser.geoLocation': 'US',
//      isAndroid: false,
//      isCordovaFromAppStore: true,
//      isIOS: true,
//      isMobileScreenSize: true,
//    },
  ],
  webviewConnectTimeout: 90000,
  baseUrl: browserStackConfig.WEB_APP_ROOT_URL,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  reporters: ['concise'],

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 360000,
  },
}
