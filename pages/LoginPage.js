export class LoginPage {
    constructor(page) {
        this.page = page;
    }

  async acessarPagina() {
    await this.page.goto('http://paybank-mf-auth:3000/');
  }
  async preencherCPF(cpf) { 
    await this.page.getByRole('textbox', { name: 'Digite seu CPF' }).fill( cpf);
  }
  async clicarContinuar() {
    await this.page.getByRole('button', { name: 'Continuar' }).click();
  }
  async preencherSenha(senha) {
    await this.page.getByRole('heading', { name: 'Informe sua senha' }).isVisible();
    for (const digito of senha) {
        await this.page.getByRole('button', { name: digito }).click();
    }
    await this.page.getByRole('button', { name: 'Continuar' }).click();
  }

  async escreverCodigoMFA(codigo) {
    await this.page.getByRole('heading', { name: 'Verificação em duas etapas' }).isVisible();
    await this.page.getByRole('textbox', { name: '000000' }).fill(codigo);
    await this.page.getByRole('button', { name: 'Verificar' }).click();
  }
    async escreverCodigoMFA_Errado() {
    await this.page.getByRole('heading', { name: 'Verificação em duas etapas' }).isVisible();
    await this.page.getByRole('textbox', { name: '000000' }).fill("123456");
    await this.page.getByRole('button', { name: 'Verificar' }).click();
  }
  async verificarLoginComSucesso() {
    await this.page.locator('//div/h2[text()="Saldo disponível"]').isVisible();
  }
};