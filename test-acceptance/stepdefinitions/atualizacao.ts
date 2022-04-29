import { defineSupportCode } from 'cucumber';
import { browser, $, element, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let currPassword = '';
let currChange = '';
let metodoPagNew = '';

async function goToPage(page) {
    await browser.get(`http://localhost:4200/${page}`);
    if ((await browser.getCurrentUrl()) !== `http://localhost:4200/${page}`) {
      await $("svg[name='menu']").click();
      await $("a[name='profile']").click();
      await browser.get(`http://localhost:4200/${page}`);
    }
  }

async function goTo(page: string) {
    await browser.driver.get(`http://localhost:4200/${page}`);
  }

async function login(email, password) {
    await browser.get(`http://localhost:4200/login`);
    await expect($("form[name='login']").isPresent()).to.eventually.equal(true);
    await $("input[name='email']").sendKeys(<string>email);
    await $("input[name='psw']").sendKeys(<string>password);
    await $("button[name='butao']").click();
    await browser.waitForAngular();
}


  defineSupportCode(function ({ Given, When, Then, Before,setDefaultTimeout }) {

    setDefaultTimeout(10 * 1000);
    
    Before(async () => {
      await goTo('login');
      if ((await browser.getCurrentUrl()) !== `http://localhost:4200/login`) {
        await $("svg[name='menu']").click();
        await $("a[name='signOut']").click();
      }
    });

    Given(/^estou logado com e-mail "([^\"]*)" no sistema com senha "([^\"]*)"$/, async (email, password) => {
        currPassword = <string>password;
        await browser.waitForAngularEnabled(false);
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
        /^Eu altero o "([^\"]*)" de "([^\"]*)" para "([^\"]*)"$/, async (field, oldValue, newValue) => {
          currChange = <string>newValue;
          
          if(<string>field == "nome"){
            var foo = element(by.id('client-name-input'));
            await(foo.clear());
            await $("input[name='client_name']").sendKeys(<string>currChange);
          }
          else if(<string>field == "email"){
            var foo = element(by.id('client-email-input'));
            await(foo.clear());
            await $("input[name='client_email']").sendKeys(<string>currChange);
          }
          else if(<string>field == "telefone"){
            var foo = element(by.id('client-phone-input'));
            await(foo.clear());
            await $("input[name='client_phone']").sendKeys(<string>currChange);
          }
          else if(<string>field == "método de pagamento"){
            await $("select[id='menuPags']").click();
            if (<string>newValue == "dinheiro"){
              await $("option[id='money']").click();
              metodoPagNew = 'money';
            }
            else if (<string>newValue == "cartão de crédito"){
              await $("option[id='credit']").click();
              metodoPagNew = 'credit';
            }
            else if (<string>newValue == "cartão de débito"){
              await $("option[id='debit']").click();
              metodoPagNew = 'debit';
            }
          }
      });

      Then(/^O sistema me pede para uma autenticação por senha$/, async () => {
        await $("a[name='salvar']").click();
      });

      //Eu tenho sucesso e o perfil recarrega com o nome "Ana"
      Then(/^Eu tenho sucesso e o perfil recarrega com o "([^\"]*)" novo$/, async (fieldName) => {
        await $("input[name='senhaEditar']").sendKeys(currPassword);
        await $("button[name='confirmarAlt']").click();
        if(<string>fieldName == "nome"){
          var nome = element(by.id('client-name-input'));
          await expect(nome.getAttribute('value')).to.eventually.equal(currChange);
        }
        if(<string>fieldName == "email"){
          var email = element(by.id('client-email-input'));
          await expect(email.getAttribute('value')).to.eventually.equal(currChange);
        }

        if(<string>fieldName == "telefone"){
          var phone = element(by.id('client-phone-input'));
          await expect(phone.getAttribute('value')).to.eventually.equal(currChange);
        }

        if(<string>fieldName == "método de pagamento"){
          var payMethod = element((by.id(metodoPagNew)));
          await expect(payMethod.isDisplayed()).to.eventually.equal(true);
        }
      });
      
      Then(/^Eu não tenho sucesso e permaneço na mesma página$/, async () => {
        await $("input[name='senhaEditar']").sendKeys("aninha123");
        await $("button[name='confirmarAlt']").click();
        var msgErro = element(by.id('erroSenha1'));
        await expect(msgErro.isDisplayed()).to.eventually.equal(true);
      });

      Then(/^Aparece uma mensagem de erro no "([^\"]*)" digitado e não é possivel salvar$/, async (currentField) => {
        await $("a[name='salvar']").click();
        var campoAtual = <string>currentField+"Err"
        var msgErro = element(by.id(campoAtual));
        await expect(msgErro.isDisplayed()).to.eventually.equal(true);
      });


  });