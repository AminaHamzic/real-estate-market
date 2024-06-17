import { Builder, By, WebDriver } from "selenium-webdriver";
import { HomePage } from "../core/page-objects/home-page";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";



const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));


let driver: WebDriver;
let homePage: HomePage;


beforeAll(async () => {
    driver = await createDriver(testData.url.home_page);
    homePage = new HomePage(driver);
},300000);


test("add name of your test here", async () => {
    await homePage.clickNewsletter();
    await homePage.fillNewsletterName();
    await homePage.fillNewsletterSurname();
    await homePage.fillNewsletterEmail();
    await homePage.clickNewsletterMan();
    await homePage.clickNewsletterDa();
    /*treba se rucno uraditi jer drugacije nece
    await homePage.clickNewsletterCapthcha();*/
    await homePage.clickNewsletterPosalji();

    
},1000000);


afterAll(async () => {
    await quitDriver(driver);
},10000);