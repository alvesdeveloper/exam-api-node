# EXAM-API

Abordagem de um relacionamento many-to-many, usando o contexto de exames e laboratórios.

Tecnologias/libs usadas:

1. typescript
2. node.js
3. express
4. typeORM
5. class-validator
6. docker


Depois de clonar o projeto, seguir as estapas abaixo:

1. Executar `yarn install`, isso instalará todas as dependencias do projeto;
2. Ter o docker instalado e executar `docker-compose up --build -d` para o arquivo docker-compose.yml. Isto criará o serviço de banco de dados e aplicação.
3. Para excutar a aplicação a partir do código use `yarn start:dev`
#

Seguem alguns exemplos de endpoint criados:

Create exam: `POST`
http://localhost:3000/api/exam

{
	"name": "exame 1",
	"type": "ANALISE"
}
#

Update exam: `PUT`
http://localhost:3000/api/exam/1

{
	"name": "exame 1",
	"type": "CLINICA",
	"isActive": true
}
#

Laboratory list by exam: `POST`
http://localhost:3000/api/exam/lablist

{
	"name": "exame 1"
}
#

Create laboratory `POST`
http://localhost:3000/api/laboratory

{
	"name": "Medical",
	"address": "Rua da esperança, 88 - Recife- PE"
}
#

Upadat laboratory `PUT`
http://localhost:3000/api/laboratory/1

{
	"name": "Medical",
	"address": "rua tamarineira, 38 - são paulo - SP",
	"isActive": true
}
#

Link exam with laboratory `POST`
http://localhost:3000/api/laboratory/link-exam

{
	"labName": "Medical",
	"examList": ["exame 1", "exame 2"]
}
#
