import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";


import { readFileSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class HomePage extends BasePage {

    private login_button = By.xpath("/html/body/nav/div/div/ul/li[6]/a");
    private email=By.xpath("/html/body/main/section[5]/div/div/form/div[1]/input");
    private pass=By.xpath("/html/body/main/section[5]/div/div/form/div[2]/input");
    private login_confirm=By.xpath("/html/body/main/section[5]/div/div/form/button");
    private properties=By.xpath("/html/body/nav/div/div/ul/li[3]/a");
    private kuca=By.xpath("/html/body/main/section[3]/main/section[2]/div/div/div[2]/div/div[2]/div/div[1]/h2/a");
    private save=By.xpath("/html/body/main/section[6]/main/section[2]/div/div[2]/div[1]/div/div[2]/div[1]/div/div/div/button");
    private error=By.xpath("/html/body/main/section[3]/main/section[2]/div/div/p");
    private error2=By.xpath("/html/body/main/section[3]/main/section[2]/div/div");

    


    constructor(driver: WebDriver) {
        super(driver);
    }
    //choose Cinema menu Test
    async clickLoginMenu(){
       


        await this.waitAndClick(this.login_button, 10000)
      
    }
    async fillemail(){
        await this.waitAndClick(this.email,100000)
        await this.fillInputField(this.email,testData.logininfo.email)
        
    }
    async fillpass(){
        await this.waitAndClick(this.pass,100000)
        await this.fillInputField(this.pass,testData.logininfo.password)
        await this.driver.sleep(2000);

        
       
    }

    
    async clickConfirmLogin(): Promise<void> {
        await this.waitAndClick(this.login_confirm,1000);
        await this.waitAndClick(this.login_confirm,1000);

        await this.driver.sleep(3000);
        
        


    }

    async clickPropertiesMenu(){

        await this.waitAndClick(this.properties, 10000);
       

       
    }

    async clickProperty() {

        await this.scrollSto();
        await this.waitAndClick(this.kuca, 10000)

    
    }
    
    async clickSaveProperty(){
        this.driver.sleep(3000)

        await this.waitAndClick(this.save, 10000);
    }
    
    
    
}
    
    
        
      

    
    



    
