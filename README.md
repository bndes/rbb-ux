# Rbb-Ux

Biblioteca de componentes visuais para as aplicações da Rede Brasileira de Blockchain (RBB)

## Alterações na biblioteca

1. Sempre que forem criados novos componentes na biblioteca, utilizar o comando `ng g c component-name`.
2. Exportar os componentes no rbbux.module.ts e no public-api.ts

## Build

Use `ng build` para buildar a biblioteca. O caminho padrão para a build é `dist/`. 
Use `npm pack` para gerar um tarball.

IMPORTANTE: A cada alteração na biblioteca, esse processo deve ser repetido.

## Chamada dos componentes da biblioteca

Para utilizar os componentes da biblioteca em outras aplicações utilizar `<lib-componentname></lib-componentname>`
