# Documentação — Mundi

App mobile (Expo / React Native) para consultar países, com visual pixel art retrô baseado no Figma [Design UI - UX](https://www.figma.com/design/xxALgJnXR0Mk4vuIMhTmez/Design-UI---UX).

| Documento | Conteúdo |
|---|---|
| [componentes.md](componentes.md) | Catálogo dos componentes, props e exemplos |
| [api.md](api.md) | Serviço da REST Countries (axios), formato dos dados e configuração da chave |
| [design.md](design.md) | Tokens do Figma, fonte, origem dos assets e decisões tomadas |
| [demo.md](demo.md) | Como rodar a página de demo dos componentes |

## Início rápido

```bash
npm install
cp .env.example .env   # preencha EXPO_PUBLIC_RESTCOUNTRIES_KEY
npm start
```

## Estrutura

```
src/
├── assets/
│   ├── icons/          ícones pixel exportados do Figma
│   └── images/         globo, nuvem e logo
├── components/         um componente por pasta + theme.js (tokens)
├── context/            FavoritesContext
├── pages/
│   ├── Splash/         splashscreen animada (globo gira, nuvens entram depois, ~4,5s), chama onFinish ao terminar
│   ├── Home/           tela inicial (mosaico de bandeiras, busca, globo)
│   ├── CountryResult/  resultado da pesquisa (dados do país, mapa e nova busca)
│   ├── CountryMap/     mapa do país (Leaflet em WebView, com imagens da Esri)
│   ├── Favorites/      tela de favoritos (busca local e lista)
│   └── ComponentsDemo/ vitrine dos componentes
├── services/
│   └── countriesApi.js cliente axios da REST Countries v5
├── App.jsx
└── main.jsx            escolhe entre App e ComponentsDemo
```
