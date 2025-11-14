# ONG Mãos Solidárias — Documentação Técnica

## Visão Geral

Site profissional para a ONG Mãos Solidárias, desenvolvido com HTML5 semântico, CSS3 moderno e JavaScript vanilla. O projeto segue práticas de acessibilidade WCAG 2.1 Nível AA, design responsivo (mobile-first), e está otimizado para produção.

## Estrutura do Projeto

```
Fundamentos-da-Web-e-Estrutura--o-de-Interfaces/
├── CSS/
│   └── style.css              # Stylesheet principal (design system + componentes)
├── JS/
│   └── scripts.js              # JavaScript vanilla (SPA router, validação, acessibilidade)
├── Imagens/                    # Imagens otimizadas
│   ├── unnamed.webp
│   ├── atuação.png
│   ├── marmitasd.png
│   └── ...
├── index.html                  # Homepage
├── projetos.html               # Página de projetos e doações
├── Cadastro.html               # Página de voluntariado (formulário)
├── .gitignore                  # Git ignore rules
├── README.md                   # Documentação (este arquivo)
└── ACCESSIBILITY.md            # Guia de acessibilidade
```

## Tecnologias

- **HTML5**: Semântica moderna (`<header>`, `<main>`, `<section>`, `<footer>`, roles ARIA)
- **CSS3**: Design System com custom properties, Grid/Flexbox, animações, dark mode
- **JavaScript (Vanilla)**: SPA router, validação de formulário, localStorage persistence, acessibilidade
- **Design**: Paleta neutra branco/cinza, tipografia grande (1rem base), espaçamento modular

## Recursos Principais

### 1. Design System

- **Cores**: Paleta neutra (`--color-primary-*`, `--color-secondary-*`)
- **Tipografia**: 5 tamanhos (`--fs-xxl` a `--fs-sm`), line-height ≥ 1.3
- **Espaçamento**: Escala modular 8px–64px
- **Sombras**: Soft (0.08 opacity) e strong (0.12 opacity) para hierarquia
- **Grid**: 12 colunas responsivas (5 breakpoints: 360px, 600px, 900px, 1200px, 1280px+)

### 2. Acessibilidade (WCAG 2.1 AA)

