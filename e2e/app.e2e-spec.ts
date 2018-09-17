/**
 * FrontendAppPage
 */
import { FrontendAppPage } from './app.po';

describe('frontend-app App', () => {
    let page: FrontendAppPage;

    beforeEach(() => {
        page = new FrontendAppPage();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Welcome to app!');
    });
});
