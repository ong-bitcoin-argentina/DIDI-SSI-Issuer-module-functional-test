# Librería de automation Front-End
## DIDI-SSI-Issuer-module-functional-test




Esta guía es para integrar casos de prueba automatizados y realizar la ejecución de la librería.

- Creación de Features
- Creación de Pages
- Creación de Steps
- Ejecución

## Features

- Generar dentro de la carpeta scenarios un archivo *.feature
- Realizar la escritura del caso de prueba en lenguaje Humano con la metodologia BDD
- FEATURE => Epica
- Scenario: User Story / Caso de Uso
- Given (Procesos que se ejecutan antes del test), When (Prueba de la funcionalidad), Then (Validaciones de los resultados)

## Pages

Contiene todos los selectores de un Screen del cual se va estar realizando las pruebas de calidad.
- Generar dentro de la carpeta features/pages un archivo *.page.js
- Contiene funciones asincronas que se encargan de realizar las pruebas o validaciones en el When o Then
- contiene funciones que retornan los selectores.
- Se debe incorporar las paginas dentro de un unico archivo pages a modo de "herencia" para lograr una estructura de importación mas limpia y un control de las pantallas
> import { testController } from '../support/world' => *"Archivo que gestiona el controlador de testcafe y le agrega las funciones de screenshot y validaciones durante el proceso CI"*
> import { select } from '../support/utils' => Importa la funcion de TestCafe Selector()
> import { ClientFunction } from 'testcafe'; => cliente que realiza la ejecucción de Testcafe
> import { **NombreDePagina** } from '**nombredepagina**.page' => Se importa dentro del archivo pages todas las paginas las cuales se le extrajo los selectors. 

## Steps
Contiene los textos de las features y su conversión a JS. Se llama la función de BDD y se le asigna el texto que contenga la feature y dentro de la misma se llaman a las funciones de testing que estan contenidas en las pages.

> When('Ingreso con el usuario {string}', async (text) => {       # el llamado {string} es para referenciar que dentro del texto de la feature se esta trayendo un texto con comillas dobles "" con formato string. Se puede utilizar para incertarlo en una función que ocupe la logica para realizar el caso de prueba.
>  await pages.login.login(text);
> });

As [Gastón Genaud] writes this guide.
