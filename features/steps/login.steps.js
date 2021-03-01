/* eslint-disable import/no-extraneous-dependencies  */
import { When, Given, Then } from 'cucumber';
import { pages } from '../pages/pages';

Given('Ingreso a la pantalla de login', async () => {
  await pages.login.navigate();
});

When('Ingreso con el usuario {string}', async (text) => {
  await pages.login.login(text);
});

When('Compruebo los criterios de aceptación', async () => {
});

Then('retorna la pagina home', async () => {
  await pages.login.navigateHome();
});

Then('Se visualiza el contenido de la pagina correctamente', async () => {
  await pages.login.loginValidate();
});
