INSERT INTO public."User" (
  name,
  email,
  password,
  created_at,
  updated_at,
  deleted_at,
  is_active
) VALUES (
  'Zezinho',
  'teste@email.com',
  '$2a$10$zFsWhYCmxyXTq62/EAUaRuBfC9qSC7QS/CmXRGP9mnN7UGUTJw9D6',
  NOW(),
  NULL,
  NULL,
  TRUE
);
