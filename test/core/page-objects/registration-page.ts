import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";


import { readFileSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class RegPage extends BasePage {

    private click_button = By.xpath("/html/body/main/section[7]/div/div/form/button");


    //REGISTER
    private username = By.xpath("/html/body/main/section[7]/div/div/form/div[1]/input");
    private email = By.xpath("/html/body/main/section[7]/div/div/form/div[2]/input");
    private password = By.xpath("/html/body/main/section[7]/div/div/form/div[3]/input");
    private confPassword = By.xpath("/html/body/main/section[7]/div/div/form/div[4]/input");

 
  


    async fillusername(){
        await this.waitAndClick(this.username,100000)
        await this.fillInputField(this.username,testData.registrationInfo.username)
    }
    async fillemail(){
        await this.waitAndClick(this.email,100000)

        await this.fillInputField(this.email,testData.registrationInfo.email)
    }
    async fillpass(){
        await this.waitAndClick(this.password,100000)
        await this.fillInputField(this.password,testData.registrationInfo.password)
        await this.fillInputField(this.confPassword,testData.registrationInfo.password)
    }
    async register(){
        await this.waitAndClick(this.click_button,10000);
        await this.driver.sleep(8000);

    }


    constructor(driver: WebDriver) {
        super(driver);
    }
   

}