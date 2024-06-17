import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";


import { readFileSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));

export class HomePage extends BasePage {

    private click_button = By.xpath("//select[@id='odabirkinaselect']");
    private click_cinema=By.xpath("//select[@id='odabirkinaselect']//option[@value='https://www.blitz-cinestar-bh.ba/cinestar-sarajevo']")
    private title_box=By.xpath("//div[@class='title_box']//h1")
    

    private movie_button=By.xpath("//select[@id='odabirfilmaselect']")
    private click_movie=By.xpath("//select[@id='odabirfilmaselect']//option[@value='cinestar-bih/crni-petak/9066/20240107']")
    private movie_name=By.xpath("//div[@class='title_box']//h1")
    
    private movieFromTop5=By.xpath("//a[@href='https://www.blitz-cinestar-bh.ba/cinestar-bih/ferrari/9005']")
    private movieFromTop5_name=By.xpath("//div[@class='title_box']//h1")

    private specialOffer=By.xpath("//a[@href='#tab3Content']")
    private specialOfferButton=By.xpath("//div[@style='display: block;']//a[@href='https://www.blitz-cinestar-bh.ba/zimska-carolija-u-cinestaru']")
    private specialOfferName=By.xpath("//div[@class='title_box']//h1")

    private petak=By.xpath("//a[@href='cinestar-sarajevo/20240112']")
    private petakMovie=By.xpath("//td[@class='naslov']//a[@href='cinestar-sarajevo/pet-shop-boys-dreamworld-the-greatest-hits-live/9105/20240112']")
    private day=By.xpath("//div[@class='dayTabs2']//a[2]")

    private QandAButton=By.xpath("//a[@href='https://www.blitz-cinestar-bh.ba/cesto-postavljena-pitanja-9171']")
    private firstQuestion=By.xpath("//div[@class='faqPitanje'][1]")
    private secondQuestion=By.xpath("//div[@class='faqPitanje'][2]")
    private firstQuestioName=By.xpath("//div[@class='faqPitanje'][1]//div[@class='faqtxt2']")
    
    //INSTAGRAM
    private instagramIcon=By.xpath("//a[@href='https://www.instagram.com/cinestarcinemas_bih']")
    private instagramName=By.xpath('//h2[@class="x1lliihq x1plvlek xryxfnj x1n2onr6 x193iq5w xeuugli x1fj9vlw x13faqbe x1vvkbs x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x x1i0vuye x1ms8i2q xo1l8bm x5n08af x10wh9bi x1wdrske x8viiok x18hxmgj"]')
    //NEWSLETTER
    private newsletter=By.xpath('//a[@href="newsletter-prijava"]')
    private newsletter_ime=By.xpath('//input[@id="ime"]')
    private newsletter_prezime=By.xpath('//input[@id="prezime"]')
    private newsletter_email=By.xpath('//input[@placeholder="e-mail adresa"]')
    private newsletter_man=By.xpath('//input[@id="spol_m"]')
    private newsletter_capthcha=By.xpath('//span[@class="recaptcha-checkbox goog-inline-block recaptcha-checkbox-unchecked rc-anchor-checkbox recaptcha-checkbox-checked"]')
    private newsletter_da=By.xpath('//label[@class="odjavapolja"]')
    private newsletter_posalji=By.xpath('//input[@value="Pošalji"]')
    //DISPLAY TIME
    private click_time=By.xpath('//form[@id="formsort"]//a[@href="javascript:;"][2]')
    //HIGHLIGHTED BUTTONS
    private sjedista=By.xpath('//a[@href="sjedista-bih"]')
    private tekst_sjedista=By.xpath('//div[@class="title_box"]//h1')


    constructor(driver: WebDriver) {
        super(driver);
    }
    //choose Cinema menu Test
    async clickDropMenu(){
        await this.waitAndClick(this.click_button, 10000)
    }
    async clickCinema(){
        await this.waitAndClick(this.click_cinema, 10000)
    }
    async checkCinema(){
        await this.checkMatchingElements(this.title_box,testData.credentials.name)
    }

