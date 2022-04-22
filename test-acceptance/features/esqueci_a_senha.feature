Feature: "Esqueci a senha"
    As a cliente que possui uma conta no aplicativo de delivery
    I want to poder modificar minha senha caso a tenha esquecido
    So that eu possa continuar utilizando o aplicativo com a mesma conta

    Scenario: envio de e-mail para modificação de senha
        Given que estou na página de "forgot-password"
        When eu preencho o campo de e-mail com "alas3@cin.ufpe.br" e clico em "Enviar"
        Then aparece uma mensagem de sucesso
    
    Scenario: desistir de enviar e-mail para modificação de senha
        Given que estou na página de "forgot-password"
        When eu preencho o campo de e-mail com "alas3@cin.ufpe.br" e clico em "Voltar"
        Then eu vou para a página de login
    
    Scenario: falha no envio de e-mail para modificação de senha
        Given que estou na página de "forgot-password"
        When eu preencho o campo de e-mail com "aoqb@cin.ufpe.br" e clico em "Enviar"
        Then aparece uma mensagem de erro de "wrong-email"

    Scenario: modificação de senha
        Given que estou na página de "update-password" com id "0"
        When eu preencho os campos com "aninhA123" e "aninhA123", respectivamente, e confirmo
        Then aparece uma mensagem de sucesso

    Scenario: modificação de senha
        Given que estou na página de "update-password" com id "1"
        When eu preencho os campos com "Aninha123" e "Aninha124", respectivamente, e confirmo
        Then aparece uma mensagem de erro de "wrong-equals"
    
    Scenario: modificação de senha
        Given que estou na página de "update-password" com id "2"
        When eu preencho os campos com "Aninha" e "Aninha", respectivamente, e confirmo
        Then aparece uma mensagem de erro de "wrong-format"
