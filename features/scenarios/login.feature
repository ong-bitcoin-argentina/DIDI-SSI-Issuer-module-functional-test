Feature: WEB - Login ISSUER

    Scenario: Como un usuario quisiera iniciar sesión en la aplicación web
        Given Ingreso a la pantalla de login
        When Ingreso con el usuario "correo mati"
        Then retorna la pagina home

    Scenario: Como un usuario quisiera visualizar la pantalla de login de la aplicación web
        Given Ingreso a la pantalla de login
        When Compruebo los criterios de aceptación
        Then Se visualiza el contenido de la pagina correctamente
