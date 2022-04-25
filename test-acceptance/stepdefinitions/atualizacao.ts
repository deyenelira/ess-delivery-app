import { defineSupportCode } from 'cucumber';
import { browser, $, element, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

var currPassword = '';
var currChange = '';
var currName = '';

async function goToPage(page) {
    await browser.get(`http://localhost:4200/${page}`);
    if ((await browser.getCurrentUrl()) !== `http://localhost:4200/${page}`) {
      await $("svg[name='menu']").click();
      await $("a[name='profile']").click();
      await browser.get(`http://localhost:4200/${page}`);
    }
  }

async function checkName(name){
  
}




  defineSupportCode(function ({ Given, When, Then }) {
    
    Given(/^Estou na página de perfil$/, async () => {
        await goToPage("profile");
      });

    Given(/^estou logado como "([^\"]*)" no sistema com senha "([^\"]*)"$/, async (name, password) => {
        currPassword = <string>password;
        currName = <string>name;
        await checkName(currName);
      });


  });