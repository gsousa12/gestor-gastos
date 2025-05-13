Ótima abordagem! Vamos analisar as melhores práticas para esse fluxo, considerando suas ferramentas (TanStack Query, Axios, Zustand) e o cenário do JWT via httpOnly cookie.

1. Autenticação com JWT via httpOnly Cookie
   Vantagem: Segurança, pois o token não fica acessível via JS (evita XSS).
   Implicação: Não é possível ler o token diretamente no frontend. Toda verificação de autenticação deve ser feita via requisições ao backend.
2. Estrutura recomendada para o fluxo de login
   a) Organização dos arquivos
   /api: Funções de requisição (ex: login, getCurrentUser)
   /store: Zustand store para estado global do usuário
   /hooks: Hooks customizados (ex: useAuth, useLoginMutation)
   /services: Configuração do Axios (instância, interceptors)
   /pages: Páginas (Login, Dashboard, etc)
   /components: Componentes reutilizáveis
   b) Fluxo de login
   Usuário envia email/senha pelo formulário.
   Chama a mutation do TanStack Query para o endpoint de login.
   Se sucesso:
   O backend retorna o cookie httpOnly automaticamente.
   O frontend não precisa salvar token, mas precisa saber se está autenticado.
   Recomenda-se: Após login, fazer uma requisição para /me ou /profile para buscar os dados do usuário autenticado e salvar no Zustand.
   Se erro:
   Exibe mensagem de erro no formulário.
   c) Como saber se está autenticado?
   No carregamento do app:
   Chamar um endpoint protegido (/me, /profile) para buscar os dados do usuário.
   Se retornar 200, está autenticado; se 401, não está.
   Salvar o estado do usuário no Zustand.
   Logout:
   Chamar endpoint de logout (se existir) ou limpar o estado do usuário no Zustand.
   d) Axios + TanStack Query
   Axios:
   Configurar baseURL, interceptors para tratar erros globais (ex: 401).
   Sempre enviar withCredentials: true para garantir que o cookie httpOnly seja enviado nas requisições.
   TanStack Query:
   Usar mutations para login/logout.
   Usar queries para buscar o usuário autenticado.
   Invalidação/refetch de queries após login/logout.
   e) Zustand
   Armazenar o estado do usuário (dados básicos, loading, erro).
   Métodos para setar/limpar usuário.
   f) Proteção de rotas
   Criar um componente de rota protegida que verifica o estado do usuário no Zustand (ou via query) e redireciona para login se não autenticado.
   Resumo do fluxo ideal
   Login:
   Mutation → backend → cookie httpOnly setado → refetch user → salvar user no Zustand.
   Verificação de auth:
   Query /me ao iniciar app → se 200, set user; se 401, redireciona para login.
   Logout:
   Mutation → backend limpa cookie → limpar user no Zustand → redirecionar para login.
   Proteção de rotas:
   Componente que verifica user no Zustand ou query.

Se quiser, posso detalhar a estrutura de pastas/arquivos ou sugerir nomes para hooks, stores e funções!
Quando quiser, seguimos para o código.
