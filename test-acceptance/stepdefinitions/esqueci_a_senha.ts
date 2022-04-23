import { defineSupportCode } from 'cucumber';
import { browser, $, element, by } from 'protractor';
import { getTokenSourceMapRange } from 'typescript';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

async function goToPage(page) {
  await browser.get(`http://localhost:4200/${page}`);
  if ((await browser.getCurrentUrl()) !== `http://localhost:4200/${page}`) {
    await $("svg[name='menu']").click();
    await $("a[name='signOut']").click();
    await browser.get(`http://localhost:4200/${page}`);
  }
}

defineSupportCode(function ({ Given, When, Then }) {
  //forgot-password
  Given(/^que estou na página de "([^\"]*)"$/, async (page) => {
    await goToPage(<string>page);
    await expect($(`form[name='${page}']`).isPresent()).to.eventually.equal(true);
  });

  When(
    /^eu preencho o campo de e-mail com "([^\"]*)" e clico em "([^\"]*)"$/,
    async (email, action) => {
      await $("input[name='email']").sendKeys(<string>email);
      await element(by.buttonText(<string>action)).click();
    }
  );
  
  Then(/^aparece uma mensagem de sucesso$/, async () => {
    await expect($("div[name='msg-success']").isPresent()).to.eventually.equal(true);
  });

  Then(/^eu vou para a página de login$/, async () => {
    await expect($("form[name='login']").isPresent()).to.eventually.equal(true);
  });

  //update-password
  Given(/^que estou na página de "([^\"]*)" com id "(\d*)"$/, async (page, id) => {
    var fullPage: string = `${page}?id=${id}`;
    await goToPage(fullPage);
    await expect($(`form[name='${page}']`).isPresent()).to.eventually.equal(true);
  });

  When(
    /^eu preencho os campos com "([^\"]*)" e "([^\"]*)", respectivamente, e confirmo$/,
    async (psw1, psw2) => {
      await $("input[name='psw1']").sendKeys(<string>psw1);
      await $("input[name='psw2']").sendKeys(<string>psw2);
      await element(by.buttonText('Redefinir')).click();
    }
  );

  Then(/^aparece uma mensagem de erro de "([^\"]*)"$/, async (erro) => {
    console.log(<string>erro);
    await expect($(`span[name='${erro}']`).isPresent()).to.eventually.equal(true);
  });
  
});
