-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 25/05/2024 às 23:47
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `institutocomar`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `lancamento`
--

CREATE TABLE `lancamento` (
  `cod_lanca` int(11) NOT NULL,
  `receita` varchar(45) NOT NULL,
  `despesa` varchar(45) NOT NULL,
  `cod_proj` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `possui`
--

CREATE TABLE `possui` (
  `cod_usu_proj` int(11) NOT NULL,
  `permissao` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `projeto`
--

CREATE TABLE `projeto` (
  `cod_proj` int(11) NOT NULL,
  `nome_proj` varchar(45) NOT NULL,
  `descricao_proj` varchar(45) NOT NULL,
  `nota_fiscal` varchar(150) NOT NULL,
  `saldo` float NOT NULL,
  `periodo` date NOT NULL,
  `valor` float NOT NULL,
  `lancamento` varchar(45) NOT NULL,
  `fornecedor` varchar(45) NOT NULL,
  `historico` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `relatorio`
--

CREATE TABLE `relatorio` (
  `cod_rela` int(11) NOT NULL,
  `titulo_rela` varchar(45) NOT NULL,
  `descricao_rela` varchar(150) NOT NULL,
  `saldo_inicial` float NOT NULL,
  `saldo_final` float NOT NULL,
  `periodo` date NOT NULL,
  `entrada` float NOT NULL,
  `saida` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `cod_user` int(11) NOT NULL,
  `nome_user` varchar(45) NOT NULL,
  `senha` varchar(45) NOT NULL,
  `data_nasc` date NOT NULL,
  `email` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `lancamento`
--
ALTER TABLE `lancamento`
  ADD PRIMARY KEY (`cod_lanca`),
  ADD KEY `cod_proj` (`cod_proj`);

--
-- Índices de tabela `possui`
--
ALTER TABLE `possui`
  ADD PRIMARY KEY (`cod_usu_proj`);

--
-- Índices de tabela `projeto`
--
ALTER TABLE `projeto`
  ADD PRIMARY KEY (`cod_proj`);

--
-- Índices de tabela `relatorio`
--
ALTER TABLE `relatorio`
  ADD PRIMARY KEY (`cod_rela`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`cod_user`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `lancamento`
--
ALTER TABLE `lancamento`
  MODIFY `cod_lanca` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `possui`
--
ALTER TABLE `possui`
  MODIFY `cod_usu_proj` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `projeto`
--
ALTER TABLE `projeto`
  MODIFY `cod_proj` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `relatorio`
--
ALTER TABLE `relatorio`
  MODIFY `cod_rela` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `cod_user` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `lancamento`
--
ALTER TABLE `lancamento`
  ADD CONSTRAINT `lancamento_ibfk_1` FOREIGN KEY (`cod_proj`) REFERENCES `projeto` (`cod_proj`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
