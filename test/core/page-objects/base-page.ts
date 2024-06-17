import { By, WebDriver, WebElement, until } from "selenium-webdriver";
export default class BasePage {
    protected driver: WebDriver;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }
    async close(){
        await this.driver.close();
    }
    async navigatee(url: string) {
        await this.driver.navigate().to(url);
    }
    async scrollSto(){
        await this.driver.executeScript('window.scrollBy(0,800);');
    }
    async scrollSto2(){
        await this.driver.executeScript('window.scrollBy(0,15000);');
    }
    async getTitle(){
        return await this.driver.getTitle();
    }
    async isClickable(locator: By) {
        try {
            await this.driver.wait(until.elementLocated(locator), 10000);
            await this.driver.wait(until.elementIsEnabled(await this.driver.findElement(locator)), 10000);
            return true;
        } catch (error) {
            return false;
        }
    }
    async sleep(){
        await this.driver.sleep(8000);
    }
    async checkMatchingElements(selector: By, matchingItem: string){
        const element = await this.findElement(selector);
        const elementText = await element.getText();
        expect(elementText).toMatch(matchingItem);
    }
    async checkMatchingElements2(selector: By, matchingItem: string): Promise<boolean> {
        try {
            const element = await this.findElement(selector);
            const elementText = await element.getText();
            console.log(`Element text: ${elementText}, Expected text: ${matchingItem}`);
            return elementText.includes(matchingItem);
        } catch (error) {
            console.error(`Error in checkMatchingElements: ${error}`);
            return false;
        }
    }
    
    async findElement(selector: By) {
        return await this.driver.findElement(selector);
    }
    async checkTitle(page: { getTitle: () => Promise<string>}, page_title: string){
        let title = await page.getTitle();
        expect(title).toMatch(page_title);
    }  
    async findElementAndClick(selector: By){
        await this.driver.wait(
 					   until.elementLocated(selector),10000)
 					   .click();
    }
    async waitAndClick(elementLocator, timeout) {
        await this.driver.wait(
 			until.elementLocated(elementLocator), timeout).click();
    }
    public waitAndClick2(elementLocator, timeout) {
         this.driver.wait(
 			until.elementLocated(elementLocator), timeout).click();
    }
   
    async waitForElement(elementLocator, timeout) {
        return this.driver.wait(until.elementLocated(elementLocator), timeout);
    }
    async hoverElement(element: WebElement) {
        const actions = this.driver.actions({ bridge: true });
        await actions
                    .move({ duration: 2000, origin: element, x: 0, y: 0 })
                    .perform();
    }
    async fillInputField(inputField: By, text: string) {
        await (await this.findElement(inputField)).sendKeys(text);
    }

    async checkURL(expectedUrl: string): Promise<boolean> {
        try {
            // Get the current URL
            const currentUrl = await this.driver.getCurrentUrl();
            console.log(`Current URL: ${currentUrl}`);
            
            // Compare the current URL with the expected URL
            return currentUrl.includes(expectedUrl);
        } catch (error) {
            console.error("Error checking URL:", error);
            return false;
        }
    }
    
    
}

    
