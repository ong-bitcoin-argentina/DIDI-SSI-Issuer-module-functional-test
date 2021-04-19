/* eslint-disable import/no-extraneous-dependencies  */
import { When, Given, Then } from 'cucumber';
import { pages } from '../pages/pages';

Given('Ingreso a la pantalla de login', async () => {
  await pages.login.navigate();
});

When('Ingreso con el email de Testing', async () => {
  await pages.login.login();
});

When('Compruebo los criterios de aceptación', async () => {
  await pages.login.loginValidate();
});

Then('retorna la pagina home', async () => {
  //await pages.login.navigateHome();
});

Then('Se visualiza el contenido de la pagina correctamente', async () => {
});
