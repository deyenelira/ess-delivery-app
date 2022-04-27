Feature: Atualização dos dados
    As a cliente com perfil
    I want to alterar dados que constam no perfil
    So that terei como atualizar dados no perfil

    Scenario:  Atualizando um nome de cliente(1)
        Given estou logado com e-mail "alas3@cin.ufpe.br" no sistema com senha "aninhA123"
        And estou na página de perfil 
        When Eu tento atualizar os dados do perfil
        And Eu altero o "nome" de "Aninha" para "Ana"
        Then O sistema me pede para uma autenticação por senha
        And Eu tenho sucesso e o perfil recarrega com o "nome" novo

    Scenario: Atualizando um nome de cliente(2)
        Given estou logado com e-mail "alas3@cin.ufpe.br" no sistema com senha "aninhA123"
        And estou na página de perfil
        When Eu tento atualizar os dados do perfil
        And Eu altero o "nome" de "Ana" para "Aninha"
        Then O sistema me pede para uma autenticação por senha
        And Eu não tenho sucesso e permaneço na mesma página

    Scenario: Atualizando um e-mail cliente(3)
        Given estou logado com e-mail "alas3@cin.ufpe.br" no sistema com senha "aninhA123"
        And estou na página de perfil
        When Eu tento atualizar os dados do perfil
        And Eu altero o "email" de "alas3@cin.ufpe.br" para "alas2@cin.ufpe.br"
        Then O sistema me pede para uma autenticação por senha
        And Eu tenho sucesso e o perfil recarrega com o "email" novo

    Scenario: Atualizando um telefone de cliente(4)
        Given estou logado com e-mail "alas2@cin.ufpe.br" no sistema com senha "aninhA123"
        And estou na página de perfil
        When Eu tento atualizar os dados do perfil
        And Eu altero o "telefone" de "(11)91111-1111" para "(11)984752773abc"
        Then Aparece uma mensagem de erro no "telefone" digitado e não é possivel salvar

    Scenario: Atualizando um telefone de cliente(5)
        Given estou logado com e-mail "alas2@cin.ufpe.br" no sistema com senha "aninhA123"
        And estou na página de perfil
        When Eu tento atualizar os dados do perfil
        And Eu altero o "telefone" de "(11)91111-1111" para "(11)98475-2773"
        Then O sistema me pede para uma autenticação por senha
        And Eu tenho sucesso e o perfil recarrega com o "telefone" novo

    Scenario: Atualizando um e-mail cliente(6)
        Given estou logado com e-mail "alas2@cin.ufpe.br" no sistema com senha "aninhA123"
        And estou na página de perfil
        When Eu tento atualizar os dados do perfil
        And Eu altero o "email" de "alas2cin.ufpe.br" para "alas3cin.ufpe.br"
        Then Aparece uma mensagem de erro no "email" digitado e não é possivel salvar
        
    Scenario:  Atualizando um nome de endereço(7)
        Given estou logado com e-mail "alas2@cin.ufpe.br" no sistema com senha "aninhA123"
        And estou na página de perfil
        When Eu tento atualizar os dados do perfil
        And Eu altero o "método de pagamento" de "cartão de cŕedito" para "dinheiro"
        Then O sistema me pede para uma autenticação por senha
        And Eu tenho sucesso e o perfil recarrega com o "método de pagamento" novo