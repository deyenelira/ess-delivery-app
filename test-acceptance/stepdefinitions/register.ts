import { defineSupportCode } from 'cucumber';
import { browser, $, element, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;


let _password = '';
let _email = '';

async function goTo(page: string) {
    await browser.driver.get(`http://localhost:4200/${page}`);
  }

async function deleteUser() {

    
    await browser.post(`http://localhost:4200/client/login`).send( {email : _email, password: _password});
    await goTo('profile');
    await $("a[name='deleteAccount']").click();
    await browser.waitForAngular();
    await $("input[name='psw']").sendKeys(_password);
    await $("button[name='confirmar']").click();
    await expect($("form[name='login']").isPresent()).to.eventually.equal(true);
  }


defineSupportCode(function ({ Given, When, Then }) {

    Given(/^estou na página de cadastro de cliente$/, async () => {
        await browser.get(`http://localhost:4200/register`);
        if ((await browser.getCurrentUrl()) !== `http://localhost:4200/register`) {
          await $("svg[name='menu']").click();
          await $("a[name='signOut']").click();
          await $("a[name='cadastro_button']").click();
        }
        await expect($("input[name='name']").isPresent()).to.eventually.equal(true);
      });

      Given(/^estou na página de confirmar codigo de telefone e preenchi os campos anteriores com nome "([^\"]*)", cpf "([^\"]*)", telefone "([^\"]*)", email "([^\"]*)" e senha "([^\"]*)"$/, 
      async (name, cpf, phone, email, psw) => {
        await browser.get(`http://localhost:4200/register`);
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
        //await deleteUser();
      });

      Then(/^aparece a tela para confirmar codigo de telefone$/, async () => {
        await expect($("input[name='code']").isPresent()).to.eventually.equal(true);
        //await deleteUser()
      });

      Then(/^aparece a tela para confirmar codigo de telefone e digito o codigo "([^\"]*)"$/, async (code) => {
        await expect($("input[name='code']").isPresent()).to.eventually.equal(true);
        await $("input[name='code']").sendKeys(<string>code);
        await expect($("div[name='home']").isPresent()).to.eventually.equal(true);
        //await deleteUser()
      });

      Then(/^eu permaneço na mesma página de cadastro e não consigo seguir para a tela de confirmação de codigo.$/, async () => {
        await expect($("input[name='code']").isPresent()).to.eventually.equal(false);
      });

      Then(/^permaneço tela para confirmar codigo de telefone$/, async () => {
        await expect($("input[name='code']").isPresent()).to.eventually.equal(true);
      });


      
    



});
