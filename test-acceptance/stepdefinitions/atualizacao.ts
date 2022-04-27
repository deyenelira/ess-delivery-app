import { defineSupportCode } from 'cucumber';
import { browser, $, element, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let currPassword = '';
let currChange = '';

async function goToPage(page) {
    await browser.get(`http://localhost:4200/${page}`);
    if ((await browser.getCurrentUrl()) !== `http://localhost:4200/${page}`) {
      await $("svg[name='menu']").click();
      await $("a[name='profile']").click();
      await browser.get(`http://localhost:4200/${page}`);
    }
  }

async function login(email, password) {
    await browser.get(`http://localhost:4200/login`);
    await expect($("form[name='login']").isPresent()).to.eventually.equal(true);
    await $("input[name='email']").sendKeys(<string>email);
    await $("input[name='psw']").sendKeys(<string>password);
    await $("button[name='butao']").click();
    await browser.waitForAngular();
}


  defineSupportCode(function ({ Given, When, Then }) {

    Given(/^estou logado com e-mail "([^\"]*)" no sistema com senha "([^\"]*)"$/, async (email, password) => {
        currPassword = <string>password;
        await login(email, currPassword);
      });
    Given(/^estou na página de perfil$/, async () => {
      await goToPage("profile");
    });

      When(
        /^Eu tento atualizar os dados do perfil$/, async () => {
          await $("a[name='editar']").click();
        }
      );

      When(
        /^Eu altero o nome de "([^\"]*)" para "([^\"]*)"$/, async (oldName, newName) => {
          currChange = <string>newName;
          var foo = element(by.id('client-name-input'));
          await(foo.clear());
          await $("input[name='client_name']").sendKeys(<string>newName);
        }
      );

      Then(/^O sistema me pede para uma autenticação por senha$/, async () => {
        await $("a[name='salvar']").click();
      });
      //Eu tenho sucesso e o perfil recarrega com o nome "Ana"
      Then(/^Eu tenho sucesso e o perfil recarrega com o nome novo$/, async () => {
        await $("input[name='senhaEditar']").sendKeys(currPassword);
        await $("button[name='confirmarAlt']").click();
        var nome = element(by.id('client-name-input'));
        await expect(nome.getAttribute('value')).to.eventually.equal(currChange);
      });    
  });