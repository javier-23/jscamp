// @ts-check
import { test, expect } from '@playwright/test';

// Lo más recomendable es usar roles, aria, etiquetas de texto, etc, y selectores de CSS como último recurso.

test('Buscar empleos y aplicar a una oferta', async ({ page }) => {
  // Ir a la página
  await page.goto('http://localhost:5173');

  //Utilizar el buscador
  const searchInput = page.getByRole('searchbox')
  await searchInput.fill('React')

  // Hacer clic en el botón de búsqueda
  await page.getByRole('button', { name: 'Buscar' }).click();

  const firstJobCards = page.locator('.jobs-listings').first();

  await expect(firstJobCards).toBeVisible();

  const firstJobTitle = firstJobCards.getByRole('heading', { level: 3 });
  await expect(firstJobTitle).toHaveText('Desarrollador de Software Senior');

  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  const applyButton = page.getByRole('button', { name: 'Aplicar' }).first();
  await applyButton.click();

  await expect(page.getByRole('button', { name: 'Aplicado' })).toBeVisible();
});
