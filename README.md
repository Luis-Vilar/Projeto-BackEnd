<H1> Projeto-BackEnd</H1>
<H3>FullStack [Itaguaçu] Módulo 2 - Projeto Avaliativo</H3>



## INTRODUÇÃO
A LABPharmacy Inc, uma renomada empresa do ramo de tecnologia farmacêutica, está expandindo seus serviços. Por conta da expansão, o time de gestão necessita da criação de um sistema online, intitulado Pharmacy Central System (PCS), para gerenciamento de depósitos e medicamentos. Por conta da participação no projeto de front-end, o seu perfil chamou a atenção dos gestores, para agora criar o back-end do sistema que deverá ser codificado em Node, utilizando o framework Express.js com o uso do banco de dados PostgreSQL.
A LABPharmacy Inc deseja criar a API Rest da aplicação Pharmacy Central System (PCS), um software para gestão de depósitos e medicamentos, que será utilizado para o controle de estoque dos medicamentos de hospitais e postos de saúde.

## Yensy API 
A Yensy API é um aplicativo criado com gratidão e dedicação à minha querida namorada, que ofereceu apoio incondicional durante o desenvolvimento deste projeto avaliativo . A missão da Yensy API é facilitar a gestão de farmácias através de uma interface REST desenvolvida em Javascript, proporcionando uma solução eficiente e confiável para administrar o inventário e os estabelecimentos, esta API esta focada no campo farmacêutico para o gerenciamento de Medicamentos, Usuarios, e Depositos.

- Gestão de Inventário: Mantenha um registro completo dos produtos farmacêuticos disponíveis.
- Segurança e Autenticação: Garanta a privacidade e a proteção dos dados através de autenticação segura e acesso controlado por JWT.
- Informações dos Usuarios e Depositos: Armazene informações relevantes dos Usuarios e Depositos os cuais podem ser desativados caso nescesario ou deletados logicamente o que permite garantir a integridade dos registros em caso de deleçao involuntaria.

Esta API representa um sincero agradecimento à minha namorada e a todos aqueles que foram uma fonte de inspiração nesta jornada de desenvolvimento. Juntos, esperamos que a Yensy API simplifique e melhore a gestão de farmácias, contribuindo assim para o bem-estar da comunidade e do setor farmacêutico como um todo. Junte-se à comunidade da Yensy API e descubra uma forma mais eficiente de gerenciar farmácias com facilidade e confiança.
  

<h2>TECNOLOGIAS UTILIZADAS :</h2>
<br>
<h5>
    
