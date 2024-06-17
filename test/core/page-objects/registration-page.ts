import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";


import { readFileSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class RegPage extends BasePage {

    private username=By.xpath("//input[@name='ctl00$ctl00$cp1$rp$cp1$Register1$txtBenutzername']")
    private pass=By.xpath("//input[@name='ctl00$ctl00$cp1$rp$cp1$Register1$txtPassword']")
    private pass2=By.xpath("//input[@name='ctl00$ctl00$cp1$rp$cp1$Register1$txtPasswordWdh']")
    private accept_button=By.xpath("//span[@id='ctl00_ctl00_cp1_rp_cp1_Register1_cbAGB_S_D']")
    private title_button=By.xpath("//input[@id='ctl00_ctl00_cp1_rp_cp1_Register1_cbAnrede_I']")
    private Mr_button=By.xpath("//td[@id='ctl00_ctl00_cp1_rp_cp1_Register1_cbAnrede_DDD_L_LBI1T0']")
    private name=By.xpath("//input[@id='ctl00_ctl00_cp1_rp_cp1_Register1_txtVorname_I']")
    private surname=By.xpath("//input[@id='ctl00_ctl00_cp1_rp_cp1_Register1_txtNachname_I']")

    private adress=By.xpath("//input[@id='ctl00_ctl00_cp1_rp_cp1_Register1_txtStrasse_I']")
    private zipcode=By.xpath("//input[@id='ctl00_ctl00_cp1_rp_cp1_Register1_txtPLZ_I']")
    private city=By.xpath("//input[@id='ctl00_ctl00_cp1_rp_cp1_Register1_txtOrt_I']")
    private email=By.xpath("//input[@id='ctl00_ctl00_cp1_rp_cp1_Register1_txtEmail_I']")
    private email2=By.xpath("//input[@id='ctl00_ctl00_cp1_rp_cp1_Register1_txtEmailConfirm_I']")

    private date=By.xpath("//input[@id='ctl00_ctl00_cp1_rp_cp1_Register1_deGeburtstag_I']")
    private phone=By.xpath("//input[@id='ctl00_ctl00_cp1_rp_cp1_Register1_txtPhone_I']")
    private mobile=By.xpath("//input[@id='ctl00_ctl00_cp1_rp_cp1_Register1_txtHandy_I']")
    private registration_button=By.xpath("//div[@id='ctl00_ctl00_cp1_rp_cp1_Register1_btnRegistrieren']")
    private checkReg=By.xpath("//span[@id='ctl00_ctl00_cp1_rp_cp1_cpRegistration_pcConfirm_lblInformationText']")
  


    async fillusername(){
        await this.waitAndClick(this.username,10000)
        await this.fillInputField(this.username,testData.registrationInfo.username)
    }
    async fillpass(){
        await this.fillInputField(this.pass,testData.registrationInfo.password)
        await this.fillInputField(this.pass2,testData.registrationInfo.password)
    }
    async accept(){
        await this.waitAndClick(this.accept_button,10000);
    }
    async title(){
        await this.waitAndClick(this.title_button,10000);
        await this.waitAndClick(this.Mr_button,10000)
    }
    async nameInput(){
        await this.fillInputField(this.name,testData.registrationInfo.name)
    }
    async surnameInput(){
        await this.fillInputField(this.surname,testData.registrationInfo.surname)
    }
    async adressInput(){
        await this.fillInputField(this.adress,testData.registrationInfo.ulicaibroj)
    }
    async zipInput(){
        await this.fillInputField(this.zipcode,testData.registrationInfo.postanski_broj)
    }
    async CityInput(){
        await this.fillInputField(this.city,testData.registrationInfo.grad)
    }
    async emailInput(){
        await this.fillInputField(this.email,testData.registrationInfo.email)
        await this.fillInputField(this.email2,testData.registrationInfo.email)
    }
    async DateInput(){
        await this.fillInputField(this.date,testData.registrationInfo.datum)
    }
    async phoneInput(){
        await this.fillInputField(this.phone,testData.registrationInfo.broj_telefona)
        await this.fillInputField(this.mobile,testData.registrationInfo.broj_telefona)
    }
    async RegButton(){
        await this.waitAndClick(this.registration_button,10000)
    }

    async checkRegistration(){
        await this.waitForElement(this.checkReg,10000)
        await this.checkMatchingElements(this.checkReg,testData.registrationInfo.reg_check)

    }

    

    
  


    



    constructor(driver: WebDriver) {
        super(driver);
    }
   

}