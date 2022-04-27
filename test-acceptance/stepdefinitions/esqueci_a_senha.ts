import { defineSupportCode } from 'cucumber';
import { browser, $, element, by } from 'protractor';
import { getTokenSourceMapRange } from 'typescript';
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
  await $("input[name='cpf']").sendKeys('12345678912');
  await $("input[name='phone']").sendKeys('81911119999');
  await $("input[name='email']").sendKeys(<string>email);
  await $("input[name='password']").sendKeys(<string>psw);
  await $("input[name='confirm_password']").sendKeys(<string>psw);
  await $("button[name='continuar-register']").click();

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

  testEmail = '';
  testPassword = '';
}

async function logOut() {
  await $("svg[name='menu']").click();
  await $("a[name='signOut']").click();
}

function rightPsw(psw1: string, psw2: string) {
  return psw1 === psw2 && psw1.length >= 8 && /\d/.test(psw1) && /[A-Z]/.test(psw1);
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

  //forgot-password
  Given(
    /^existe um usuário cadastrado com email "([^\"]*)" e senha "([^\"]*)"$/,
    async (email, psw) => {
      testEmail = <string>email;
      testPassword = <string>psw;
      await createUser(<string>email, <string>psw);
    }
  );

  Given(/^que estou na página de "([^\"]*)"$/, async (page) => {
    await goTo(<string>page);
    await expect($(`form[name='${page}']`).isPresent()).to.eventually.equal(true);
  });

  When(
    /^eu preencho o campo de email com "([^\"]*)" e clico em "([^\"]*)"$/,
    async (email, action) => {
      await $("input[name='email']").sendKeys(<string>email);
      await element(by.buttonText(<string>action)).click();
    }
  );
  
  Then(/^aparece uma mensagem de sucesso$/, async () => {
    await expect($("div[name='msg-success']").isPresent()).to.eventually.equal(true);

    await login();
    await deleteUser();
  });

  Then(/^eu vou para a página de login$/, async () => {
    await expect($("form[name='login']").isPresent()).to.eventually.equal(true);
  });

  //update-password
  Given(/^que estou na página de "([^\"]*)" com email "([^\"]*)"$/, async (page, email) => {
    var fullPage: string = `${page}?email=${email}`;
    await goTo(fullPage);
    await expect($(`form[name='${page}']`).isPresent()).to.eventually.equal(true);
  });

  When(
    /^eu preencho os campos com "([^\"]*)" e "([^\"]*)", respectivamente, e confirmo$/,
    async (psw1, psw2) => {
      if (rightPsw(<string>psw1, <string>psw2)) testPassword = <string>psw1;
      await $("input[name='psw1']").sendKeys(<string>psw1);
      await $("input[name='psw2']").sendKeys(<string>psw2);
      await element(by.buttonText('Redefinir')).click();
    }
  );

  Then(/^aparece uma mensagem de erro de "([^\"]*)"$/, async (erro) => {
    await expect($(`span[name='${erro}']`).isPresent()).to.eventually.equal(true);

    if (<string>erro === "wrong-equals" || <string>erro === "wrong-format") {
      await login();
      await deleteUser();
    }
  });
  
});
