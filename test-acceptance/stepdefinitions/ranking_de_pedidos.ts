import { defineSupportCode } from 'cucumber';
import { browser, $, element, by } from 'protractor';
import { addSyntheticTrailingComment } from 'typescript';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let testEmail = 'mrbg@cin.ufpe.br';
let testPassword = 'mAtios123';
let monthNames: string[] = ['Janeiro', 'Fevereiro', 'Março', 'Abril',
'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
'Outubro', 'Novembro', 'Dezembro'];

async function goTo(page: string) {
  await browser.driver.get(`http://localhost:4200/${page}`);
}

async function createUser() {
  await goTo('register');

  await $("input[name='name']").sendKeys('Nome teste');
  await $("input[name='cpf']").sendKeys('14219938052');
  await $("input[name='phone']").sendKeys('81999999999');
  await $("input[name='email']").sendKeys(testEmail);
  await $("input[name='password']").sendKeys(testPassword);
  await $("input[name='confirm_password']").sendKeys(testPassword);
  await element(by.buttonText('Continuar')).click();

  await confirmCode();
}

async function addItem(qt: string, item: string, price:string) {

  await $("input[id='items-qt-input']").sendKeys(qt)
  await $("input[id='items-description-input']").sendKeys(item)
  await $("input[id='items-price-input']").sendKeys(price)
  await $("button[id='register-item']").click();

}

async function createOrder(filter: string, restaurant: string) {

  await $("input[id='restaurant-Name-input']").sendKeys(restaurant)

  if(filter in monthNames){
    let date = new Date(filter);
    let data =`${date.getFullYear()}-${(date.getMonth() + 1)}-01}`
    await $("input[id='created-At-input']").sendKeys(data);
  }
  else{
    let date = new Date()
    let data =`${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`
    await $("input[id='created-At-input']").sendKeys(data);
  }
  await $("button[id='register-order']").click();
}

async function deleteOrders() {
  await goTo('add-order');

  await $("button[id='delete-all']").click();
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

defineSupportCode(function ({ Given, When, Then }) {
  
  Given(/^eu sou cliente$/, async () => {
    await browser.driver.get(`http://localhost:4200/login`);
    if ((await browser.getCurrentUrl()) !== `http://localhost:4200/login`) {
      await $("svg[name='menu']").click();
      await $("a[name='signOut']").click();
    }
    await expect($("input[name='psw']").isPresent()).to.eventually.equal(true);
    await createUser()
  });


  Given(/^eu não comprei nada no periodo$/, async () => {/* Não faz nada*/ });

  Given(/^eu comprei no periodo de "([^\"]*)" exatamente "([^\"]*)" "([^\"]*)" e "([^\"]*)" "([^\"]*)" que custam "([^\"]*)" e "([^\"]*)" reais cada do restaurante "([^\"]*)"$/, async (filter, qt1, item1, qt2, item2, price1, price2, restaurant) => {
    await goTo('add-order');
    await addItem(<string>qt1,<string>item1,<string>price1);
    await addItem(<string>qt2,<string>item2,<string>price2);
    await createOrder(<string>filter,<string>restaurant);
  });

  Given(/^eu comprei no periodo de "([^\"]*)" exatamente "([^\"]*)" "([^\"]*)" que custam "([^\"]*)" reais cada do restaurante "([^\"]*)"$/, async (filter, qt, item, price, restaurant) => {
    await goTo('add-order');
    await addItem(<string>qt,<string>item,<string>price);
    await createOrder(<string>filter,<string>restaurant);
  });

  When(
    /^eu checo a página "expenses"$/, async () => {
    await goTo('expenses');
  });

  Then(/^aparece uma mensagem dizendo que nada foi comprado aquele periodo$/, async () => {
    await expect($("div[name='semPedidos']").isPresent()).to.eventually.equal(true);
    await deleteUser();
  });

  Then(/^o custo total apresentado é "([^\"]*)"$/, async (custo) => {
    await expect($("div[name='total']").isPresent()).to.eventually.equal(true);
    await expect($("h2[name='custo']").getText()).to.eventually.equal(custo);
    await deleteOrders();
    await deleteUser();
  });

  Then(/^o destaque de comida mais pedida indica "([^\"]*)"$/, async (most_ordered) => {
    await expect($("div[name='graficos']").isPresent()).to.eventually.equal(true);
    await expect($("h1[name='most_requested_food']").getText()).to.eventually.equal(most_ordered);
  });

  Then(/^o destaque de comida em que eu mais gastei indica "([^\"]*)"$/,  async (most_expensive) => {
    await expect($("div[name='graficos']").isPresent()).to.eventually.equal(true);
    await expect($("h1[name='most_expensive_food']").getText()).to.eventually.equal(most_expensive);
  });

  Then(/^o destaque de restaurante mais pedido indica "([^\"]*)"$/, async (most_ordered) => {
    await expect($("div[name='graficos']").isPresent()).to.eventually.equal(true);
    await expect($("h1[name='most_requested_restaurant']").getText()).to.eventually.equal(most_ordered);
  });

  Then(/^o destaque de restaurante onde eu mais gastei indica "([^\"]*)"$/, async (most_expensive) => {
    await expect($("div[name='graficos']").isPresent()).to.eventually.equal(true);
    await expect($("h1[name='most_expensive_restaurant']").getText()).to.eventually.equal(most_expensive);
  });

});
