# My-Services-v1

## Descrição do serviço

API para gerenciar serviços e encontrar prestadores de serviço.

## Tecnologias

- NodeJs
- Typescript 
- Jest
- Express
- MySql

## Configurando ambiente de desenvolvimento

    - Install dependecies
    	npm install
    
    - Run Local
    	npm run start

	- Run tests
		npm run test

## Estrutura
 
- routes -> Camada resposável por expor as rotas da API;
- controllers -> Camada resposável por enviar os comandos para a camada de serviços;
- services -> Contém todos os serviços da API para realizar operações no domínio;
- entities -> Contém todos os domínios da aplicação;
- repositories -> Reponsável por fazer realizar a consulta e persistência de dados no dataBase;
- __tests__ -> camada que contém todos os testes unitários e de integração

## FLUXO


## Referências

