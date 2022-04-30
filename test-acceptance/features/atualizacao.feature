Feature: Atualização dos dados
    As a cliente com perfil
    I want to alterar dados que constam no perfil
    So that terei como atualizar dados no perfil

    Scenario:  Atualizando um nome de cliente(1)
        Given estou logado com e-mail "teste1@cin.ufpe.br" no sistema com senha "123teste123"
        And estou na página de perfil 
        When Eu tento atualizar os dados do perfil
        And Eu altero o "nome" de "Nome teste" para "Nome teste ABC"
        Then O sistema me pede para uma autenticação por senha
        And Eu tenho sucesso e o perfil recarrega com o "nome" novo

    Scenario: Atualizando um nome de cliente(2)
        Given estou logado com e-mail "teste12@cin.ufpe.br" no sistema com senha "123teste1234"
        And estou na página de perfil
        When Eu tento atualizar os dados do perfil
        And Eu altero o "nome" de "Nome teste" para "Nome teste banana"
        Then O sistema me pede para uma autenticação por senha
        And Eu não tenho sucesso e permaneço na mesma página

    Scenario: Atualizando um e-mail cliente(3)
        Given estou logado com e-mail "teste123@cin.ufpe.br" no sistema com senha "123teste12345"
        And estou na página de perfil
        When Eu tento atualizar os dados do perfil
        And Eu altero o "email" de "teste123@cin.ufpe.br" para "teste2@cin.ufpe.br"
        Then O sistema me pede para uma autenticação por senha
        And Eu tenho sucesso e o perfil recarrega com o "email" novo

    Scenario: Atualizando um telefone de cliente(4)
        Given estou logado com e-mail "teste21@cin.ufpe.br" no sistema com senha "123teste123456"
        And estou na página de perfil
        When Eu tento atualizar os dados do perfil
        And Eu altero o "telefone" de "81999999999" para "(11)984752773abc"
        Then Aparece uma mensagem de erro no "telefone" digitado e não é possivel salvar

    Scenario: Atualizando um telefone de cliente(5)
        Given estou logado com e-mail "teste22@cin.ufpe.br" no sistema com senha "123teste1234567"
        And estou na página de perfil
        When Eu tento atualizar os dados do perfil
        And Eu altero o "telefone" de "81999999999" para "(11)98475-2773"
        Then O sistema me pede para uma autenticação por senha
        And Eu tenho sucesso e o perfil recarrega com o "telefone" novo

    Scenario: Atualizando um e-mail cliente(6)
        Given estou logado com e-mail "teste23@cin.ufpe.br" no sistema com senha "123teste12345678"
        And estou na página de perfil
        When Eu tento atualizar os dados do perfil
        And Eu altero o "email" de "teste23@cin.ufpe.br" para "teste1cin.ufpe.br"
        Then Aparece uma mensagem de erro no "email" digitado e não é possivel salvar
        
    Scenario:  Atualizando um método de pagamento(7)
        Given estou logado com e-mail "teste24@cin.ufpe.br" no sistema com senha "123teste123"
        And estou na página de perfil
        When Eu tento atualizar os dados do perfil
        And Eu altero o "método de pagamento" de "cartão de cŕedito" para "dinheiro"
        Then O sistema me pede para uma autenticação por senha
        And Eu tenho sucesso e o perfil recarrega com o "método de pagamento" novo