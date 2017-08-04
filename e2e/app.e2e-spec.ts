import { AngularLoginPage } from './app.po';

describe('angular-login App', () => {
  let page: AngularLoginPage;

  beforeEach(() => {
    page = new AngularLoginPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
