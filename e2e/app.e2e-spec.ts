import { ProyectoAgs2Page } from './app.po';

describe('proyecto-ags2 App', () => {
  let page: ProyectoAgs2Page;

  beforeEach(() => {
    page = new ProyectoAgs2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
