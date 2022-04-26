import { defineSupportCode } from 'cucumber';
import { browser, $, element, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let testEmail = 'alas3@cin.ufpe.br';
let testPassword = 'aninhA123';

async function goTo(page: string) {
  await browser.driver.get(`http://localhost:4200/${page}`);
}

defineSupportCode(function ({ Given, When, Then }) {
  Given(/^estou logada com o usuário dls6@cin.ufpe.br com senha 123123$/, async () => {
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

  When(
    /^clico em Acessar histórico de pedidos$/,
    async () => {
      goTo('history');
      browser.waitForAngular();
    }
  );

  When(
    /^seleciono uma data específica$/,
    async () => {
      expect($("input[name='calendar']").isPresent()).to.eventually.equal(true);
      await $("input[name='calendar']").click();
      await element(by.cssContainingText('.mat-calendar-body-today', 'APR')).click();   
      await expect($("div[name='week']").isDisplayed()).to.eventually.equal(true)
      await expect($("button[name='0']").isDisplayed()).to.eventually.equal(true);
      await $("button[name='0']").click();
    }
  );

  When(
    /^clico em Acessar histórico de pedidos e seleciono um mês específico$/,
    async () => {
      goTo('history');
      browser.waitForAngular();
      expect($("input[name='calendar']").isPresent()).to.eventually.equal(true);
      await $("input[name='calendar']").click();
      await element(by.cssContainingText('.mat-calendar-body-today', 'APR')).click();   
      await expect($("div[name='week']").isDisplayed()).to.eventually.equal(true)
      await expect($("button[name='0']").isDisplayed()).to.eventually.equal(true);
    }
  );

  When(
    /^clico em um pedido$/,
    async () => {
     await $("button[name='0']").click();
    }
  );

  When(
    /^clico para ir para a próxima página$/,
    async () => {
     await $("button[name='nextPage']").click();
    }
  );

  Then(
    /^são exibidas informações detalhadas sobre o pedido$/,
    async () => {
     expect($("div[name='orderDetails']").isPresent()).to.eventually.equal(true);
    }
  );

  Then(
    /^é exibido uma mensagem informando que não há pedidos naquele período$/,
    async () => {
     expect($("div[name='no-orders']").isPresent()).to.eventually.equal(true);
    }
  );

  Then(
    /^é exibido na tela todos os pedidos que fiz na semana recorrente de forma paginada$/,
    async () => {
      expect($("div[name='container']").isPresent()).to.eventually.equal(true);
    }
  );

  Then(
    /^é exibido na tela todos os pedidos que fiz no mês de forma paginada$/,
    async () => {
      expect($("div[name='container']").isPresent()).to.eventually.equal(true);
    }
  );
});