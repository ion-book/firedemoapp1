import { Firedemoapp1Page } from './app.po';

describe('firedemoapp1 App', () => {
  let page: Firedemoapp1Page;

  beforeEach(() => {
    page = new Firedemoapp1Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
