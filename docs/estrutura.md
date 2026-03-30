# V3 Partners Site — Documentação de Estrutura

## Páginas

| Arquivo | Descrição | Status |
|---|---|---|
| `index.html` | Home institucional | PRONTO |
| `sobre.html` | Quem somos, sócios, estrutura | A FAZER |
| `verticais.html` | Detalhamento das 4 verticais | A FAZER |
| `partners.html` | Planos R$197 / R$397 + checkout | A FAZER |
| `relatorios.html` | Relatórios públicos de inteligência | A FAZER |
| `members/dashboard.html` | Área restrita — Partners logados | A FAZER |

## Assets

| Arquivo | Descrição |
|---|---|
| `assets/css/style.css` | CSS global — identidade visual V3 completa |
| `assets/js/main.js` | JS utilitário — navbar, scroll, animações |
| `assets/img/logo.jpeg` | Logo oficial (copiar de Downloads) |

## Identidade Visual — Regras Fixas

- **Fonte:** DM Sans ÚNICA — nunca Montserrat, Inter, Bebas, Raleway
- **Regra 90/8/2:** 90% navy · 8% cream/muted · 2% ouro
- **NUNCA:** fundo branco, preto puro (#000), azul, vermelho, verde, laranja
- **Logo:** sempre o arquivo `logo.jpeg` — nunca recriar com SVG

## Fluxo de Membros (a implementar)

- Área pública: index, sobre, verticais, relatorios, partners
- Área restrita: members/dashboard (requer login)
- Serviço de auth: Memberstack ou Outseta (definir na próxima etapa)
- Cobrança: R$197/mês (Partner) · R$397/mês (Partner PRO)

## Deploy — Hostinger

1. Aprovar versão local via Live Server
2. Commit no Git com tag de versão
3. Upload via File Manager do hPanel
4. Apontar domínio v3partners.com.br
5. Ativar SSL gratuito no hPanel