- ✅ **Contraste**: Textos ≥ 4.5:1 (preto #0f1419 sobre branco)
- ✅ **Navegação por Teclado**: Tab, Enter, Escape funcionam em botões, links, forms
- ✅ **Focus Visível**: `:focus-visible` com box-shadow clara (3px azul)
- ✅ **Skip Link**: Link "Pular para o conteúdo" no topo de cada página
- ✅ **Roles ARIA**: `<main role="main">`, labels em forms, `aria-expanded` em toggles
- ✅ **Leitura de Tela**: Semântica HTML + atributos ARIA; `.sr-only` para conteúdo invisível
- ✅ **Modo Escuro**: Dark theme com suficiente contraste (implementado em `:root@media`)
- ✅ **Alto Contraste**: Versão high-contrast com bordas e ícones reforçados

### 3. Funcionalidades Dinâmicas

- **SPA Router**: Cliques em links `.html` carregam partial (via fetch) sem full reload
- **Validação de Formulário**: Client-side checks (required, age ≥ 16, CPF pattern, etc.)
- **localStorage Persistence**: Dados de voluntários salvos localmente
- **Toast Notifications**: Mensagens de feedback (sucesso, erro)
- **Submenu Acessível**: (Removido da versão atual — nav simplificada com 3 links)

### 4. Responsividade

- **Mobile-First**: Arquivos únicos, CSS media queries ajustam para tamanhos maiores
- **5 Breakpoints**:
  - 360px–599px: Phone
  - 600px–899px: Tablet
  - 900px–1199px: Desktop
  - 1200px–1279px: Desktop Large
  - 1280px+: Extra Large
- **Grid 12 Colunas**: Utilitários `.row` + `.col-1` a `.col-12` demonstram responsividade

## Setup & Deploy

### Desenvolvimento Local

```bash
# Clonar ou navegar para o diretório
cd "Fundamentos-da-Web-e-Estrutura--o-de-Interfaces"

# Iniciar servidor HTTP simples (Python 3)
python -m http.server 8000

# Abrir navegador
open http://localhost:8000/index.html
```

### Otimização para Produção

Scripts minificadores devem ser rodados antes de deploy:

```bash
# Minificar CSS (usando csso-cli, terser, etc.)
npm run build:css    # Gera CSS/style.min.css

# Minificar JavaScript
npm run build:js     # Gera JS/scripts.min.js

# Minificar HTML (usando html-minifier)
npm run build:html   # Gera versões .min.html de cada página

# Otimizar Imagens (usando imagemin)
npm run build:images # Comprime PNG, JPG, WebP em Imagens/
```

### Versionamento (Git/GitHub)

#### Branching Strategy (GitFlow)

```
main (produção)
  ↑
release/v1.0.0
  ↑
develop (integração)
  ↑
feature/accessibility, feature/dark-mode, etc.
```

#### Commits Semânticos

```bash
git commit -m "feat: adicionar modo escuro com CSS variables"
git commit -m "fix: corrigir contraste em botões para WCAG AA"
git commit -m "docs: atualizar README com instruções de acessibilidade"
git commit -m "chore: minificar CSS e JavaScript para produção"
```

#### Release v1.0.0 (Exemplo)

```bash
git checkout -b release/v1.0.0 develop

# Ajustes finais de versão
npm version minor  # Atualiza package.json se existir

git commit -m "chore: preparar release v1.0.0"
git tag -a v1.0.0 -m "Versão 1.0.0 — WCAG 2.1 AA, SPA, acessibilidade completa"
git checkout main
git merge --no-ff release/v1.0.0
git push origin main --tags
```

## Acessibilidade — Detalhes Implementados

Veja `ACCESSIBILITY.md` para um guia completo.

### Checklist WCAG 2.1 AA

- [x] 1.4.3 Contrast (Minimum) — 4.5:1 ou superior
- [x] 2.1.1 Keyboard — Toda funcionalidade acessível por teclado
- [x] 2.1.3 Keyboard (No Exception) — Sem armadilhas de teclado
- [x] 2.4.7 Focus Visible — Indicador de foco claro
- [x] 4.1.2 Name, Role, Value — Semântica e ARIA apropriadas
- [x] Modo Escuro — Compatível com dark mode do SO

## Otimização para Produção

### Minificação

- **CSS**: Remover comentários, espaços em branco; gzip (gzip pode reduzir 70%)
- **JavaScript**: Ofuscar variáveis, remover comentários; gzip
- **HTML**: Remover espaços em branco desnecessários, comentários; manter semântica

### Compressão de Imagens

- **PNG**: Usar tools como `pngquant` ou `optipng` para reduzir paleta/metadados
- **JPG**: Usar `mozjpeg` para melhor razão compressão/qualidade
- **WebP**: Oferecer fallback para navegadores antigos
- **Tamanho Alvo**: Imagens < 500KB total

### Performance

- **Caching**: Headers `Cache-Control: max-age=31536000` para assets versionados
- **Lazy Loading**: `loading="lazy"` em imagens abaixo da dobra
- **Preload Crítico**: Fonte `Inter` em `<link rel="preload">`

## Páginas

### 1. `index.html` — Homepage

- Hero section com fundo suave branco/cinza
- "Números que Falam" (4 cards em grid 12-col)
- "Missão e Valores"
- "Por Que Apoiar"

### 2. `projetos.html` — Projetos & Doações

- 4 projeto cards (Cozinha Solidária, Saber para Crescer, Saúde, Primeiros Passos)
- Testemunhos (blockquotes)
- Como ser voluntário (CTA)
- Como Doar (PIX, transferência, recorrente)

### 3. `Cadastro.html` — Formulário de Voluntariado

- Formulário extenso (dados pessoais, endereço, interesse, motivação)
- Validação client-side
- localStorage persistence
- Toast feedback

## Contribuindo

### Branch Development

```bash
git checkout -b feature/nome-da-feature develop
# Fazer mudanças...
git add .
git commit -m "feat: descrição clara"
git push origin feature/nome-da-feature
# Abrir Pull Request para develop
```

### Testing

- Testar links SPA (clique em navegação)
- Validar formulário (erros de validação, localStorage)
- Testar navegação por teclado (Tab, Enter, Escape)
- Verificar contraste (usar Lighthouse, WAVE, Axe)
- Modo escuro (Settings → Display → Dark mode no SO)

## Licença

MIT License — Veja `LICENSE` para detalhes.

---

**Última atualização**: 14 de novembro de 2025  
**Versão**: 1.0.0-rc1 (Release Candidate)
