import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";


import { readFileSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class PayPage extends BasePage {

    private click_button = By.xpath("//select[@id='odabirkinaselect']");
    private click_cinema=By.xpath("//select[@id='odabirkinaselect']//option[@value='https://www.blitz-cinestar-bh.ba/cinestar-sarajevo']")
    private title_box=By.xpath("//div[@class='title_box']//h1")

    private pcelar=By.xpath("//td[@class='naslov']//a[@href='cinestar-sarajevo/pcelar/9080/20240107']")
    private cetvrtak=By.xpath("//a[@href='https://karte3.cinestarcinemas.ba/webticketnet/performance.aspx?oid=EDAC0000023TIISAUY&coid=A0000000014AKFBLFD']")

    private plusticket=By.xpath("//img[@id='ctl00_ctl00_cp1_rp_cp1_rpTS_TicketSelector2_grdTS_cell0_1_seTicket_B-2Img']")
    private nastavi=By.xpath("//div[@id='ctl00_ctl00_cp1_rp_cp1_btnAddToShoppingCart_CD']//span[@class='dx-vam dx-nowrap']")
    
    private username=By.xpath("//input[@id='ctl00_ctl00_cp1_rp_cp1_Login2_rpLogin_UserName_I']")
    private password=By.xpath("//input[@id='ctl00_ctl00_cp1_rp_cp1_Login2_rpLogin_Password_I']")
    private prijava=By.xpath("//div[@id='ctl00_ctl00_cp1_rp_cp1_Login2_rpLogin_LoginButton']")

    private kupi=By.xpath("//div[@id='ctl00_ctl00_cp1_rp_cp1_btnCheckout2']")
    private creditcard=By.xpath("//li[@id='ctl00_ctl00_cp1_rp_cp1_rp1_mnuPayment_DXI1_']")
    private prihvatam=By.xpath("//span[@id='ctl00_ctl00_cp1_rp_cp1_rp1_cbAGB_S_D']")

    private inputCreditCard=By.xpath("//input[@placeholder='XXXX XXXX XXXX XXXX']")
    private month=By.xpath("//input[@id='modal_month']")
    private year=By.xpath("//input[@id='modal_year']")
    private cvc=By.xpath("//input[@id='field_cvv']")
    private inputName=By.xpath("//div[@class='user-block col-sm-6']//div[@class='input-group']//input[@id='cardholder_name']")
    private inputSurname=By.xpath("//div[@class='user-block col-sm-6']//div[@class='input-group']//input[@placeholder='Last name']")
    private inputEmail=By.xpath("//div[@class='user-block col-sm-6']//div[@class='input-group']//input[@id='cardholder_email']")
    private inputAddress=By.xpath("//div[@class='user-block col-sm-6']//div[@class='input-group']//input[@name='cardholder_address']")
    private inputCity=By.xpath("//div[@class='user-block col-sm-6']//div[@class='input-group']//input[@name='cardholder_city']")
    private inputZip=By.xpath("//div[@class='user-block col-sm-6']//div[@class='input-group']//input[@name='cardholder_zip_code']")
    private inputCountry=By.xpath("//div[@class='user-block col-sm-6']//div[@class='input-group']//input[@name='cardholder_country']")
    private potvrdi=By.xpath("//button[@type='submit']")
    
    constructor(driver: WebDriver) {
        super(driver);
    }

    async clickDropMenu(){
        await this.waitAndClick(this.click_button, 10000)
    }
    async clickCinema(){
        await this.waitAndClick(this.click_cinema, 10000)
    }
    async checkCinema(){
        await this.checkMatchingElements(this.title_box,testData.credentials.name)
    }
    async clickPcelar(){
        await this.waitAndClick(this.pcelar, 10000)
    }
    async clickCetvrtak(){
        await this.scrollSto()
        //await this.waitAndClick(this.cetvrtak, 10000)
        await this.navigatee(testData.url.kupovina)
    }
    async clickPlusTicket(){
        await this.waitAndClick(this.plusticket, 20000)
    }
    async clickNastavi(){
        await this.waitForElement(this.nastavi, 20000)
        await this.scrollSto2()
        await this.sleep()
        await this.findElementAndClick(this.nastavi)
    }
    async fillUsername(){
        await this.waitForElement(this.username, 10000)
        await this.fillInputField(this.username, testData.data.Username)
    }
    async fillPassword(){
        await this.waitForElement(this.password, 10000)
        await this.fillInputField(this.password, testData.data.Password)
    }
    async clickPrijava(){
        await this.findElementAndClick(this.prijava)
    }
    async clickKupi(){
        await this.sleep()
        await this.waitForElement(this.kupi, 10000)
        await this.findElementAndClick(this.kupi)
    }
    async clickCreditCard(){
        await this.waitAndClick(this.prihvatam, 10000)
        await this.findElementAndClick(this.creditcard)
    }

    async fillInputCreditCard(){
        await this.sleep()
        await this.waitForElement(this.inputCreditCard, 10000)
        await this.fillInputField(this.inputCreditCard, testData.credit_card.broj_kartice)
    }
    async fillMonth(){
        await this.fillInputField(this.month, testData.credit_card.mjesec)
    }
    async fillYear(){
        await this.fillInputField(this.year, testData.credit_card.godina)
    }
    async fillCvc(){
        await this.fillInputField(this.cvc, testData.credit_card.sigurnosni_kod)
    }
    async fillInputName(){
        await this.fillInputField(this.inputName, testData.credit_card.ime)
    }
    async fillInputSurname(){
        await this.fillInputField(this.inputSurname, testData.credit_card.prezime)
    }
    async fillInputEmail(){
        await this.fillInputField(this.inputEmail, testData.credit_card.email)
    }
    async fillInputAddress(){
        await this.fillInputField(this.inputAddress, testData.credit_card.adresa)
    }
    async fillInputCity(){
        await this.fillInputField(this.inputCity, testData.credit_card.grad)
    }
    async fillInputZip(){
        await this.fillInputField(this.inputZip, testData.credit_card.postanski_broj)
    }
    async fillInputCountry(){
        await this.fillInputField(this.inputCountry, testData.credit_card.drzava)
    }
    async clickPotvrdi(){
        await this.isClickable(this.potvrdi)
        await this.findElementAndClick(this.potvrdi)
    }

    
}