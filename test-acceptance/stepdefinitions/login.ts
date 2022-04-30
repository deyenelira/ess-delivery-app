import { defineSupportCode } from 'cucumber';
import { browser, $, element, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let testEmail = '';
let testPassword = '';

async function goTo(page: string) {
  await browser.driver.get(`http://localhost:4200/${page}`);
}

async function createUser(email: string, psw: string) {
  await goTo('register');

  await $("input[name='name']").sendKeys('Nome teste');
  await $("input[name='cpf']").sendKeys('14219938052');
  await $("input[name='phone']").sendKeys('81999999999');
  await $("input[name='email']").sendKeys(<string>email);
  await $("input[name='password']").sendKeys(<string>psw);
  await $("input[name='confirm_password']").sendKeys(<string>psw);
  await element(by.buttonText('Continuar')).click();

  await confirmCode();
  await logOut();
}

async function login() {
  await goTo('login');
  await $("input[name='email']").sendKeys(testEmail);
  await $("input[name='psw']").sendKeys(testPassword);
  await $("button[name='butao']").click();
  await browser.waitForAngular();
}

async function confirmCode() {
  await $("input[name='code']").sendKeys('ABC123');
  await $("button[name='continuar-code']").click();
}

async function deleteUser() {
  await goTo('profile');
  await $("a[name='deleteAccount']").click();
  await browser.waitForAngular();
  await $("input[name='psw']").sendKeys(testPassword);
  await $("button[name='confirmar']").click();
  await expect($("form[name='login']").isPresent()).to.eventually.equal(true);
}

async function logOut() {
  await $("svg[name='menu']").click();
  await $("a[name='signOut']").click();
}

defineSupportCode(function ({ Given, When, Then, Before, setDefaultTimeout }) {
  setDefaultTimeout(10 * 1000);
  
  Before(async () => {
    await goTo('login');
    if ((await browser.getCurrentUrl()) !== `http://localhost:4200/login`) {
      await $("svg[name='menu']").click();
      await $("a[name='signOut']").click();
    }
  });

  Given(/^que estou na página de login$/, async () => {
    await browser.driver.get(`http://localhost:4200/login`);
    if ((await browser.getCurrentUrl()) !== `http://localhost:4200/login`) {
      await $("svg[name='menu']").click();
      await $("a[name='signOut']").click();
    }
    await expect($("input[name='psw']").isPresent()).to.eventually.equal(true);
  });

  Given(
    /^existe um usuário cadastrado com e-mail "([^\"]*)" e senha "([^\"]*)"$/,
    async (email, psw) => {
      testEmail = <string>email;
      testPassword = <string>psw;
      await createUser(<string>email, <string>psw);
    }
  );

  When(
    /^eu preencho os campos com e-mail "([^\"]*)" e senha "([^\"]*)"$/,
    async (email, psw) => {
      await $("input[name='email']").sendKeys(<string>email);
      await $("input[name='psw']").sendKeys(<string>psw);
      await $("button[name='butao']").click();
    }
  );

  When(/^eu preencho o campo de e-mail com "([^\"]*)"$/, async (email) => {
    await $("input[name='email']").sendKeys(<string>email);
    await element(by.buttonText('Entrar')).click();
  });

  When(/^eu preencho o campo de senha com "([^\"]*)"$/, async (psw) => {
    await $("input[name='psw']").sendKeys(<string>psw);
    await element(by.buttonText('Entrar')).click();
  });

  Then(/^eu vou para a página de Home do sistema$/, async () => {
    await expect($("div[name='home']").isPresent()).to.eventually.equal(true);
    await deleteUser();
  });

  Then(/^aparece uma mensagem de falha no login$/, async () => {
    await expect($("div[name='errorMsg']").isPresent()).to.eventually.equal(
      true
    );
    await login();
    await deleteUser();
  });

  Then(/^não consigo pressionar o botão de entrar$/, async () => {
    await expect(
      element(by.buttonText('Entrar')).isEnabled()
    ).to.eventually.equal(false);
  });

  Then(/^permaneço na página de login$/, async () => {
    expect($("input[name='psw']").isPresent()).to.eventually.equal(true);
  });
});
