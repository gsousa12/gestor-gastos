Sua proposta está excelente e segue ótimos padrões de UX, performance e arquitetura!
Aqui estão os pontos positivos e sugestões para deixar ainda mais robusto:

Pontos Fortes da Sua Proposta

Busca única e cache:
Buscar os dados (fornecedores, secretarias, subsetores, usuários) apenas uma vez e manter em cache/estado global evita requisições desnecessárias e melhora a experiência do usuário.

Selects controlados por id:
Exibir o nome no select, mas enviar o id no payload, é o padrão ideal para relacionamentos.

Separação de responsabilidades:
O componente de conteúdo do popup (CreateExpensePopupContent) fica responsável apenas pela UI e lógica de formulário, enquanto a busca e o cache dos dados ficam em hooks ou stores globais.

Mock de userId:
Deixar o userId mockado por enquanto é prático para desenvolvimento, e depois você pode integrar com o contexto de autenticação.

Sugestões para aprimorar ainda mais

Use React Query ou Zustand para cache:

Se usar React Query, configure o staleTime para manter os dados frescos por um tempo razoável (ex: 5-10 minutos).
Se usar Zustand, armazene as listas no store global e só busque se estiverem vazias.

Carregamento otimista:

Mostre um loading spinner ou skeleton nos selects enquanto os dados estão carregando.

Revalidação ao voltar para a página:

Se usar React Query, a revalidação automática já acontece ao focar a aba, mas você pode customizar para buscar apenas se os dados expiraram.

Reutilização dos dados:

Se outros lugares do app também usam essas listas (ex: cadastro de fornecedor), o cache global vai beneficiar toda a aplicação.

Acessibilidade:

Use selects acessíveis (ex: Combobox do shadcn/ui) para facilitar busca e navegação por teclado.

Validação:

Valide o formulário antes de enviar, garantindo que todos os campos obrigatórios estejam preenchidos.
Resumo

Sua abordagem é moderna, performática e escalável.
A única sugestão é usar uma solução de cache global (React Query ou Zustand) para as listas, e garantir UX suave com loading e validação.

Se quiser, posso sugerir a estrutura dos hooks e stores para esse fluxo!
