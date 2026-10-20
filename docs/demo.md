# Página de demo

`src/pages/ComponentsDemo/ComponentsDemo.jsx` mostra todos os componentes numa única tela rolável, ligados à API real.

## Como abrir

No `.env`:

```env
EXPO_PUBLIC_COMPONENTS_DEMO=1
```

Depois rode `npm start`. O `src/main.jsx` registra a `ComponentsDemo` no lugar do `App`. Volte para `0` para abrir o app normal.

> Mudanças no `.env` exigem reiniciar o Metro (`npm start -- --clear`).

## O que dá para testar

| Seção | Interação |
|---|---|
| PixelBox / PixelText | Caixa estática e caixa pressionável |
| BackButton / ViewToggle | O voltar limpa o país selecionado; o toggle alterna grade/lista |
| SearchBar / FavoriteButton | A busca consulta a API (debounce de 400ms); o coração favorita o país selecionado |
| FlagMosaic | Usa as bandeiras do resultado atual |
| HeroText / GlobeWithClouds | Estáticos |
| CountryListItem / CountryGridCard | Os 6 primeiros resultados; toque seleciona, coração favorita |
| CountryHeader / MapButton / InfoField | Detalhes do país selecionado; "Ver no Mapa" abre o Google Maps |

A demo carrega a fonte sozinha e guarda os favoritos só em memória (não usa o `FavoritesContext`).