![image](https://img.shields.io/badge/Git-E34F26?style=for-the-badge&logo=git&logoColor=white)![image](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)![image](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black)![image](https://img.shields.io/badge/Yarn-2C8EBB.svg?style=for-the-badge&logo=Yarn&logoColor=white)![image](https://img.shields.io/badge/Sequelize-52B0E7.svg?style=for-the-badge&logo=Sequelize&logoColor=white)![image](https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=PostgreSQL&logoColor=white)![image](https://img.shields.io/badge/JSON%20Web%20Tokens-000000.svg?style=for-the-badge&logo=JSON-Web-Tokens&logoColor=white)![image](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC.svg?style=for-the-badge&logo=Visual-Studio-Code&logoColor=white)
</h5>
<br>
<br>

## MODELO DA BASE DE DADOS

![BD drawio](https://github.com/Luis-Vilar/Projeto-BackEnd/assets/124309725/059330d8-c9bc-4193-b41c-ff0e48fbf017)

## COMO EXECUTAR MINHA SOLUÇÃO
- Dependências a serem instaladas: Git [https://git-scm.com/](https://git-scm.com/), NodeJS [https://nodejs.org/pt-br](https://nodejs.org/pt-br), Yarn [https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable).
- Abra um Terminal e clone o projeto: `git clone git@github.com:Luis-Vilar/Projeto-BackEnd.git` [ENTER].
- Entre na pasta do repositório recém-clonado: `cd Projeto_Backend` [ENTER].
- Execute o instalador de dependências: `yarn` [ENTER].
- Você deverá criar um arquivo .env, na raiz da pasta do projeto tem um .env_example; se for de sua preferência, renomeie o mesmo arquivo e modifique as variáveis de ambiente com as corretas para você. Neste ponto, você poderá escolher outra base de dados, mas para este projeto foi utilizado PostgreSQL. As variáveis que deve configurar são `HOST` (endereço da API, por padrão, localhost para executar no seu computador), `DIALECT` (dialeto da BD, exemplo: postgresql), `USERNAMEDB` (nome do usuário da sua base de dados), `PASSWORDDB` (senha do usuário da base de dados), `DATABASE` (nome da base de dados), `JWT_KEY` (chave secreta do JWT). As demais estão com valores padrão; caso ache necessário, sinta-se à vontade para mudá-las.
- Crie a base de dados com a ferramenta de sua preferência com o mesmo nome declarado na variável `DATABASE` (RECOMENDO DBVEAVER ou PGADMIN para o caso do PostgreSQL).
- Dentro da pasta do Projeto-Backend, execute: `npx sequelize-cli db:migrate` [ENTER].
- {OPCIONAL} Caso queira adicionar registros para testes na Base de dados, pode executar a criação de seeders com o seguinte comando no terminal, depois de finalizar as migrations: `npx sequelize-cli db:seed:all` [ENTER].
- Neste ponto, o servidor deveria estar configurado totalmente. Vamos a iniciá-lo com o seguinte comando: `yarn start` [ENTER].
- No terminal, deve aparecer a seguinte saída:<br>
  ```sh
  ╰─$ yarn start
  yarn run v1.22.19
  $ node src/index.js
  Servidor executando em http://localhost:3000/
  Executing (default): SELECT 1+1 AS result
  Conexão com o banco de dados estabelecida com sucesso!
-  Com algum cliente REST (recomendo THUNDERCLIENT), vamos criar um usuário no endpoint /api/usuarios com o verbo POST. Siga a documentação para este endpoint no S01..
-  Novamente, utilizando o cliente REST, vamos fazer login com nosso usuário recém-criado no endpoint /api/user/login; este nos devolverá um token que será necessário para os demais endpoints, os quais são privados e devem ser inseridos no Header.Authorization da requisição em nosso cliente REST. Siga a documentação no S02.
-  Todos os demais endpoints estão especificados na SIGUIENTE DOCUMENTAÇÃO : 
## DOCUMENTAÇAO DA API 
# ENDPOINTS USUARIO
| ENDPOINT                 | VERBO | S## |
| ------------------------ | ----- | --- |
| /api/usuarios            | POST  | S01 |
| /api/usuarios/login      | POST  | S02 |
| /api/usuarios/:id        | PATCH | S03 |
| /api/usuarios/:id/status | PATCH | S04 |
| /api/usuarios/:id/senha  | PATCH | S05 |
| /api/usuarios/:id        | GET   | S06 |

## S01 CADASTRO DE USUARIOS
| req exemplo |
| ----------- |

 -----| BODY |
 
<code>{
    "nome" : "Nome",
    "sobrenome" : "Sobrenome",
    "data_nascimento" : "9999-12-31",
    "cpf" : "12345678901",
    "email" : "email@dominio.com",
    "senha" : "Senhafor7&",
    "telefone" : "123456789012345",
     //opcional "genero" : "genero
}</code>
| res exemplo |
| ----------- |

400 - Bad Request  Requisição com dados inválidos
409 - Conflict  CPF já cadastrado
409 - Conflict  Emails já cadastrado

201 - Created
<code>{
  "message": "Usuário cadastrado com sucesso",
  "identificador": 1,
  "status": "ativo"
}</code>


## S02 LOGIN DE USUARIOS
| req exemplo |
| ----------- |

 -----| BODY |
<code>js{
"email" : "email@dominio.com",
"senha" : "Senhafor7&"
}</code>


| res exemplo |
| ----------- |

400 - Bad Request Requisição com dados inválidos
404 - Not Found Usuário não encontrado

200 OK 
<code>{
  "token": "eyJhbGciOiJsdfIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJhdGl2byIsImlkIjoxNywiaWF0IjoxNjg5OT
  c5NzYwLCJleHAiOjE2OTAwNjYxiiisdfsnkoyueyurwejB9.6rItLA0gs9tJWcjV7HrQ7IYSAn-LIeMgzuDd6iPBKqY"
}</code>


## S03 ATUALIZAR USUARIO
| req exemplo |
| ----------- |

-----| HEADER |
| Authorization | token valido gerado no login ver #SO2


 -----| BODY |
<code>{
//opcional "nome" : "Nome",
//opcional  "sobrenome" : "sobnome",
//opcional  "telefone" : "123456789012345",
//oipcional "genero" : "genero"
  }</code>


| res exemplo |
| ----------- |

400 - Bad Request Nenhum dado valido para atualizar foi recebido
401 - Unauthorized Sem permissão para atualizar este usuário

202 Accepted 
<code>{
  "message": "Usuário 1 atualizado com sucesso",
  "updated": {
    "nome": "Nome",
    "sobrenome": "Nome ",
    "genero": "genero",
    "telefone": "123456789012345"
  }
}</code>


## S04 ATUALIZAR STATUS USUARIO
| req exemplo |
| ----------- |

-----| HEADER |
| Authorization | token valido gerado no login ver #SO2


 -----| BODY |
<code>{
  "status" : "ativo"
}</code>


| res exemplo |
| ----------- |

400 - Bad Request status não informado / invalido
401 - Unauthorized Sem permissão para este endpoint
401 - Unauthorized Voce nao pode mudar seu status, contate um administrador...
404 - Not Found Usuário não encontrado
200 OK
<code>{
  "message": "Usuario com id 1 atualizado com o status : ativo/inativo"
}</code>


## S05 ATUALIZAR SENHA USUARIO
| req exemplo |
| ----------- |

-----| HEADER |
| Authorization | token valido gerado no login ver #SO2


 -----| BODY |
<code>{
  "senha" : "umaSenham1T0fort@"
}</code>


| res exemplo |
| ----------- |

400 - Bad Request Senha não informada
401 - Unauthorized Sem permissão para atualizar este usuário
404 - Not Found Usuario não encontrado
200 - response com erro de validaçao 
204 - No Content



## S06 LISTAR USUARIO POR ID
| req exemplo |
| ----------- |

-----| HEADER |
| Authorization | token valido gerado no login ver #SO2
 -----| BODY |
<code>{}</code>


| res exemplo |
| ----------- |

400 - Bad Request  O id X informado não é um número 
404 - Not Found Usuário não encontrado
200 OK 
<code>{
  "id": 1,
  "cpf": "12345678901",
  "nome": "Nome",
  "sobrenome": "Sobrenome",
  "genero": "genero",
  "data_nascimento": "1990-01-01T00:00:00.000Z",
  "email": "email@dominio.com",
  "telefone": "123456789012345",
  "status": "ativo",
  "created_at": "2023-07-17T22:26:16.523Z",
  "updated_at": "2023-07-19T18:40:29.946Z"
}</code>


# ENDPOINTS DEPOSITOS

| ENDPOINT                             | VERBO  | S## |
| ------------------------------------ | ------ | --- |
| /api/depositos                       | POST   | S07 |
| /api/depositos/:id                   | PATCH  | S08 |
| /api/depositos/:id/status            | PATCH  | S09 |
| /api/depositos/?status=ativo/inativo | GET    | S10 |
| /api/depositos/:id                   | GET    | S11 |
| /api/depositos/:id                   | DELETE | S12 |

## S07 CADASTRAR DEPOSITO
| req exemplo |
| ----------- |

-----| HEADER |
| Authorization | token valido gerado no login ver #SO2


 -----| BODY |
<code>{
  "razao_social": "Razao Social",
  "nome_fantasia": "Nome Fantasia",
  "cnpj": "12312317312332",
  "email": "email@dodminio.com",
  "celular": "11111111111",
  "telefone": "11111111111",
  "cep": "11111111",
  "estado": "Estado ",
  "cidade": "Cidade ",
  "bairro": "Bairro ",
  "logradouro": "Logradouro ",
  "numero": "123",
  "complemento": "Complemento ",
  "latitude": "1.234",
  "longitude": "1.234"
}</code>


| res exemplo |
| ----------- |

400 - Bad Request Requisição com dados inválidos
409 - Conflict Usuário já possui um depósito cadastrado
409 - Conflict CNPJ/Email/Razao Social/Nome Fantasia já cadastrado
401 - Unauthorized "Usuário não autorizado
200 - OK 
<code>{
  "status": "ativo",
  "id": 1,
  "usuario_id": 1,
  "razao_social": "Razao Social",
  "cnpj": "12312317352332",
  "nome_fantasia": "Nome Fantasia",
  "email": "email@dodminio.com",
  "telefone": "11111111111",
  "celular": "11111111111",
  "cep": "11111111",
  "logradouro": "Logradouro ",
  "numero": "123 ",
  "bairro": "Bairro ",
  "cidade": "Cidade ",
  "estado": "Estado ",
  "complemento": "Complemento ",
  "latitude": "1.234",
  "longitude": "1.234",
  "updatedAt": "2023-07-22T00:06:22.115Z",
  "createdAt": "2023-07-22T00:06:22.115Z",
  "deletedAt": null,
  "usuarioId": 17
}</code>


## S08 ATUALIZAR DEPOSITO
| req exemplo |
| ----------- |

-----| HEADER |
| Authorization | token valido gerado no login ver #SO2


 -----| BODY |
<code>{
  "nome_fantasia": "Nome Fantasia",
  "celular": "11111111111",
  "telefone": "11111111111",
  "cep": "123123123",
  "estado": "Estado",
  "cidade": "Cidade",
  "bairro": "Bairro",
  "logradouro": "Logradouro",
  "numero": "123",
  "complemento": null,
  "latitude": 12.345,
  "longitude": 12.345
}</code>


| res exemplo |
| ----------- |

400 - Bad Request --> Erros de validaçao do body
403 - Forbidden Usuario não autorizado
403 - Forbidden Deposito esta inativo
404 - Not Found Deposito não encontrado
409 - Conflict nome_fantasia ja cadastrado
204 - No Content



## S09 ATUALIZAR STATUS DEPOSITO
| req exemplo |
| ----------- |

-----| HEADER |
| Authorization | token valido gerado no login ver #SO2


 -----| BODY |
<code>{
  "status":"ativo"
}</code>


| res exemplo |
| ----------- |

400 - Bad Request Id passado por parâmetro obrigatoriamente deve ser numérico
400 - Bad Request Nenhum dado valido para atualizar
404 - Not Found Depósito não encontrado
204 - No Content



## S10 LISTAR DEPOSITO
| req exemplo |
| ----------- |

-----| HEADER |
| Authorization | token valido gerado no login ver #SO2


 -----| QUERY PARAMS |
status = inativo/ativo || opcional se não informado devolve todos os depositos
 -----| BODY |
<code>{}</code>


| res exemplo |
| ----------- |

400 - Bad Request Status na query params inválido
401 - Unauthorized Usuario não autorizado
200 OK
<code>{
  "depositos_inativo": [],
}
{
  "depositos_ativo": []
}
{
  "depositos_inativo": []
}</code>


## S11 LISTAR DEPOSITO POR ID
| req exemplo |
| ----------- |

-----| HEADER |
| Authorization | token valido gerado no login ver #SO2


 -----| BODY |
{
}


| res exemplo |
| ----------- |

400 - Bad Request Id passado por parâmetro obrigatoriamente deve ser numérico
401 - Unauthorized Usuario não autorizado
404 - Not Found Deposito não encontrado 

200 - OK
<code>{
  "id": 19,
  "status": "ativo",
  "razao_social": "RazaoSocial2",
  "nome_fantasia": "Nome Fantass",
  "cnpj": "12345678951232",
  "email": "emr3esaA@dodmin2io.com",
  "celular": "11111111111",
  "telefone": "11111111111",
  "cep": "123123123",
  "estado": "Estado",
  "cidade": "Cidade",
  "bairro": "Bairro",
  "logradouro": "Logradouro",
  "numero": "123",
  "complemento": null,
  "latitude": "123",
  "longitude": "123",
  "usuario": {
    "nome": "Chaves",
    "email": "chaveta@gmail.com",
    "status": "ativo"
  }
}</code>


## S12 DELETAR DEPOSITO POR ID
| req exemplo |
| ----------- |

-----| HEADER |
| Authorization | token valido gerado no login ver #SO2


 -----| BODY |
{
}


| res exemplo |
| ----------- |

400 - Bad Request Id passado por parâmetro obrigatoriamente deve ser numérico
403 - Forbidden "Depósito esta ativo, não pode ser deletado"
403 - Forbidden"Depósito esta vinculado a algum medicamento, não pode ser deletado"
404 - Not Found "Depósito não encontrado"

204 - No Content



# ENDPOINTS MEDICAMENTOS

| ENDPOINT                                        | VERBO  | S## |
| ----------------------------------------------- | ------ | --- |
| /api/medicamentos                               | POST   | S13 |
| /api/medicamentos/:id                           | PATCH  | S14 |
| /api/medicamentos?tipo=controlado/naocontrolado | GET    | S15 |
| /api/medicamentos/:id                           | GET    | S16 |
| /api/medicamentos/:id                           | DELETE | S17 |



## S13 CADASTRAR MEDICAMENTO 
| req exemplo |
| ----------- |

-----| HEADER |
| Authorization | token valido gerado no login ver #SO2


 -----| BODY |
<code>{
    "nome_medicamento": "Nome",
    "nome_laboratorio" : "Laboratorio",
    "dosagem" : 200,
    "unidade_dosagem" : "mg",
    "tipo" : "Controlado",
    "preco_unitario" : 23.33,
    "descricao" : "Uma descriçao",
    "quantidade" : 600
  }</code>

| res exemplo |
| ----------- |

400 - Bad Request Requisição com dados inválidos
401 - Unauthorized Usuario não autorizado
424 - Failed Dependecy Você não tem um deposito cadastrado

200 - OK
<code>{
  "message": "Medicamento cadastrado com sucesso",
  "medicamento": {
    "id": 1,
    "nome_medicamento": "Nome",
    "nome_laboratorio": "Laboratorio",
    "descricao": "Uma descriçao",
    "dosagem": 200,
    "unidade_dosagem": "mg",
    "tipo": "Controlado",
    "preco_unitario": 23.33,
    "createdAt": "2023-07-21T19:19:24.947Z",
    "updatedAt": "2023-07-22T01:48:27.718Z",
    "deletedAt": null
  },
  "medicamento_deposito_novo": {
    "quantidade": 600,
    "medicamentoId": 1,
    "depositoId": 1,
    "updatedAt": "2023-07-22T01:48:27.755Z",
    "createdAt": "2023-07-22T01:48:27.755Z",
    "deletedAt": null
  }
}</code>

## S14 ATUALIZAR MEDICAMENTO
| req exemplo |
| ----------- |

-----| HEADER |
| Authorization | token valido gerado no login ver #SO2


 -----| BODY |
<code>{
    "preco_unitario" : 253.33,
    "descricao" : "Uma descriçao",
    "quantidade" : 600
}</code>


| res exemplo |
| ----------- |

400 - Bad Request Requisição com dados inválidos
400 - Bad Request Nenhum dado valido para atualizar
401 - Unauthorized Usuário não autorizado
404 - Not Found Não existe esse medicamento no seu deposito

200 OK
<code>{
  "id": 1,
  "nome_medicamento": "Nome",
  "nome_laboratorio": "Laboratorio",
  "descricao": "Uma descriçao",
  "dosagem": 200,
  "unidade_dosagem": "mg",
  "tipo": "Controlado",
  "preco_unitario": 253.33,
  "createdAt": "2023-07-21T19:19:24.947Z",
  "updatedAt": "2023-07-22T01:54:54.684Z",
  "deletedAt": null,
  "quantidade": 600
}</code>


## S15 LISTAR MEDICAMENTOS
| req exemplo |
| ----------- |

-----| HEADER |
| Authorization | token valido gerado no login ver #SO2
 -----| QUERY PARAMS |
tipo = controlado/naocontrolado || opcional se não informado devolve todos medicamentos



 -----| BODY |
<code>{}</code>


| res exemplo |
| ----------- |

401 - Unauthorized Usuário não autorizado

200 -
um array de medicamentos segundo o tipo


## S16 LISTAR MEDICAMENTO ID
| req exemplo |
| ----------- |

-----| HEADER |
| Authorization | token valido gerado no login ver #SO2


 -----| BODY |
<code>{}</code>


| res exemplo |
| ----------- |


400 - Bad Request Requisição com dados inválidos, o id do medicamento deve ser um numero
404 - Not Found Medicamento não encontrado
200 - OK 
<code>{
  "id": 1,
  "nome_medicamento": "Medicamento",
  "nome_laboratorio": "Laboratório",
  "descricao": "Descrição do medicamento",
  "dosagem": 1.2,
  "unidade_dosagem": "mL",
  "tipo": "Controlado",
  "preco_unitario": 12.5,
  "createdAt": "2021-07-11T00:00:00.000Z",
  "updatedAt": "2021-07-11T00:00:00.000Z",
  "deletedAt": null,
  "medicamento_depositos": [
    {
      "quantidade": 10,
      "deposito": {
        "nome_fantasia": "Fantasia",
        "logradouro": "Logradouro",
        "numero": "123",
        "bairro": "Bairro",
        "cidade": "Cidade",
        "estado": "Estado",
        "cep": "22222222"
      }
    }
  ]
}</code>

## S17 DELETAR MEDICAMENTO
| req exemplo |
| ----------- |

-----| HEADER |
| Authorization | token valido gerado no login ver #SO2


 -----| BODY |
{
}


| res exemplo |
| ----------- |

400 - Bad Request Requisição com dados inválidos, o id do medicamento deve ser um numero
401 -  Unauthorized
"Não é possivel deletar o medicamento pois ele esta associado a 1 deposito(s)"
404 - Not Found  Medicamento não encontrado

204 - No Content

