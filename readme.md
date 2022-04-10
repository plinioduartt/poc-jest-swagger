# POC - Jest & Swagger

### CRUD simples aplicando os conceitos de testes com Jest e documentação da API com Swagger

# Etapas para executar ==> 

### 1. Clone o projeto 

### 2. Execute o comando abaixo para configurar as databases em um conteiner do Docker:
```
docker-compose up -d mysql
```

### 3. Execute o comando abaixo para rodar os testes com Jest:
```
docker-compose up test
```

### 4. Execute o comando abaixo para rodar a aplicação em modo desenvolvimento:
```
docker-compose up dev
```