import { CouPostsPage } from './app.po';

describe('cou-posts App', () => {
  let page: CouPostsPage;

  beforeEach(() => {
    page = new CouPostsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
