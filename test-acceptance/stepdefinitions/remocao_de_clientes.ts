import { defineSupportCode } from 'cucumber';
import { browser, $, element, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let testEmail = '';
let testPassword = '';

async function goTo(page: string) {
  await browser.driver.get(`http://localhost:4200/${page}`);
}

async function confirmCode() {
  await $("input[name='code']").sendKeys('ABC123');
  await $("button[name='continuar-code']").click();
}

async function logOut() {
  await $("svg[name='menu']").click();
  await $("a[name='signOut']").click();
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

defineSupportCode(function ({ Given, When, Then }) {
  Given(/^eu estou logada no usuário com email "([^\"]*)" e senha "([^\"]*)"$/, 
  async (email, psw) => {
    if(testEmail !== email){
      testEmail = <string>email;
      testPassword = <string>psw;
      await createUser(<string>email, <string>psw);
    }
    await goTo('login');
    if ((await browser.getCurrentUrl()) !== `http://localhost:4200/login`) {
      await $("svg[name='menu']").click();
      await $("a[name='signOut']").click();
    }
    await expect($("input[name='psw']").isPresent()).to.eventually.equal(true);
    browser.waitForAngular();
    await $("input[name='email']").sendKeys(testEmail);
    await $("input[name='psw']").sendKeys(testPassword);
    await $("button[name='butao']").click();
  });

  Given(/^estou na página de perfil do usuário$/, async () => {
    await goTo('profile');
    if((await browser.getCurrentUrl()) !== `http://localhost:4200/profile`){
      await $("svg[name='menu']").click();
      await $("a[name='profile']").click();
    }
  });

  Given(/^possuo um pedido em andamento$/, async () => {
    if (await $("input[name='check-orders']").getAttribute('checked') !== 'true'){
      await $("a[name='changeData']").click();
      await $("input[name='check-orders']").click();
      await $("a[name='saveData']").click();
      await $("input[name='psw-confirm']").sendKeys(testPassword);
      await $("button[name='confirm-psw']").click();
      await expect($("input[name='check-orders']").getAttribute('checked')).to.eventually.equal('true');
    }
  });

  Given(/^não possuo pedido em andamento$/, async () => {
    if (await $("input[name='check-orders']").getAttribute('checked') === 'true'){
      await $("a[name='changeData']").click();
      await $("input[name='check-orders']").click();
      await $("a[name='saveData']").click();
      await $("input[name='psw-confirm']").sendKeys(testPassword);
      await $("button[name='confirm-psw']").click();
      await expect($("input[name='check-orders']").getAttribute('checked')).to.eventually.equal(null);
    }
  });

  When(
    /^eu clico na opção de remover conta$/,
    async () => {
      await $("a[name='deleteAccount']").click();
    }
  );

  When(
    /^coloco minha senha para confirmação da remoção$/,
    async () => {
      expect($("div[name='deleteModal']").isDisplayed()).to.eventually.equal(true);
      await browser.waitForAngular();
      await $("input[name='psw']").sendKeys(testPassword);
    }
  );

  When(
    /^confirmo$/,
    async () => {
        await expect($("button[name='confirmar']").isDisplayed()).to.eventually.equal(true);
        await $("button[name='confirmar']").click();
    }
  );

  When(
    /^cancelo$/,
    async () => {
        await expect($("button[name='cancelar']").isDisplayed()).to.eventually.equal(true);
        await $("button[name='cancelar']").click();
    }
  );

  When(
    /^coloco minha senha incorretamente para confirmação da remoção$/,
    async () => {
      expect($("div[name='deleteModal']").isDisplayed()).to.eventually.equal(true);
      await browser.waitForAngular();
      await $("input[name='psw']").sendKeys(('not'+testPassword));
    }
  );

  Then(
    /^eu sou levada para a página de login$/,
    async () => {
        await expect($("form[name='login']").isPresent()).to.eventually.equal(true);
    }
  );

  Then(
    /^eu continuo na página de perfil do usuário$/,
    async () => {
        await expect($("div[name='profile']").isPresent()).to.eventually.equal(true);
    }
  );

  Then(
    /^eu vejo uma notificação de erro$/,
    async () => {
      await expect($("div[name='erro-order']").isPresent()).to.eventually.equal(true);
    }
  );

  Then(
    /^eu vejo uma notificação de erro de senha$/,
    async () => {
      await expect($("div[name='erro-psw']").isPresent()).to.eventually.equal(true);
    }
  );
});