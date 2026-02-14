import 'dotenv/config'

import test from 'node:test';
import assert from 'assert';

// Librería para automatizar navegación e interacción con la web usando IA.
import { Stagehand } from '@browserbasehq/stagehand';

test('Un usuario puede entrar en la JSConfig y adquirir dos entradas por €287.98', async () => {
    const stagehand = new Stagehand({
        env: 'LOCAL', // Corre en tu máquina
        model: 'ollama/llama3.2', // Usa el modelo Gemini 2.0 Pro de Google
    });

    await stagehand.init()

    const [page] = stagehand.context.pages();

    await page.goto('https://jsconf.es/');

    // Lo que quiero que haga
    await stagehand.act('Clicar en el botón de "Comprar entradas');
    await stagehand.act('Click en el "+" al lado de "Entrada general" para añadir un ticket');
    await stagehand.act('Click en el "+" al lado de "Entrada general" para añadir un segundo ticket');

    // Extraer información
    const {extraction} = await stagehand.extract('Extract the subtotal from the page');
    console.log('Subtotal extraído:', extraction);

    assert.strictEqual(extraction, '€287.98');

    await stagehand.close();
});