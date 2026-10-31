# Catálogo de Filmes

Catálogo de filmes com busca, paginação, página de detalhes e lista de favoritos, feito com **Next.js**, **TypeScript** e a API do **TMDB**.

**Site no ar:** https://projeto-catalogo-filmes-ffc.vercel.app

## Funcionalidades

- Lista de filmes populares com paginação por URL (`/?page=2`), que permite compartilhar o link e usar o botão voltar
- Busca por título, com a busca preservada ao trocar de página
- Página de detalhes (`/filme/[id]`) com pôster, sinopse, gêneros, duração e nota
- Título, descrição e imagem de compartilhamento (Open Graph) próprios em cada filme
- Favoritos salvos no navegador (`localStorage`), com página dedicada e sincronização entre abas
- Páginas de "filme não encontrado" e de erro com botão para tentar de novo
- Esqueletos de carregamento, layout responsivo e tema escuro

## Tecnologias

- Next.js (App Router) com TypeScript
- Tailwind CSS
- API do [TMDB](https://www.themoviedb.org/)
- Jest e React Testing Library (testes de componentes)
- Cypress (teste de ponta a ponta)
- Deploy na Vercel

## Decisões técnicas

**Dados buscados no servidor.** A página inicial e a de detalhes são Server Components assíncronos: a chamada à API acontece no servidor e o navegador recebe HTML pronto, o que ajuda no SEO e no tempo de carregamento. O token do TMDB fica numa variável de ambiente sem o prefixo `NEXT_PUBLIC_`, e o módulo que fala com a API usa o pacote `server-only`, que faz o build falhar caso alguém o importe em código de navegador.

**Camada de API isolada.** Toda a comunicação com o TMDB está em `src/lib/tmdb.ts`, com tipos, tratamento de erros (inclusive o 404 de filme inexistente) e uma função genérica de requisição. O tipo `Movie` e a função `posterUrl`, que o navegador também usa, ficam em `src/lib/movie.ts`, separados do código de servidor.

**Cache.** O projeto usa Cache Components do Next.js. Os detalhes de cada filme são cacheados com `"use cache"` e `cacheLife("hours")`, e as demais chamadas usam `revalidate` de 1 hora, reduzindo requisições à API.

**Suspense e parâmetros de URL.** Como `searchParams` e `params` só existem no momento da requisição, a página não os lê diretamente: ela os repassa como Promise para um componente filho dentro de `<Suspense>`, com um esqueleto como fallback. Esse é o padrão recomendado pelo Next.js para evitar que a navegação bloqueie.

**Favoritos sem `useEffect`.** O hook `useFavorites` lê o `localStorage` com `useSyncExternalStore`. Isso evita erro de hidratação (o servidor renderiza sem favoritos e o navegador depois os lê), mantém as abas sincronizadas pelo evento `storage` e trata o caso de o armazenamento estar indisponível.

**Imagens.** Os pôsteres usam `next/image` com tamanhos do TMDB (`w342`), o atributo `sizes` e `priority` nas primeiras imagens da lista.

## Qualidade

### Testes

- **Jest + React Testing Library:** componentes `Pagination`, `MovieCard` e `FavoriteButton` (incluindo a gravação no `localStorage`) e a função `posterUrl`. Os testes buscam elementos por papel e nome acessível, como um usuário os perceberia.
- **Cypress:** fluxo completo (buscar, abrir um filme, favoritar e conferir na lista de favoritos) e a página de "não encontrado". O teste usa o TMDB de verdade.

```bash
npm test          # Jest
npm run e2e       # Cypress (com o site rodando)
```

### Lighthouse (site em produção)

Medido no site publicado, em modo mobile com simulação de rede lenta, 3 execuções por página (mediana):

| Página | Performance | Acessibilidade | Boas práticas | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| Inicial | 98 | 100 | 100 | 100 | 2,26 s | 0,061 |
| Detalhes | 99 | 100 | 100 | 100 | 2,2 s | 0 |
| Favoritos | 98 | 100 | 100 | 100 | 2,09 s | 0,083 |

Durante o desenvolvimento, em medições locais, o CLS da página inicial chegou a 0,937 na pior execução e a economia estimada em imagens era de 833 KiB. Depois de usar imagens no tamanho certo (`w342` com `sizes`), `priority` nas primeiras imagens e esqueletos de carregamento, o CLS local caiu para 0 e a economia estimada para 305 KiB.

Os alertas que restaram no relatório (JavaScript não usado e legado, CSS que bloqueia a renderização) vêm do próprio framework ou têm impacto muito pequeno.

## Como rodar localmente

Requisitos: Node.js 20.9 ou superior e uma conta gratuita no TMDB.

1. Clone o repositório e instale as dependências:

   ```bash
   git clone <URL-DO-REPOSITORIO>
   cd <PASTA-DO-PROJETO>
   npm install
   ```

2. Crie o arquivo `.env.local` na raiz, com o **API Read Access Token** do TMDB (veja `.env.example`):

   ```
   TMDB_TOKEN=seu_token_aqui
   ```

3. Rode em desenvolvimento:

   ```bash
   npm run dev
   ```

   Ou a versão de produção:

   ```bash
   npm run build
   npm start
   ```

   Abra http://localhost:3000.

## Estrutura

```
src/
├── app/
│   ├── page.tsx              # página inicial (lista e busca)
│   ├── favoritos/            # página de favoritos
│   ├── filme/[id]/           # detalhes do filme, 404 e metadados
│   ├── error.tsx
│   └── layout.tsx
├── components/               # MovieCard, MovieList, Pagination, SearchBar, FavoriteButton, esqueletos
└── lib/
    ├── tmdb.ts               # acesso à API (somente servidor)
    ├── movie.ts              # tipo Movie e posterUrl
    └── useFavorites.ts       # hook de favoritos
cypress/e2e/                  # teste de ponta a ponta
```

## Limitações conhecidas

- Os favoritos ficam no navegador do usuário. Não há login nem sincronização entre dispositivos.
- A página de favoritos só mostra os filmes depois que o navegador lê o `localStorage`, por isso ela usa um esqueleto de carregamento.
- A busca e a paginação seguem os limites do TMDB (no máximo 500 páginas).

## Próximos passos

- Filtro por gênero e página de filmes em alta
- Alternância entre tema claro e escuro
- Testes de componentes para a lista de favoritos

## Créditos

Este produto usa a API do TMDB, mas não é endossado nem certificado por ele.