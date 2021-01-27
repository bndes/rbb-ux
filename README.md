# Rbb-Ux

Biblioteca de componentes visuais para as aplicações da Rede Brasileira de Blockchain (RBB)

## Alterações na biblioteca

1. Sempre que forem criados novos componentes na biblioteca, utilizar o comando `ng g c component-name`;
2. Exportar os componentes no rbbux.module.ts e no public-api.ts;

## Build

Usar `ng build` para buildar a biblioteca. O caminho padrão para a build é `dist`;
Usar `npm pack` para gerar um tarball;

IMPORTANTE: A cada alteração na biblioteca, esse processo deverá ser repetido.

## Chamada dos componentes da biblioteca

<!-- TODO: publicar npm? -->
1. Copiar o .tgz gerado na raiz do projeto, e utilizar `npm i rbbux-version.tgz`
2. No projeto onde a biblioteca será utilizada, rodar:
    `npm i ethers` |  `npm i @angular/material`  |  `npm i @angular/cdk`
3. Realizar o import do Rbbuxmodule no projeto.
4. Para utilizar os componentes da biblioteca em outras aplicações chamar usando o seletor específico de cada componente
