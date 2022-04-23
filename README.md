# Projeto Restaurantes - IF682 Engenharia de software e Sistemas

## Descrição
Esse projeto desenvolve as features relacionadas ao registro de clientes para um app de gestão de pedidos e restaurantes semelhante ao IFood. Este projeto faz parte da avaliação da disciplina IF682 - Engenharia de software e Sistemas no CIn-UFPE.

## Time de desenvolvimento
- Alice Oliveira de Queiroz Brito
- Ana Letícia Albuquerque Santos
- Caio de Mendonça Barbosa
- Dayane Lira da Silva
- Matheus Rodrigues Bueno Godinho
- Pedro Jorge Lima da Silva
- Victoria Luisi

## Como rodar o projeto

### Dependências

- Angular
- Node 
- npm

### Instalando dependências 
```bash
sudo apt install npm
sudo npm install -g @angular/cli
```

### Modificando a versão do Node
```bash
sudo npm install -g n
n 14.15
```

### Rodando o projeto
- Iniciar o servidor
```bash
cd server
sudo npm install
npm start
```
- Iniciando o frontend
```bash
cd web-app
sudo npm install 
cd src
ng serve
```

### Buildar testes


```bash
cd test-acceptance
sudo npm install
npm run webdriver-update
```

### Rodando Testes
- Testes para o Server

```bash
cd server
npm test

```
- Testes de Interface

Recomendamos utilizar o navegador Firefox visto que versões mais recentes do Webdriver estão apresentando problemas com o Chrome.

```bash
cd server
node server.js

# Em outro terminal
cd web-app
npm start

# Em outro terminal
cd test-acceptance
npm run webdriver-start

# Em outro terminal
cd test-acceptance
npm test
```
