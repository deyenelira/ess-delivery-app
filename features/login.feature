Feature: As a usuário do sistema
    I want to entrar no sistema com meu e-mail e senha
    So that eu tenha acesso às funcionalidades internas do sistema, que são acessíveis somente após o login

    Scenario: Login realizado com sucesso
        Given que estou na página de login
        And existe um usuário cadastrado com e-mail "aoqb@cin.ufpe.br" e senha "A1234567"
        When eu preencho os campos com e-mail "aoqb@cin.ufpe.br" e senha "A1234567"
        Then eu vou para a página de Home do sistema

    Scenario: Falha no login com e-mail não cadastrado
        Given que estou na página de login
        And existe um usuário cadastrado com e-mail "aoqb@cin.ufpe.br" e senha "A1234567"
        When eu preencho os campos com e-mail "zika@cin.ufpe.br" e senha "A1234567"
        Then aparece uma mensagem de falha no login

    Scenario: Falha no login com senha incorreta
        Given que estou na página de login
        And existe um usuário cadastrado com e-mail "aoqb@cin.ufpe.br" e senha "A1234567"
        When eu preencho os campos com e-mail "aoqb@cin.ufpe.br" e senha "B7654321"
        Then aparece uma mensagem de falha no login

    Scenario: Falha no login com senha em branco
        Given que estou na página de login
        When eu preencho o campo de e-mail com "aoqb@cin.ufpe.br"
        Then não consigo pressionar o botão de entrar
        And permaneço na página de login

    Scenario: Falha no login com e-mail inválido
        Given que estou na página de login
        And existe um usuário cadastrado com e-mail "aoqb@cin.ufpe.br" e senha "A1234567"
        When eu preencho os campos com e-mail "aoqb" e senha "aninhA123"
        Then aparece uma mensagem de falha no login

    Scenario: Falha no login com e-mail em branco
        Given que estou na página de login
        When eu preencho o campo de senha com "A1234567"
        Then não consigo pressionar o botão de entrar
        And permaneço na página de login
