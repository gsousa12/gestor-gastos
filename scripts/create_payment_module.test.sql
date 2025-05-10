/* 

Scrip para testar o fluxo de pagamento.

Cria um supplier com debito de 1000 (10 reais)
Criar uma Expense de 500

*/

INSERT INTO public."Supplier" (id, name, company_name, tax_id, recurring_debit, contact_email, contact_phone, created_at, updated_at, deleted_at)
VALUES (DEFAULT, 'Fornecedor Teste', 'Empresa Teste', 'XX.XXX.XXX/XXXX-XX', 1000, 'email@contato.com', 'XXXXXXXXXXX', NOW(), NULL, NULL);

INSERT INTO public."Expense" (id, year, amount, created_at, updated_at, secretary_id, user_id, supplier_id, subsector_id, description, mouth, supplier_name)
VALUES (DEFAULT, '2025', 500, NOW(), NULL, 1, 1, 1, 1, 'Compra de materiais de escritório', 5, 'Papelaria Central');



SELECT * FROM public."Supplier";
SELECT * FROM public."Expense";
SELECT * FROM public."Payment";