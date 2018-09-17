/**
 * FrontendAppPage
 */
import { browser, by, element } from 'protractor';

export class FrontendAppPage {
    public navigateTo() {
        // tslint:disable-next-line:no-backbone-get-set-outside-model
        return browser.get('/');
    }

    public getParagraphText() {
        return element(by.css('app-root h1')).getText();
    }
}
