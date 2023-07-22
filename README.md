# Projeto-BackEnd
FullStack [Itaguaçu] Módulo 2 - Projeto Avaliativo


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
{
    "nome" : "Nome",
    "sobrenome" : "Sobrenome",
    "data_nascimento" : "9999-12-31",
    "cpf" : "12345678901",
    "email" : "email@dominio.com",
    "senha" : "Senhafor7&",
    "telefone" : "123456789012345",
     //opcional "genero" : "genero"
  }

| res exemplo |
| ----------- |

400 - Bad Request  Requisição com dados inválidos
409 - Conflict  CPF já cadastrado
409 - Conflict  Emails já cadastrado

201 - Created
{
  "message": "Usuário cadastrado com sucesso",
  "identificador": 1,
  "status": "ativo"
}


## S02 LOGIN DE USUARIOS
| req exemplo |
| ----------- |

{
"email" : "email@dominio.com",
"senha" : "Senhafor7&"
}


| res exemplo |
| ----------- |

400 - Bad Request Requisição com dados inválidos
404 - Not Found Usuário não encontrado

200 OK 
{
  "token": "eyJhbGciOiJsdfIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJhdGl2byIsImlkIjoxNywiaWF0IjoxNjg5OT
  c5NzYwLCJleHAiOjE2OTAwNjYxiiisdfsnkoyueyurwejB9.6rItLA0gs9tJWcjV7HrQ7IYSAn-LIeMgzuDd6iPBKqY"
}


## S03 ATUALIZAR USUARIO
| req exemplo |
| ----------- |

-----| HEADER |
| Authorization | token valido gerado no login ver #SO2


 -----| BODY |
{
//opcional "nome" : "Nome",
//opcional  "sobrenome" : "sobnome",
//opcional  "telefone" : "123456789012345",
//oipcional "genero" : "genero"
  }


| res exemplo |
| ----------- |

400 - Bad Request Nenhum dado valido para atualizar foi recebido
401 - Unauthorized Sem permissão para atualizar este usuário

202 Accepted 
{
  "message": "Usuário 1 atualizado com sucesso",
  "updated": {
    "nome": "Nome",
    "sobrenome": "Nome ",
    "genero": "genero",
    "telefone": "123456789012345"
  }
}


## S04 ATUALIZAR STATUS USUARIO
| req exemplo |
| ----------- |

-----| HEADER |
| Authorization | token valido gerado no login ver #SO2


 -----| BODY |
{
  "status" : "ativo"
}


| res exemplo |
| ----------- |

400 - Bad Request status não informado / invalido
401 - Unauthorized Sem permissão para este endpoint
401 - Unauthorized Voce nao pode mudar seu status, contate um administrador...
404 - Not Found Usuário não encontrado
200 OK
{
  "message": "Usuario com id 1 atualizado com o status : ativo/inativo"
}


## S05 ATUALIZAR SENHA USUARIO
| req exemplo |
| ----------- |

-----| HEADER |
| Authorization | token valido gerado no login ver #SO2


 -----| BODY |
{
  "senha" : "umaSenham1T0fort@"
}


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
{}


| res exemplo |
| ----------- |

400 - Bad Request  O id X informado não é um número 
404 - Not Found Usuário não encontrado
200 OK 
{
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
}


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
{
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
}


| res exemplo |
| ----------- |

400 - Bad Request Requisição com dados inválidos
409 - Conflict CNPJ/Email/Razao Social/Nome Fantasia já cadastrado
401 - Unauthorized "Usuário não autorizado
200 - OK 
{
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
}


## S08 ATUALIZAR DEPOSITO
| req exemplo |
| ----------- |

-----| HEADER |
| Authorization | token valido gerado no login ver #SO2


 -----| BODY |
{
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
}


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
{
  "status":"ativo"
}


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
{
}


| res exemplo |
| ----------- |

400 - Bad Request Status na query params inválido
401 - Unauthorized Usuario não autorizado
200 OK
{
  "depositos_inativo": [],
}


200 OK
{
  "depositos_ativo": []
}


200 OK
{
  "depositos_inativo": []
}


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
{
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
}


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
{
    "nome_medicamento": "Nome",
    "nome_laboratorio" : "Laboratorio",
    "dosagem" : 200,
    "unidade_dosagem" : "mg",
    "tipo" : "Controlado",
    "preco_unitario" : 23.33,
    "descricao" : "Uma descriçao",
    "quantidade" : 600
  }

| res exemplo |
| ----------- |

400 - Bad Request Requisição com dados inválidos
401 - Unauthorized Usuario não autorizado
424 - Failed Dependecy Você não tem um deposito cadastrado

200 - OK {
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
}

## S14 ATUALIZAR MEDICAMENTO
| req exemplo |
| ----------- |

-----| HEADER |
| Authorization | token valido gerado no login ver #SO2


 -----| BODY |
{
    "preco_unitario" : 253.33,
    "descricao" : "Uma descriçao",
    "quantidade" : 600
}


| res exemplo |
| ----------- |

400 - Bad Request Requisição com dados inválidos
400 - Bad Request Nenhum dado valido para atualizar
401 - Unauthorized Usuário não autorizado
404 - Not Found Não existe esse medicamento no seu deposito

200 OK{
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
}


## S15 LISTAR MEDICAMENTOS
| req exemplo |
| ----------- |

-----| HEADER |
| Authorization | token valido gerado no login ver #SO2
 -----| QUERY PARAMS |
tipo = controlado/naocontrolado || opcional se não informado devolve todos medicamentos



 -----| BODY |
{
}


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
{
}


| res exemplo |
| ----------- |


400 - Bad Request Requisição com dados inválidos, o id do medicamento deve ser um numero
404 - Not Found Medicamento não encontrado
200 - OK {
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
}


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

