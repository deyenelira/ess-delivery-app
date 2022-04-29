Feature: “Remoção de cliente” 
	As a cliente que possui uma conta no aplicativo
	I want to poder remover minha conta do aplicativo
	So that eu terei meus dados removidos do sistema 

	Scenario: remoção realizada com sucesso
		Given eu estou logada com o usuário com email "vlsc@cin.ufpe.br" e senha "exemplo123"
			And estou na página de perfil do usuário
		When eu clico na opção de remover conta
			And coloco minha senha para confirmação da remoção
			And confirnmo
		Then eu sou levada para a página de login

	Scenario: remoção cancelada
		Given eu estou logada com o usuário com email "vlsc@cin.ufpe.br" e senha "exemplo123"
			And estou na página de perfil do usuário
		When eu clico na opção de remover conta
			And coloco minha senha para confirmação da remoção
			And cancelo
		Then eu continuo na página de perfil do usuário

	Scenario: tentativa de remoção de cliente que errou a senha de confirmação
		Given eu estou logada com o usuário com email "vlsc@cin.ufpe.br" e senha "exemplo123"
			And estou na página de perfil do usuário
		When eu clico na opção de remover conta
			And coloco minha senha incorretamente para confirmação da remoção
			And confirmo
		Then eu vejo uma notificação de erro

	Scenario: tentativa de remoção de cliente com pedido em andamento
		Given eu estou logada com o usuário com email "vlsc@cin.ufpe.br" e senha "exemplo123"
			And estou na página de perfil do usuário
			And possuo um pedido em andamento
		When eu clico na opção de remover conta
		Then eu vejo uma notificação de erro

	Scenario: tentativa de remoção de cliente que não colocou senha
		Given eu estou logada com o usuário com email "vlsc@cin.ufpe.br" e senha "exemplo123"
			And estou na página de perfil do usuário
		When eu clico na opção de remover conta
			And confirmo
		Then eu vejo uma notificação de erro