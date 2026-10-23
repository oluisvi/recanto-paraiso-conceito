# Recanto Paraíso — conceito de presença digital

Protótipo mobile-first em português, com três direções visuais interativas na mesma página. Site estático, sem etapa de build.

## Projeto publicado

- GitHub Pages: https://oluisvi.github.io/recanto-paraiso-conceito/
- Repositório: https://github.com/oluisvi/recanto-paraiso-conceito
- No topo da página, use os botões para alternar entre Trilha Viva, Caderno de Campo e Portal Paraíso.

## Conteúdo e navegação

O protótipo organiza as opções divulgadas de passeio (1h e 3h), preços e inclusões conforme as artes fornecidas, apresenta a vivência de R$ 100 como opção com detalhes a confirmar, informa orientações de visita e inclui endereço com mapa incorporado e link de rotas. A consulta abre uma mensagem preparada no WhatsApp; não confirma reserva automaticamente.

As opções e condições devem ser reconfirmadas pelo Recanto antes de uma publicação final. O endereço e o pin no mapa devem ser confirmados pela equipe.

## Arquivos

- `index.html`: conteúdo dos três layouts.
- `styles.css`: temas, responsividade, motion e suporte a movimento reduzido.
- `script.js`: seletor de design, consulta via WhatsApp e lightbox das artes.
- `assets/`: fotos e artes promocionais compartilhadas pelo cliente, com recortes limpos usados como fotografias.
- `BRIEF_DO_PROJETO.md`: fatos observados, hipótese de oportunidade e pontos a confirmar.
- `MENSAGEM_DE_PROPOSTA.md`: mensagem preparada para apresentação.

## Uso de imagens

As artes foram fornecidas pelo lead. Confirme autorização para o uso das fotos em publicação pública e no site final. As informações das artes são um ponto de partida e precisam de confirmação antes do lançamento.

## Detalhes técnicos

Não há dependências instaláveis. O layout segue uma abordagem mobile-first e permanece utilizável sem Google Fonts, usando fontes de sistema como fallback. As seções entram progressivamente ao rolar e a troca de conceito tem transição própria. O movimento privilegia opacidade e transformações leves; `prefers-reduced-motion` desativa as animações para quem prefere movimento reduzido.

