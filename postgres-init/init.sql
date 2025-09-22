
-- Criação da tabela randomNumbers para armazenar números aleatórios gerados pelo node customizado no n8n.

CREATE TABLE randomNumbers (

    id SERIAL PRIMARY KEY,
    generatedNumber INT NOT NULL,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP

);