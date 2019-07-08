-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 08-Jul-2019 às 14:39
-- Versão do servidor: 10.3.16-MariaDB
-- versão do PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `basedados`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbl_backup`
--

CREATE TABLE `tbl_backup` (
  `id` int(11) NOT NULL,
  `data` date NOT NULL,
  `nome` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbl_backup_equipamento`
--

CREATE TABLE `tbl_backup_equipamento` (
  `id` int(11) NOT NULL,
  `id_backup` int(11) NOT NULL,
  `id_equipamento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbl_configuracao`
--

CREATE TABLE `tbl_configuracao` (
  `Id` int(11) NOT NULL,
  `lag` varchar(500) NOT NULL,
  `ip` varchar(50) NOT NULL,
  `vlan` int(11) NOT NULL,
  `ospf` varchar(500) NOT NULL,
  `mpls` tinyint(1) NOT NULL,
  `pppoe_server` tinyint(1) NOT NULL,
  `ativa` tinyint(1) NOT NULL,
  `data_inicio` date NOT NULL,
  `data_fim` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tbl_configuracao`
--

INSERT INTO `tbl_configuracao` (`Id`, `lag`, `ip`, `vlan`, `ospf`, `mpls`, `pppoe_server`, `ativa`, `data_inicio`, `data_fim`) VALUES
(1, 'teste lag', '127.0.0.1', 1234, 'testes ospf', 1, 1, 1, '2019-07-08', '2019-07-22'),
(2, 'teste lag 2', '127.0.0.2', 12345, 'testes ospf', 2, 2, 2, '2019-07-01', '2019-07-08');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbl_configuracao_equipamento`
--

CREATE TABLE `tbl_configuracao_equipamento` (
  `id` int(11) NOT NULL,
  `id_configuracao` int(11) NOT NULL,
  `id_equipamento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tbl_configuracao_equipamento`
--

INSERT INTO `tbl_configuracao_equipamento` (`id`, `id_configuracao`, `id_equipamento`) VALUES
(1, 1, 1),
(2, 2, 2);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbl_datacenter`
--

CREATE TABLE `tbl_datacenter` (
  `id` int(11) NOT NULL,
  `id_endereco` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tbl_datacenter`
--

INSERT INTO `tbl_datacenter` (`id`, `id_endereco`) VALUES
(15, 1),
(16, 3);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbl_endereco`
--

CREATE TABLE `tbl_endereco` (
  `id` int(11) NOT NULL,
  `uf` varchar(2) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `rua` varchar(100) NOT NULL,
  `numero` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tbl_endereco`
--

INSERT INTO `tbl_endereco` (`id`, `uf`, `cidade`, `rua`, `numero`) VALUES
(1, 'rs', 'caxias', 'das flores', 77),
(3, 'rs', 'Bagé', 'eucaliptos', 777);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbl_equipamento`
--

CREATE TABLE `tbl_equipamento` (
  `id` int(11) NOT NULL,
  `num_serie` varchar(100) NOT NULL,
  `identity` varchar(100) NOT NULL,
  `versao_firmware` varchar(100) NOT NULL,
  `prefixo_backup` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tbl_equipamento`
--

INSERT INTO `tbl_equipamento` (`id`, `num_serie`, `identity`, `versao_firmware`, `prefixo_backup`) VALUES
(1, 'a0001', 'teste identity', 'teste v. firmware', 'teste prefixo backp'),
(2, 'a0002', 'teste identity2', 'teste v. firmware2', 'teste prefixo backp2');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbl_pagina`
--

CREATE TABLE `tbl_pagina` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `descricao` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tbl_pagina`
--

INSERT INTO `tbl_pagina` (`id`, `nome`, `descricao`) VALUES
(1, 'UsuarioCAD', 'Cadastro de usuários'),
(2, 'Usuario', 'Visualização de usuários'),
(3, 'equipamentoCAD', 'Cadastro de equipamentos'),
(4, 'equipamento', 'Visualização de equipamentos'),
(5, 'login', 'Página de Login'),
(6, 'index', 'Página home'),
(7, 'todas', 'Todas as páginas da aplicação');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbl_permissao`
--

CREATE TABLE `tbl_permissao` (
  `id` int(11) NOT NULL,
  `descricao` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tbl_permissao`
--

INSERT INTO `tbl_permissao` (`id`, `descricao`) VALUES
(1, 'administrador'),
(2, 'usuario');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbl_permissao_pagina`
--

CREATE TABLE `tbl_permissao_pagina` (
  `id` int(11) NOT NULL,
  `id_permissao` int(11) NOT NULL,
  `id_pagina` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tbl_permissao_pagina`
--

INSERT INTO `tbl_permissao_pagina` (`id`, `id_permissao`, `id_pagina`) VALUES
(3, 1, 7),
(4, 2, 3);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbl_rack`
--

CREATE TABLE `tbl_rack` (
  `id` int(11) NOT NULL,
  `identificador` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tbl_rack`
--

INSERT INTO `tbl_rack` (`id`, `identificador`) VALUES
(1, 'rack1'),
(2, 'rack2'),
(3, 'rack3'),
(4, 'rack4');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbl_rack_datacenter`
--

CREATE TABLE `tbl_rack_datacenter` (
  `id` int(11) NOT NULL,
  `id_datacenter` int(11) NOT NULL,
  `IdRack` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tbl_rack_datacenter`
--

INSERT INTO `tbl_rack_datacenter` (`id`, `id_datacenter`, `IdRack`) VALUES
(1, 15, 1),
(2, 15, 2),
(3, 16, 3),
(4, 16, 4);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbl_rack_equipamento`
--

CREATE TABLE `tbl_rack_equipamento` (
  `id` int(11) NOT NULL,
  `id_rack` int(11) NOT NULL,
  `id_equipamento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `tbl_usuario`
--

CREATE TABLE `tbl_usuario` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `login` varchar(100) NOT NULL,
  `senha` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `telefone` varchar(20) NOT NULL,
  `id_permissao` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tbl_usuario`
--

INSERT INTO `tbl_usuario` (`id`, `nome`, `login`, `senha`, `email`, `telefone`, `id_permissao`) VALUES
(1, 'Bruno Wrezinski', 'bruno', '1234', 'bruno@bruno.com', '(54)991000000', 1),
(2, 'Roberto Salcedo', 'roberto', '1234', 'roberto@roberto.com', '(54)991003627', 2);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `tbl_backup`
--
ALTER TABLE `tbl_backup`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_backup` (`id`);

--
-- Índices para tabela `tbl_backup_equipamento`
--
ALTER TABLE `tbl_backup_equipamento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_backup` (`id_backup`),
  ADD KEY `id_equipamento` (`id_equipamento`);

--
-- Índices para tabela `tbl_configuracao`
--
ALTER TABLE `tbl_configuracao`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `id_configuracao` (`Id`);

--
-- Índices para tabela `tbl_configuracao_equipamento`
--
ALTER TABLE `tbl_configuracao_equipamento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_configuracao` (`id_configuracao`),
  ADD KEY `id_equipamento` (`id_equipamento`);

--
-- Índices para tabela `tbl_datacenter`
--
ALTER TABLE `tbl_datacenter`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_datacenter` (`id`),
  ADD KEY `fk_endereco` (`id_endereco`);

--
-- Índices para tabela `tbl_endereco`
--
ALTER TABLE `tbl_endereco`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_endereco` (`id`);

--
-- Índices para tabela `tbl_equipamento`
--
ALTER TABLE `tbl_equipamento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_equipamento` (`id`);

--
-- Índices para tabela `tbl_pagina`
--
ALTER TABLE `tbl_pagina`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pagina` (`id`);

--
-- Índices para tabela `tbl_permissao`
--
ALTER TABLE `tbl_permissao`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_permissao` (`id`);

--
-- Índices para tabela `tbl_permissao_pagina`
--
ALTER TABLE `tbl_permissao_pagina`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_permissao` (`id_permissao`),
  ADD KEY `id_pagina` (`id_pagina`);

--
-- Índices para tabela `tbl_rack`
--
ALTER TABLE `tbl_rack`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_rack` (`id`);

--
-- Índices para tabela `tbl_rack_datacenter`
--
ALTER TABLE `tbl_rack_datacenter`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_rack` (`IdRack`),
  ADD KEY `id_datacenter` (`id_datacenter`);

--
-- Índices para tabela `tbl_rack_equipamento`
--
ALTER TABLE `tbl_rack_equipamento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_rack` (`id_rack`),
  ADD KEY `id_equipamento` (`id_equipamento`);

--
-- Índices para tabela `tbl_usuario`
--
ALTER TABLE `tbl_usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id`),
  ADD KEY `fk_permissao` (`id_permissao`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `tbl_backup`
--
ALTER TABLE `tbl_backup`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbl_backup_equipamento`
--
ALTER TABLE `tbl_backup_equipamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbl_configuracao`
--
ALTER TABLE `tbl_configuracao`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tbl_configuracao_equipamento`
--
ALTER TABLE `tbl_configuracao_equipamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tbl_datacenter`
--
ALTER TABLE `tbl_datacenter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `tbl_endereco`
--
ALTER TABLE `tbl_endereco`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `tbl_equipamento`
--
ALTER TABLE `tbl_equipamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tbl_pagina`
--
ALTER TABLE `tbl_pagina`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `tbl_permissao`
--
ALTER TABLE `tbl_permissao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `tbl_permissao_pagina`
--
ALTER TABLE `tbl_permissao_pagina`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `tbl_rack`
--
ALTER TABLE `tbl_rack`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `tbl_rack_datacenter`
--
ALTER TABLE `tbl_rack_datacenter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `tbl_rack_equipamento`
--
ALTER TABLE `tbl_rack_equipamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `tbl_usuario`
--
ALTER TABLE `tbl_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `tbl_backup_equipamento`
--
ALTER TABLE `tbl_backup_equipamento`
  ADD CONSTRAINT `fk_backup_equipamento` FOREIGN KEY (`id_backup`) REFERENCES `tbl_backup` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_equipamento_backup` FOREIGN KEY (`id_equipamento`) REFERENCES `tbl_equipamento` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tbl_configuracao_equipamento`
--
ALTER TABLE `tbl_configuracao_equipamento`
  ADD CONSTRAINT `fk_configuracao_equipamento` FOREIGN KEY (`id_configuracao`) REFERENCES `tbl_configuracao` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_equipamento_configuracao` FOREIGN KEY (`id_equipamento`) REFERENCES `tbl_equipamento` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tbl_datacenter`
--
ALTER TABLE `tbl_datacenter`
  ADD CONSTRAINT `fk_endereco` FOREIGN KEY (`id_endereco`) REFERENCES `tbl_endereco` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tbl_permissao_pagina`
--
ALTER TABLE `tbl_permissao_pagina`
  ADD CONSTRAINT `fk_pagina_permissao` FOREIGN KEY (`id_pagina`) REFERENCES `tbl_pagina` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_permissao_pagina` FOREIGN KEY (`id_permissao`) REFERENCES `tbl_permissao` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tbl_rack_datacenter`
--
ALTER TABLE `tbl_rack_datacenter`
  ADD CONSTRAINT `fk_datacenter_rack` FOREIGN KEY (`id_datacenter`) REFERENCES `tbl_datacenter` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_rack_datacenter` FOREIGN KEY (`IdRack`) REFERENCES `tbl_rack` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tbl_rack_equipamento`
--
ALTER TABLE `tbl_rack_equipamento`
  ADD CONSTRAINT `fk_equipamento_rack` FOREIGN KEY (`id_equipamento`) REFERENCES `tbl_equipamento` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_rack_equipamento` FOREIGN KEY (`id_rack`) REFERENCES `tbl_rack` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `tbl_usuario`
--
ALTER TABLE `tbl_usuario`
  ADD CONSTRAINT `fk_permissao` FOREIGN KEY (`id_permissao`) REFERENCES `tbl_permissao` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
