import { defineSupportCode } from 'cucumber';
import { browser, $, element, by } from 'protractor';
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



  });