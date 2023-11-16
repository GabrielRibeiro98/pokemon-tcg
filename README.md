# Arquitetura do Projeto e Funcionalidades

Este README fornece uma visão geral da arquitetura do projeto e destaca suas principais funcionalidades.

## Arquitetura do Projeto

O projeto é desenvolvido utilizando o Angular como framework front-end, Tailwind CSS para estilização, e Infragistics Ignite UI para componentes de interface do usuário.
- `Angular CLI 16.2.0`
- `Ignite UI 16.1.6`
- `Tailwindcss 3.3.5`


### Estrutura de Pastas

- `src/app/components`: Contém os componentes reutilizáveis, como app-header, app-card, etc.
- `src/app/features`: Agrupa os módulos relacionados a funcionalidades específicas, como deck-list, deck-form, deck-detail, etc.
- `src/app/shared`: Armazena módulos, componentes ou serviços compartilhados em toda a aplicação, como shared.module.
- `src/app/core`: Contém serviços centrais, modelos e lógica de negócios comuns.

### Módulos

- **Shared Module**: Agrupa os componentes, diretivas e pipes compartilhados em toda a aplicação. Isso ajuda na organização e evita a repetição de importações.
- **Features Modules**: Cada funcionalidade específica (como deck-list, deck-form, etc.) tem seu próprio módulo para encapsular componentes, serviços e rotas relacionadas a essa funcionalidade. Como o deck-detail e deck-edit são funcionalidades do deck-list, optei por não ter o próprio módulo e deixar encapsulado no deck-list.module.

### Serviços

- **ApiService**: Gerencia todas as interações com a API de Pokémon TCG. Inclui métodos para buscar cartas.

## Funcionalidades

### Lista de Baralhos (deck-list)

- Visualização dos baralhos existentes.
- Criação, edição e remoção de baralhos.
- Detalhes de um baralho específico, incluindo a contagem de Pokémon e cartas de treinador.

### Criação de Baralho (deck-form)

- Nomeação do baralho.
- Adição de cartas ao baralho, respeitando as regras de quantidade máxima e evitando duplicatas (Max. 4).

### Detalhes do Baralho (deck-detail)

- Exibição detalhada de um baralho específico, incluindo informações sobre Pokémon e cartas de treinador.

### Edição do Baralho (deck-edit)

- Editar o nome do baralho.
- Exclui cartas que você deseja.
- Adiciona cartas que você deseja.

### Componentes Reutilizáveis

- **Header (app-header)**: Barra de navegação principal.
- **Card (app-card)**: Componente reutilizável para exibir informações sobre uma carta.
- **Deck (app-deck)**: Componente reutilizável para exibir os decks e suas funcionalidades.

## Estilo

- Utilização do Tailwind CSS para um estilo moderno.
- Integração com o Ignite UI para componentes de interface ricos e interativos.

## Testes Unitários

- Realizei testes unitários nas principais funções, porém tive um problema na integração com o Jest.js então os testes não estão conseguindo ser detectados para a verificação da cobertura de testes. (Vou deixar como melhoria, mas da pra analisar a forma como realizo testes unitários).

## Como Executar o Projeto Localmente

1. Clone o repositório: `git clone https://github.com/seu-usuario/seu-repositorio.git`
2. Navegue até o diretório do projeto: `cd seu-repositorio`
3. Instale as dependências: `npm install`
4. Inicie o servidor de desenvolvimento: `ng serve`
5. Abra o navegador e acesse `http://localhost:4200/`

## Considerações finais

- Gostei muito de realizar o teste, mesmo com o desafio de conciliar o desenvolvimento com meu trabalho em tempo integral. O projeto proporcionou uma oportunidade valiosa para aplicar e aprimorar minhas habilidades técnicas, especialmente no contexto do Angular, Tailwind CSS e Ignite UI.

Dada a restrição de tempo, meu foco principal foi implementar as lógicas obrigatórias conforme os requisitos do teste. No entanto, reconheço que há espaço para melhorias, especialmente nas áreas de responsividade e estilização. Caso tivesse mais tempo, eu priorizaria essas melhorias para garantir uma experiência de usuário mais consistente em diferentes dispositivos e ambientes.

Agradeço pela oportunidade de participar deste desafio técnico e estou aberto a feedbacks construtivos para continuar aprendendo e evoluindo como desenvolvedor.

Atenciosamente, Gabriel Ribeiro de Jesus.
