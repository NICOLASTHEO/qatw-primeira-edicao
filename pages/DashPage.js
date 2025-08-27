export class DashPage {
  constructor(page) {
    this.page = page;
  }

   // temp
  async obterSaldo() {
    return this.page.locator('#account-balance')
  } 
};