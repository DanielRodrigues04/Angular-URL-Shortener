# Encurtador de URLs

Um aplicativo Angular simples e eficiente para encurtar URLs, funcionando completamente no frontend sem necessidade de backend.

## Funcionalidades

- ✂️ Encurta URLs longas em links mais curtos e fáceis de compartilhar
- 📋 Copia URLs encurtadas para a área de transferência com um clique
- 📱 Interface responsiva e amigável
- 📜 Histórico de URLs encurtadas
- 💾 Armazenamento local (localStorage) para persistência de dados
- ⚡ Rápido e leve, sem dependência de serviços externos

## Tecnologias Utilizadas

- Angular 19
- TypeScript
- RxJS
- LocalStorage API

## Como Executar

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```
3. Execute o projeto:
```bash
npm start
```
4. Abra o navegador em `http://localhost:4200`

## Como Usar

1. Cole uma URL longa no campo de entrada
2. Clique no botão "Encurtar URL"
3. Copie a URL encurtada usando o botão "Copiar URL"
4. Visualize seu histórico de URLs encurtadas na parte inferior da página

## Estrutura do Projeto

```
src/
├── main.ts              # Componente principal e bootstrap
├── url-shortener.service.ts  # Serviço de encurtamento
├── global_styles.css    # Estilos globais
└── index.html          # Página HTML principal
```

## Limitações

- Por ser uma solução puramente frontend, as URLs encurtadas só funcionam no navegador onde foram criadas
- O armazenamento é limitado ao localStorage do navegador
- As URLs encurtadas são perdidas ao limpar o cache do navegador

## Contribuindo

Sinta-se à vontade para contribuir com o projeto! Algumas ideias de melhorias:

- Adicionar suporte para exportação/importação de URLs
- Implementar estatísticas de uso
- Adicionar suporte para personalização de URLs curtas
- Melhorar a validação de URLs

## Licença

Este projeto está sob a licença MIT.
