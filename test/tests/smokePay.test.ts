import { Builder, By, WebDriver } from "selenium-webdriver";
import { PayPage } from "../core/page-objects/pay-page";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";



const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));


let driver: WebDriver;
let homePage: PayPage;


beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);
    homePage = new PayPage(driver);
},300000);


test("Paying", async () => {
    await homePage.clickDropMenu();
    await homePage.clickCinema();
    await homePage.checkCinema();
    await homePage.clickPcelar();
    await homePage.clickCetvrtak();
    await homePage.clickPlusTicket();
    await homePage.clickNastavi();
    await homePage.fillUsername();
    await homePage.fillPassword();
    await homePage.clickPrijava();
    await homePage.clickKupi();
    await homePage.clickCreditCard();
    await homePage.fillInputCreditCard();
    await homePage.fillMonth();
    await homePage.fillYear();
    await homePage.fillCvc();
    await homePage.fillInputName();
    await homePage.fillInputSurname();
    await homePage.fillInputAddress();
    await homePage.fillInputCity();
    await homePage.fillInputZip();
    await homePage.fillInputCountry();
    await homePage.clickPotvrdi();
},100000);


afterAll(async () => {
    await quitDriver(driver);
},10000);
