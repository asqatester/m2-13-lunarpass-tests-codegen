import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/login.page';
import { NavBar } from '../pages/components/navbar';

test('deve cadastrar uma nova missão', async ({ page }) => {

    const loginPage = new LoginPage(page)
    const navbar = new NavBar(page)

    await loginPage.go()
    await loginPage.login('buzz@lunarpass.dev', 'pwd123')
    await expect(navbar.logout).toBeVisible()

    await page.getByRole('button', { name: 'Nova missão' }).click();
    await expect(page.getByRole('heading', { name: 'Programar missão' })).toBeVisible();

    await page.getByRole('textbox', { name: 'ID da missão' }).fill('LP-2801A');
    await page.getByRole('textbox', { name: 'Foguete' }).fill('Starship');
    await page.getByLabel('Base lunar').selectOption('aurora');
    await page.getByRole('textbox', { name: 'Data de partida' }).fill('2027-01-28');
    await expect(page.getByTestId('mission-form-return-date')).toContainText('04 de fev. de 2027');
    await page.getByRole('spinbutton', { name: 'Preço por passagem (USD)' }).fill('1000');

    await page.getByRole('button', { name: 'Salvar missão' }).click();
    await expect(page.getByRole('listitem')).toContainText('Missão criada.');
});