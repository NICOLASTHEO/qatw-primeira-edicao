import { test, expect } from '@playwright/test';
import { obterCodigo2FA } from '../support/db';

const url = 'http://paybank-mf-auth:3000/';

test('Não deve Logar quando o Código de Autenticação é Inválido', async ({ page }) => {

  const usuario ={
    cpf:    '00000014141',
    senha:  '147258'
  } 
  await page.goto(url);

  await page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(usuario.cpf);
  await page.getByRole('button', { name: 'Continuar' }).click();

  await page.getByRole('heading', { name: 'Informe sua senha' }).isVisible();
  for (const digito of usuario.senha) {
    await page.getByRole('button', { name: digito }).click();
  }
  await page.getByRole('button', { name: 'Continuar' }).click();

  await page.getByRole('heading', { name: 'Verificação em duas etapas' }).isVisible();
  await page.getByRole('textbox', { name: '000000' }).fill('123456');
  await page.getByRole('button', { name: 'Verificar' }).click();
  
  await expect(page.locator('span')).toContainText('Código inválido. Por favor, tente novamente.');
});

test('Deve acessar a conta do usuário', async ({ page }) => {

  const usuario ={
    cpf:    '00000014141',
    senha:  '147258'
  } 
  await page.goto(url);

  await page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(usuario.cpf);
  await page.getByRole('button', { name: 'Continuar' }).click();

  await page.getByRole('heading', { name: 'Informe sua senha' }).click();
  for (const digito of usuario.senha) {
    await page.getByRole('button', { name: digito }).click();
  }
  await page.getByRole('button', { name: 'Continuar' }).click();

  await page.getByRole('heading', { name: 'Verificação em duas etapas' }).isVisible();

  // temp
  await page.waitForTimeout(1000);
  const code = await obterCodigo2FA()
  await page.getByRole('textbox', { name: '000000' }).fill(code);
  await page.getByRole('button', { name: 'Verificar' }).click();

  await expect(page.locator('//div/h2[text()="Saldo disponível"]')).toContainText('Saldo disponível');
});