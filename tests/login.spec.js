import { test, expect } from '@playwright/test';
import { obterCodigo2FA } from '../support/db';
import { LoginPage } from '../pages/LoginPage';
import { DashPage } from '../pages/DashPage';

test('Não deve Logar quando o Código de Autenticação é Inválido', async ({ page }) => {

  const loginPage = new LoginPage(page);
  
  const usuario ={
    cpf:    '00000014141',
    senha:  '147258'
  } 

  await loginPage.acessarPagina();
  await loginPage.preencherCPF(usuario.cpf);
  await loginPage.clicarContinuar();

  await loginPage.preencherSenha(usuario.senha);
  await loginPage.escreverCodigoMFA_Errado();
  await expect(page.locator('//span[text()="Código inválido. Por favor, tente novamente."]')).toBeVisible();
});

test('Deve acessar a conta do usuário', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const dashPage = new DashPage(page);  

  const usuario ={
    cpf:    '00000014141',
    senha:  '147258'
  } 
  await loginPage.acessarPagina();
  await loginPage.preencherCPF(usuario.cpf);
  await loginPage.clicarContinuar();

  await loginPage.preencherSenha(usuario.senha);

  // temp
  await page.waitForTimeout(1000);
  const codigo = await obterCodigo2FA();
  await loginPage.escreverCodigoMFA(codigo);

  // temp
  await page.waitForTimeout(1000);
  await expect(page.locator('//div/h2[text()="Saldo disponível"]')).toBeVisible();

  expect(await dashPage.obterSaldo()).toHaveText('R$ 5.000,00');
});