# API de países

O app usa a [REST Countries v5](https://restcountries.com/docs) via **axios**, em `src/services/countriesApi.js`. Não há mais chamadas com `fetch` nem uso da v3.1.

## Configuração

A chave vai no `.env` (já ignorado pelo git):

```env
EXPO_PUBLIC_RESTCOUNTRIES_KEY=rc_live_...
```

O cliente envia `Authorization: Bearer <chave>` com timeout de 10s.

> Variáveis `EXPO_PUBLIC_*` são embutidas no bundle do app e podem ser extraídas. Não trate a chave como secreta; para protegê-la de fato, seria preciso um backend intermediário.

## Funções

### `searchCountries(query, { limit = 25, offset = 0 })`
Busca países e retorna um array **normalizado**. Aceita nomes em português ("japão", "brasil"). Com `query` vazia, lista na ordem alfabética do nome em inglês (por isso "Samoa Americana" aparece logo após "Argélia").

```js
import { searchCountries } from '../services/countriesApi.js'

const paises = await searchCountries('brasil')
```

Erros do axios são propagados (`err.response?.data?.message` traz a mensagem da API).

### `normalizeCountry(raw)`
Converte um objeto da v5 para o formato usado pelos componentes. Exportada para uso em testes ou outras chamadas.

## Formato normalizado

```js
{
  code: 'BRA',                                   // codes.alpha_3 — use como chave
  name: 'Brasil',                                // translations.por, senão names.common
  flagUrl: 'https://flags.restcountries.com/v5/w640/br.png',
  capital: 'Brasília',
  population: '214.211.951',                     // formatado pt-BR
  currency: 'Brazilian real (R$)',               // nome vem em inglês da API
  continent: 'América do Sul',                   // traduzido
  language: 'português',                         // native_name do 1º idioma
  callingCode: '+55',
  area: '8.515.767 km²',
  hemisphere: 'Sul Ocidental',                   // pelas coordenadas do país
  mapUrl: 'https://goo.gl/maps/...',             // links.google_maps ou lat/lng
}
```

Campos ausentes na API ficam `null`.

## Limitações

- **Paginação:** a API devolve no máximo 25 itens por chamada (`data.meta.more` indica se há mais). Para listar todos, itere com `offset`.
- **Moeda:** o nome vem só em inglês.
- **Hemisfério:** calculado a partir de `coordinates` (centro do país), então países que cruzam o Equador/Greenwich aparecem no hemisfério do seu centro.

## Uso nas telas

A `Home` pesquisa direto na API conforme o usuário digita, com debounce de 400ms. A tela `Favorites` filtra localmente os países armazenados em `FavoritesContext`, comparando os nomes em português sem diferenciar acentos.
