Feature: As a usuário do sistema
    I want to entrar no sistema com meu e-mail e senha
    So that eu tenha acesso às funcionalidades internas do sistema, que são acessíveis somente após o login

    Scenario: Login realizado com sucesso
        Given que estou na página de login
        When eu preencho os campos com e-mail "alas3@cin.ufpe.br" e senha "aninhA123"
        Then eu vou para a página de Home do sistema

    Scenario: Falha no login com e-mail não cadastrado
        Given que estou na página de login
        When eu preencho os campos com e-mail "aoqb@cin.ufpe.br" e senha "A1234567"
        Then aparece uma mensagem de falha no login