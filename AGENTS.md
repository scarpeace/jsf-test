# Orientações do projeto

Este repositório é um projeto de aprendizagem de JSF/Facelets, PrimeFaces, CDI Beans e integração com Spring Boot, JPA, PostgreSQL e Flyway. Ao explicar mudanças, conecte os conceitos ao ciclo de vida JSF e, quando ajudar, faça a ponte com React.

## Padrões de trabalho

- Mantenha Ponytail ligado por padrão em todo trabalho de código e revisão: prefira a menor solução que funcione, reutilize o que já existe e evite abstrações, dependências e infraestrutura especulativas. Só desligue se o usuário pedir explicitamente.
- Preserve o objetivo didático: favoreça código explícito e simples de seguir; explique conceitos novos sem construir camadas extras só para parecer mais arquitetado.
- Siga a organização existente: `domain`, `repository`, `service`, `web/beans`, `web/dto` e páginas/componentes Facelets em `src/main/resources/META-INF/resources`.
- Antes de editar arquivos compartilhados, confira e preserve alterações locais já existentes.
