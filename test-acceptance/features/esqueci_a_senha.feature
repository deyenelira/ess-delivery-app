Feature: "Esqueci a senha"
    As a cliente que possui uma conta no aplicativo de delivery
    I want to poder modificar minha senha caso a tenha esquecido
    So that eu possa continuar utilizando o aplicativo com a mesma conta

    Scenario: envio de email para modificação de senha
        Given existe um usuário cadastrado com email "zsmn@cin.ufpe.br" e senha "Aninha123"
        Given que estou na página de "forgot-password"
        When eu preencho o campo de email com "zsmn@cin.ufpe.br" e clico em "Enviar"
        Then aparece uma mensagem de sucesso
    
    Scenario: desistir de enviar email para modificação de senha
        Given que estou na página de "forgot-password"
        When eu preencho o campo de email com "alas4@cin.ufpe.br" e clico em "Voltar"
        Then eu vou para a página de login
    
    Scenario: falha no envio de email para modificação de senha
        Given que estou na página de "forgot-password"
        When eu preencho o campo de email com "alas5@cin.ufpe.br" e clico em "Enviar"
        Then aparece uma mensagem de erro de "wrong-email"

    Scenario: modificação de senha
        Given existe um usuário cadastrado com email "alas6@cin.ufpe.br" e senha "A1234567"
        Given que estou na página de "update-password" com email "alas6@cin.ufpe.br"
        When eu preencho os campos com "aninhA123" e "aninhA123", respectivamente, e confirmo
        Then aparece uma mensagem de sucesso

    Scenario: modificação de senha
        Given existe um usuário cadastrado com email "alas7@cin.ufpe.br" e senha "A1234567"
        Given que estou na página de "update-password" com email "alas7@cin.ufpe.br"
        When eu preencho os campos com "Aninha123" e "Aninha124", respectivamente, e confirmo
        Then aparece uma mensagem de erro de "wrong-equals"
    
    Scenario: modificação de senha
        Given existe um usuário cadastrado com email "alas8@cin.ufpe.br" e senha "A1234567"
        Given que estou na página de "update-password" com email "alas8@cin.ufpe.br"
        When eu preencho os campos com "Aninha" e "Aninha", respectivamente, e confirmo
        Then aparece uma mensagem de erro de "wrong-format"
