import { defineSupportCode } from 'cucumber';
import { browser, $, element, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

defineSupportCode(function ({ Given, When, Then }) {
  Given(/^que estou na página de login$/, async () => {
    await browser.get(`http://localhost:4200/login`);
    if ((await browser.getCurrentUrl()) !== `http://localhost:4200/login`) {
      await $("svg[name='menu']").click();
      await $("a[name='signOut']").click();
    }
    await expect($("input[name='psw']").isPresent()).to.eventually.equal(true);
  });

  When(
    /^eu preencho os campos com e-mail "([^\"]*)" e senha "([^\"]*)"$/,
    async (email, psw) => {
      await $("input[name='email']").sendKeys(<string>email);
      await $("input[name='psw']").sendKeys(<string>psw);
      await element(by.buttonText('Entrar')).click();
    }
  );

  Then(/^eu vou para a página de Home do sistema$/, async () => {
    await expect($("div[name='home']").isPresent()).to.eventually.equal(true);
  });

  Then(/^aparece uma mensagem de falha no login$/, async () => {
    await expect($("div[name='errorMsg']").isPresent()).to.eventually.equal(
      true
    );
  });
});