    // Choose Movie menu Test
    async clickMovieMenu(){
        await this.waitAndClick(this.movie_button, 10000)
    }
    async clickMovieName(){
        await this.waitAndClick(this. click_movie, 10000)
    }
    async checkMovieName(){
        await this.checkMatchingElements(this.movie_name,testData.credentials.name2)
    }


    //instagram test
    async clickInstagram(){
        await this.waitAndClick(this.instagramIcon, 10000)
    }
    async checkInstagramName(){
        await this.navigatee(testData.url.instagram_page)
        await this.waitForElement(this.instagramName,10000)
        await this.checkMatchingElements(this.instagramName,testData.credentials.name3)
    }

    // Click on movie from Top 5 section test:
    async clickOnTop5(){
        await this.scrollSto();
        await this.waitAndClick(this.movieFromTop5, 10000)
    }
    async checkTop5MovieName(){
        await this.checkMatchingElements(this.movieFromTop5_name,testData.credentials.name4)
    }

    // Click on special offers test
    async clickOnSpecialOffer(){
        await this.waitAndClick(this.specialOffer,10000)
    }
    async clickOnSpecialOfferButton(){

        await this.navigatee(testData.url.cinestarSO)
    }
    async checkSpecialOffer(){
        await this.checkMatchingElements(this.specialOfferName,testData.credentials.name5)
    }

    //newsletter test
    async clickNewsletter(){
        await this.scrollSto()
        await this.waitAndClick(this.newsletter, 10000)
    }
    async fillNewsletterName(){
        await this.waitAndClick(this.newsletter_ime, 10000)
        await this.fillInputField(this.newsletter_ime,testData.data.ime)
    }
    async fillNewsletterSurname(){
        await this.waitAndClick(this.newsletter_prezime, 10000)
        await this.fillInputField(this.newsletter_prezime,testData.data.prezime)
    }
    async fillNewsletterEmail(){
        await this.waitAndClick(this.newsletter_email, 10000)
        await this.fillInputField(this.newsletter_email,testData.data.email)
    }
    async clickNewsletterMan(){
        await this.waitAndClick(this.newsletter_man,10000)
    }
    async clickNewsletterCapthcha(){
        /*await this.hoverElement(await this.findElement(this.newsletter_email))
        await this.hoverElement(await this.findElement(this.newsletter_prezime))
        await this.hoverElement(await this.findElement(this.newsletter_ime))
        await this.hoverElement(await this.findElement(this.newsletter_man))
        await this.hoverElement(await this.findElement(this.newsletter_capthcha))
        await this.waitAndClick(this.newsletter_capthcha,20000)*/
        await this.findElement(this.newsletter_capthcha)
        await this.sleep()
        //await this.waitAndClick(this.newsletter_posalji,10000)

    }
    async clickNewsletterDa(){
        await this.waitAndClick(this.newsletter_da,10000)
    }
    async clickNewsletterPosalji(){
        await this.sleep()
        await this.waitAndClick(this.newsletter_posalji,10000)
    }

    //display time test
    async clickDropMenuTime(){
        await this.waitAndClick(this.click_button, 10000)
    }
    async clickTime(){
        await this.waitAndClick(this.click_time, 10000)
    }

    // Filtering by day of screening

    async FilterByDay(){
        await this.waitAndClick(this.click_button, 10000);
        await this.waitAndClick(this.click_cinema, 10000);
        await this.waitAndClick(this.petak,10000);
        await this.waitAndClick(this.petakMovie,10000);
        await this.checkMatchingElements(this.day,testData.credentials.name6)
    }
    //QandA test
    async QandA(){
        await this.scrollSto2();
        await this.waitAndClick(this.QandAButton,10000);
        await this.waitAndClick(this.firstQuestion,10000);
        this.checkMatchingElements(this.firstQuestioName,testData.credentials.description)
        await this.waitAndClick(this.secondQuestion,10000);

    }

    //highlighted buttons test
    async clickSjedista(){
        await this.waitAndClick(this.sjedista, 10000)
    }
    async checkSjedista(){
        await this.waitForElement(this.tekst_sjedista,10000)
        await this.checkMatchingElements(this.tekst_sjedista,testData.data.sjedista)
    }



    
}