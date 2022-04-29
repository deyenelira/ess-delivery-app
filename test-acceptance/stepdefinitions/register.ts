import { defineSupportCode } from 'cucumber';
import { browser, $, element, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let local_password = '';
let local_email = '';

async function goTo(page: string) {
  await browser.driver.get(`http://localhost:4200/${page}`);
}

async function login() {
        await browser.driver.get(`http://localhost:4200/login`);
        await expect($("form[name='login']").isPresent()).to.eventually.equal(true);
        await $("input[name='email']").sendKeys(<string>local_email);
        await $("input[name='psw']").sendKeys(<string>local_password);
        await $("button[name='butao']").click();
        await browser.waitForAngular();
}

async function deleteUser() {
    await browser.driver.get(`http://localhost:4200/profile`);
    console.log(await browser.getCurrentUrl());
    await $("a[name='deleteAccount']").click();
    await browser.waitForAngular();
    await $("input[name='psw']").sendKeys(local_password);
    await $("button[name='confirmar']").click();
    await expect($("form[name='login']").isPresent()).to.eventually.equal(true);
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

    Given(/^estou na página de cadastro de cliente$/, async () => {
        await goTo('register');
        if ((await browser.getCurrentUrl()) !== `http://localhost:4200/register`) {
          await $("svg[name='menu']").click();
          await $("a[name='signOut']").click();
          await $("a[name='cadastro_button']").click();
        }
        await expect($("input[name='name']").isPresent()).to.eventually.equal(true);
      });

      Given(/^estou na página de confirmar codigo de telefone e preenchi os campos anteriores com nome "([^\"]*)", cpf "([^\"]*)", telefone "([^\"]*)", email "([^\"]*)" e senha "([^\"]*)"$/, 
      async (name, cpf, phone, email, psw) => {
        await browser.driver.get(`http://localhost:4200/register`);
        if ((await browser.getCurrentUrl()) !== `http://localhost:4200/register`) {
          await $("svg[name='menu']").click();
          await $("a[name='signOut']").click();
          await $("a[name='cadastro_button']").click();
        }
        await expect($("input[name='name']").isPresent()).to.eventually.equal(true);
        await $("input[name='name']").sendKeys(<string>name);
          await $("input[name='cpf']").sendKeys(<string>cpf);
          await $("input[name='phone']").sendKeys(<string>phone);
          await $("input[name='email']").sendKeys(<string>email);
          await $("input[name='password']").sendKeys(<string>psw);
          await $("input[name='confirm_password']").sendKeys(<string>psw);
          await element(by.buttonText('Continuar')).click();
          local_email = <string>email;
          local_password = <string>psw;
      });

      When(
        /^eu preencho os campos com nome "([^\"]*)", cpf "([^\"]*)", telefone "([^\"]*)", email "([^\"]*)" e senha "([^\"]*)"$/,
        async (name, cpf, phone, email, psw) => {
          await $("input[name='name']").sendKeys(<string>name);
          await $("input[name='cpf']").sendKeys(<string>cpf);
          await $("input[name='phone']").sendKeys(<string>phone);
          await $("input[name='email']").sendKeys(<string>email);
          await $("input[name='password']").sendKeys(<string>psw);
          await $("input[name='confirm_password']").sendKeys(<string>psw);
          await element(by.buttonText('Continuar')).click();
          local_email = <string>email;
          local_password = <string>psw;
        }
      );


      When(
        /^eu preencho o campo de código com "([^\"]*)"$/,
        async (code) => {
          await $("input[name='code']").sendKeys(<string>code);
          await element(by.buttonText('Continuar')).click();
          
        }
      );

      Then(/^sou levado para a pagina Home$/, async () => {
        
        await expect($("div[name='home']").isPresent()).to.eventually.equal(true);
        await deleteUser();        
      });

      Then(/^aparece a tela para confirmar codigo de telefone$/, async () => {
        await expect($("input[name='code']").isPresent()).to.eventually.equal(true);
        await login();
        await deleteUser();
        
        
      });

      Then(/^eu permaneço na mesma página de cadastro e não consigo seguir para a tela de confirmação de codigo.$/, async () => {
        await expect($("input[name='code']").isPresent()).to.eventually.equal(false);
      });

      Then(/^permaneço tela para confirmar codigo de telefone$/, async () => {
        await expect($("input[name='code']").isPresent()).to.eventually.equal(true);
        await login();
        await deleteUser();

      });

      

      Then(/^eu recebo uma mensagem de "email já registrado" e permaneço na mesma tela$/, async () => {
        await expect($("input[name='email']").isPresent()).to.eventually.equal(true);
      });

      
    



});
