import { testController } from '../support/world'
import { select } from '../support/utils'
import { ClientFunction } from 'testcafe';

const password = process.env.PASSWORD;
const dotenv = require('dotenv');

export class Login {
  constructor () {
    dotenv.config();
    this.url = process.env.URL_HOST + `login`
    this.urlHome = process.env.URL_HOST + `list`
  }

  emailImput  () {
    return select('input.LoginInput:nth-child(1)')
  }

  passwordImput () {
    return select('#root > div > div > div.LeftContainer > div > form > input:nth-child(2)')
  }
  
  aidiLogoImg () {
    return select ('#root > div > div > div.RightContainer > img').exists
  }

  loginTitle () {
    return select ('#root > div > div > div.LeftContainer > div > h1').innerText
  }

  firstTextTitle () {
    return select ('#root > div > div > div.LeftContainer > div > p').innerText
  }

  versionText () {
    return select ('#root > div > h6').innerText
  }

  loginButton () {
    return select('#root > div > div > div.LeftContainer > div > form > button');
  }

  async navigate () {
    await testController.navigateTo(this.url)
  }

  async navigateHome () {
    dotenv.config();
    this.urlHome = process.env.URL_HOST + `list`;
    console.log(this.urlHome);
    const getLocation = ClientFunction(() => document.location.href).with({ boundTestRun: testController });
    await testController.expect(getLocation()).contains(this.urlHome);
  }
  async navigateHomeAndExit () {
    dotenv.config();
    this.urlHome = process.env.URL_HOST + `list`;
    console.log(this.urlHome);
    const getLocation = ClientFunction(() => document.location.href).with({ boundTestRun: testController });
    await testController
    .expect(getLocation()).contains(this.urlHome)
    .click(this.userSettingsButton())
    .click(this.logoutButton())
    .expect(getLocation()).contains(this.url);
  }

  async login () {
    await testController
      .click(this.emailImput())
      .typeText(this.emailImput(), process.env.USER, { paste: true })
      .click(this.passwordImput())
      .typeText(this.passwordImput(), process.env.PASSWORD, { paste: true })
      .click(this.loginButton())
  }

  async loginTEST () {
    await testController
      .click(this.emailImput())
      .typeText(this.emailImput(), "email@test.com")
  }

  async loginValidate () {
    const loginTitle = this.loginTitle();
    const aidiLogoImg = this.aidiLogoImg();
    const firstTextTitle = this.firstTextTitle();
    const versionText = this.versionText();

    await testController
      .click(this.emailImput())
      .typeText(this.emailImput(), "test")
      .expect(aidiLogoImg).ok('El logo de AIDI se visualiza', { allowUnawaitedPromise: false })
      .expect(loginTitle).eql("Emisor de Credenciales Web")
      .expect(firstTextTitle).eql("BIENVENIDO AL")
      .expect(versionText).eql("vnext")
  }
}
