import { Builder, By, WebDriver } from "selenium-webdriver";
import { RegPage } from "../core/page-objects/registration-page";
import { createDriver, quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";



const dataFilePath = path.resolve(__dirname, "../core/data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));


let driver: WebDriver;
let homePage: RegPage;


beforeAll(async () => {
    driver = await createDriver(testData.url.registracija);
    homePage = new RegPage(driver);
},300000);


test("add name of your test here", async () => {
    await homePage.fillusername();
    await homePage.fillemail();
    await homePage.fillpass();
    await homePage.register();
},1000000);


afterAll(async () => {
    await quitDriver(driver);
},10000);
