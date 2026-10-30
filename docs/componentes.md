# Componentes

Todos ficam em `src/components/<Nome>/<Nome>.jsx` e são exportados como `default`. Os componentes de país recebem o objeto **normalizado** retornado por `countriesApi.js` (veja [api.md](api.md#formato-normalizado)).

> **Pré-requisito:** a fonte Press Start 2P precisa estar carregada antes de renderizar componentes com texto:
>
> ```jsx
> import { PressStart2P_400Regular, useFonts } from '@expo-google-fonts/press-start-2p'
> const [fontsLoaded] = useFonts({ PressStart2P_400Regular })
> ```

## Base

### PixelBox
Caixa padrão do design: fundo `#EBEBEB`, borda preta de 5px e sombra dura deslocada 6px. Se receber `onPress`, vira botão e "afunda" ao ser pressionada.

| Prop | Tipo | Descrição |
|---|---|---|
| `children` | node | Conteúdo, centralizado por padrão |
| `onPress` | function | Torna a caixa pressionável |
| `style` | style | Estilo do container externo (use para `width`/`height`/`flex`) |
| `contentStyle` | style | Estilo da caixa interna (padding, direção etc.) |
| `accessibilityLabel`, `accessibilityState` | — | Repassados ao `Pressable` |

```jsx
<PixelBox style={{ height: 56 }} onPress={salvar}>
  <PixelText>Salvar</PixelText>
</PixelBox>
```

> A sombra é uma `View` desenhada atrás da caixa (o `elevation` do Android não faz sombra sem desfoque). Ela ocupa 6px além da caixa, então deixe esse espaço livre à direita e embaixo.

### PixelText
`Text` com a fonte pixel, centralizado.

| Prop | Tipo | Padrão |
|---|---|---|
| `size` | number | `16` |
| `color` | string | `colors.text` |
| `style` + demais props de `Text` | — | — |

## Navegação e busca

### SearchBar
Campo de busca com ícone de lupa. Mantém a mesma interface da versão anterior.

| Prop | Tipo | Padrão |
|---|---|---|
| `value` | string | — |
| `onChange` | `(texto) => void` | — |
| `onSubmit` | function | — |
| `placeholder` | string | `'Pesquise o país..'` |
| `style` | style | — |

### FavoriteButton
Botão quadrado com coração cheio (`active`) ou vazio.

| Prop | Tipo | Padrão |
|---|---|---|
| `active` | boolean | `false` |
| `onPress` | function | — |
| `width` / `height` | number | `48` / `48` |
| `iconSize` | number | `28` |

Também exporta `FavoriteIcon` (`{ active, size }`), só o ícone, sem caixa.

### BackButton
Botão circular de voltar (35×35). Props: `onPress`, `style`.

### ViewToggle
Par de botões grade/lista da tela de favoritos.

| Prop | Tipo | Padrão |
|---|---|---|
| `value` | `'grid' \| 'list'` | `'grid'` |
| `onChange` | `(modo) => void` | — |

## País

### CountryListItem
Linha do modo lista: bandeira + nome + coração.

### CountryGridCard
Card do modo blocos (154px de largura): bandeira com coração no canto + nome.

Ambos aceitam:

| Prop | Tipo | Descrição |
|---|---|---|
| `country` | objeto normalizado | Usa `name` e `flagUrl` |
| `favorite` | boolean | Estado do coração |
| `onPress` | function | Toque na bandeira/nome |
| `onToggleFavorite` | function | Toque no coração |

### CountryHeader
Topo da tela de resultado: nome + bandeira grande (254px). Prop: `country`.

### MapButton
"Ver no Mapa →" + ícone de globo.

| Prop | Tipo | Descrição |
|---|---|---|
| `url` | string | Aberta com `Linking.openURL` (use `country.mapUrl`) |
| `onPress` | function | Substitui a abertura da URL |

### InfoField
Bloco de informação: título em cima; ícone + valor embaixo. Mostra `—` quando o valor é `null`.

| Prop | Tipo | Descrição |
|---|---|---|
| `label` | string | Título |
| `value` | string | Valor |
| `icon` | string \| require | Chave de `infoIcons` ou imagem própria |

Ícones disponíveis (`infoIcons`): `capital`, `population`, `currency`, `continent`, `language`, `phone`, `area`, `hemisphere`.

```jsx
<InfoField icon="capital" label="Capital" value={country.capital} />
```

## Ilustração

### HeroText
Texto de destaque em fonte pixel com sombra branca. Padrão: "Descubra cada país do mundo". Props `children`, `size` (padrão `24`) e `style`.

### GlobeWithClouds
Globo pixel com duas nuvens, nas proporções da Splashscreen. Prop `width` (padrão `394`); a altura é calculada.

Para animar cada parte separadamente, passe `Animated.Value`s nos estilos `globeStyle`, `leftCloudStyle` e `rightCloudStyle` (são aplicados em wrappers, então não sobrescrevem a rotação da nuvem da direita). Veja `pages/Splash/Splash.jsx`.

### FlagMosaic
Arte do mosaico inclinado de bandeiras (`assets/images/bandeiras.png`, exportada do Figma) com fade na parte de baixo. A arte começa no topo e é cortada pela parte de baixo do `height`.

| Prop | Tipo | Padrão |
|---|---|---|
| `height` | number | `360` |
| `fadeColor` | string | `colors.background` |

## Componentes anteriores (mantidos)

Usados pela `Home` atual, ainda no visual antigo:

| Componente | Uso |
|---|---|
| `Header` | Barra de título do `App` |
| `CountryList` | `FlatList` de `CountryCard` (chave: `country.code`) |
| `CountryCard` | Card com bandeira, nome e capital |
| `Loading` | Indicador de carregamento com texto |

## Mapa Figma → componente

O arquivo Figma não usa componentes nativos (tudo é `Group`/frame), então o mapeamento foi feito por repetição visual nas telas finais:

| Tela do Figma | Componentes |
|---|---|
| Splashscreen | `GlobeWithClouds` |
| Tela Inicial | `FlagMosaic`, `SearchBar`, `FavoriteButton`, `HeroText`, `GlobeWithClouds` |
| Favoritos (modo lista) | `BackButton`, `ViewToggle`, `SearchBar`, `CountryListItem` |
| Favoritos (modo blocos) | `BackButton`, `ViewToggle`, `SearchBar`, `CountryGridCard` |
| Resultado da Pesquisa | `BackButton`, `SearchBar`, `CountryHeader`, `MapButton`, `InfoField` ×8 |
