Feature: Atualização dos dados
    As a cliente com perfil
    I want to alterar dados que constam no perfil
    So that terei como atualizar dados no perfil

    Scenario:  Atualizando um nome de cliente(1)
        Given : Estou na página de perfil
        And : estou logado como “Aninha” no sistema com senha "aninhA123" 
        When : Eu tento atualizar os dados do perfil
        And : Eu altero o nome para “Ana”
        Then : O sistema me pede para uma autenticação por senha
        And : Eu tenho sucesso e o perfil recarrega com o nome "Ana"

    Scenario: Atualizando um nome de cliente(2)
        Given : Estou logado como “Aninha” no sistema com senha "aninhA123"
        And : estou na página do meu perfil com nome "Aninha"
        When : Eu tento atualizar os dados do perfil
        And : Eu altero o nome para “Ana”
        Then : O sistema me pede para uma autenticação por senha
        And : Eu não tenho sucesso e permaneço na mesma página

    Scenario: Atualizando um e-mail cliente(3)
        Given : Estou logado como “Aninha” no sistema com senha "aninhA123"
        And :  Estou na página do meu perfil com o e-mail “alas3@cin.ufpe.br”
        When : Eu tento atualizar os dados do perfil
        And : Eu altero o email para “alas2@cin.ufpe.br”
        Then : O sistema me pede para uma autenticação por senha
        And : Eu tenho sucesso e o perfil recarrega com o email "alas2@cin.ufpe.br"

    Scenario: Atualizando um telefone de cliente(4)
        Given : Estou logado como “Aninha” no sistema com senha "aninhA123"
        And : Estou na minha página de perfil com o telefone “(11)91111-1111”
        When : Eu tento atualizar os dados do perfil
        And : Eu altero o telefone para "(11)984752773abc"
        Then : Aparece uma mensagem de erro e não é possivel salvar

    Scenario: Atualizando um telefone de cliente(5)
        Given : Estou logado como “Aninha” no sistema com senha "aninhA123"
        And : Estou na minha página de perfil com o telefone “(11)91111-1111”
        When : Eu tento atualizar os dados do perfil
        And : Eu altero o telefone para "(11)98475-2773"
        Then : O sistema me pede para uma autenticação por senha
        And : Eu tenho sucesso e o perfil recarrega com o telefone "(11)98475-2773"

    Scenario: Atualizando um e-mail cliente(6)
        Given : Estou logado como “Aninha” no sistema com senha "aninhA123"
        And : Estou na página do meu perfil com o e-mail “alas3@cin.ufpe.br”
        When : Eu tento atualizar os dados do perfil
        And : Eu altero o e-mail para "alas3cin.ufpe.br"
        Then : Aparece uma mensagem de erro e não é possivel salvar
        
    Scenario:  Atualizando um nome de endereço(7)
        Given : Estou logado como “Aninha” no sistema com senha "aninhA123"
        And : estou na página do meu perfil com nome do primeiro endereço "casa"
        When : Eu tento atualizar os dados do perfil
        And : Eu altero o nome do primeiro endereço para "trabalho"
        Then : O sistema me pede para uma autenticação por senha
        And : Eu tenho sucesso e o perfil recarrega com o nome do primeiro endereço como "trabalho"