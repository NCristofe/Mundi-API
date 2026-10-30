# Design

Fonte: Figma [Design UI - UX](https://www.figma.com/design/xxALgJnXR0Mk4vuIMhTmez/Design-UI---UX), página **Wireframe**. As telas finais são as da linha de baixo: Splashscreen, Favoritos (lista e blocos), Tela Inicial e Resultado da Pesquisa.

## Tokens (`src/components/theme.js`)

| Token | Valor | Uso |
|---|---|---|
| `colors.background` | `#D1FFF2` | Fundo das telas |
| `colors.backgroundAlt` | `#79FFD9` | Verde-água alternativo |
| `colors.surface` | `#EBEBEB` | Fundo das caixas |
| `colors.border` | `#000000` | Bordas |
| `colors.shadow` | `rgba(0,0,0,0.54)` | Sombra dura |
| `colors.text` | `#030000` | Texto |
| `colors.placeholder` | `#9A9B9B` | Placeholder / estados inativos |
| `pixel.borderWidth` | `5` | Borda das caixas |
| `pixel.shadowOffset` | `6` | Deslocamento da sombra |

## Tipografia

**Press Start 2P** (`@expo-google-fonts/press-start-2p`), identificada nos textos do Figma.

| Uso | Tamanho |
|---|---|
| HeroText | 24 |
| Títulos/valores de `InfoField`, botões | 16 |
| Placeholder da busca | 10 |
| Nomes nos cards de favoritos | 8 |

## Assets

| Arquivo | Origem |
|---|---|
| `assets/images/globe.png`, `cloud.png` | Imagens originais da Splashscreen |
| `assets/icons/capital.png` … `area.png`, `globe.png`, `heart-filled.png` | Recortados da folha de sprites do Figma (células de 32px) |
| `assets/icons/heart-outline.png`, `back-circle.png` | Recortados de uma segunda folha de sprites |
| `assets/icons/search.png`, `back-arrow.png` | Vetores do Figma rasterizados para PNG |

Os ícones são pixel art ampliados por *nearest-neighbor* (4× ou 6×) para continuarem nítidos. Os PNGs evitam a dependência de `react-native-svg`.

As bandeiras **não** são assets: vêm da API (`flagUrl`).

## Decisões e diferenças em relação ao Figma

- **FlagMosaic:** usa a arte exportada do nó `75:10875` do Figma (`assets/images/bandeiras.png`). Antes, o mosaico era montado com bandeiras da API.
- **HeroText:** usa a fonte pixel com o texto "Descubra cada país do mundo", no lugar de "Digite o nome de um país" do Figma.
- **Barra de navegação:** fica oculta no Android, para a barra de gestos não aparecer como uma linha branca sobre o globo.
- **Coração da Home:** usa `assets/icons/heart.png` (28px). Fica com fundo `backgroundAlt` quando o filtro de favoritos está ativo.
- **ViewToggle:** o Figma não define estado selecionado; o ícone inativo fica cinza (`colors.placeholder`).
- **CountryGridCard:** o coração fica sobreposto no canto superior direito da bandeira.
- **PixelBox pressionado:** desloca 3px na direção da sombra, como feedback de toque (não existe no Figma).
- **Dados de exemplo do Figma** ("Xique-Xique", "67 TRILHÕES", "Bitcoin (R$)") são placeholders; os valores reais vêm da API.

## Sugestão para o Figma

Para facilitar a manutenção, transforme os elementos repetidos em componentes do Figma (`Ctrl+Alt+K`) com os mesmos nomes do código (`SearchBar`, `InfoField`, `CountryListItem`…) e variantes para estados (`FavoriteButton` `active=true/false`, `ViewToggle` `grid/list`).
