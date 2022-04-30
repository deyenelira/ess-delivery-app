Feature: "Histórico de pedidos"
    As a cliente que possui uma conta no aplicativo de delivery
    I want to visualizar meu histórico de pedidos
    So that conferir todos os pedidos que fiz no último mês 
    
    Scenario: Visualizando histórico de pedidos padrão
        Given estou logada com o usuário "dls6@cin.ufpe.br" com senha "123123"
        When clico em Acessar histórico de pedidos
        Then é exibido na tela todos os pedidos que fiz na semana recorrente de forma paginada

    Scenario: Histórico de pedidos vazio
        Given estou logada com o usuário "dls6@cin.ufpe.br" com senha "123123"
        When clico em Acessar histórico de pedidos
        Then é exibido uma mensagem informando que não há pedidos naquele período

    Scenario: Visualizando histórico de pedidos de um mês específico
        Given estou logada com o usuário "dls6@cin.ufpe.br" com senha "123123"
        When clico em Acessar histórico de pedidos e seleciono um mês específico
        Then é exibido na tela todos os pedidos que fiz no mês de forma paginada
    
    Scenario: Visualizando próxima página no histórico de pedidos
        Given estou logada com o usuário "dls6@cin.ufpe.br" com senha "123123"
        When clico em Acessar histórico de pedidos e seleciono um mês específico
        And clico para ir para a próxima página 
        Then é exibido na tela todos os pedidos que fiz no mês de forma paginada