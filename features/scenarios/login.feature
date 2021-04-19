Feature: WEB - Login ISSUER


    Scenario: Como un usuario quisiera visualizar la pantalla de login de la aplicación web
        Given Ingreso a la pantalla de login
        When Compruebo los criterios de aceptación
        Then Se visualiza el contenido de la pagina correctamente

    Scenario: Como un usuario quisiera ingresar a issuer module
        Given Ingreso a la pantalla de login
        When Ingreso con el email de Testing
        Then Se visualiza el contenido de la pagina correctamente