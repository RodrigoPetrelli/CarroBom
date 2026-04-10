-- SiteCarro - Script de criação do banco de dados
CREATE DATABASE IF NOT EXISTS sitecarro CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sitecarro;

CREATE TABLE IF NOT EXISTS carros (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  modelo        VARCHAR(100) NOT NULL,
  marca         VARCHAR(100) NOT NULL,
  ano           INT          NOT NULL,
  preco         DECIMAL(10,2) NOT NULL,
  quilometragem INT          NOT NULL,
  descricao     TEXT,
  imagem        VARCHAR(255),
  criado_em     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dados de exemplo
INSERT INTO carros (modelo, marca, ano, preco, quilometragem, descricao) VALUES
('Civic',   'Honda',      2020, 95000.00, 45000, 'Excelente estado, único dono, IPVA pago'),
('Corolla', 'Toyota',     2019, 98000.00, 55000, 'Revisado, com manual e chave reserva'),
('HB20',    'Hyundai',    2021, 72000.00, 20000, 'Modelo Sport, central multimídia'),
('Gol',     'Volkswagen', 2018, 48000.00, 80000, 'Bom estado, motor 1.0 flex'),
('Onix',    'Chevrolet',  2022, 85000.00, 15000, 'Automático, câmera de ré');
