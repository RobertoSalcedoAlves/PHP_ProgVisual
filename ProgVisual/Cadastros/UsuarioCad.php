<html>
    <head>
        <meta charset="UTF-8">
        <title>Cadastro de Usuário</title>
    </head>
    <body>
        <?php if (!$_POST){ 
            $msg    = @$_REQUEST['msg'];
            if (isset($msg)){
            echo '<font color="red"> '.$msg.'</font><br><br>';
            }
            $link = explode('/',$_SERVER ['REQUEST_URI']);
            $qtd = count($link); echo '<br>';
        ?>
        <form action="<?php echo $link[$qtd-1]; ?>" method="post">
            Nome<input name="txtNome" type="text" id="txtNome" size="50">
            Login<input name="txtLogin" type="text" id="txtLogin" size="50">
            Senha<input name="txtSenha" type="password" id="txtSenha" size="50">
            E-mail<input name="txtEmail" type="email" id="txtEmail" size="20">
            Telefone<input name="txtTelefone" type="text" id="txtTelefone" size="50">
            <input type="submit" name="Submit" value="Cadastrar">
        <?php
            }else{ 
            require('../Banco.php');
            $db = new Banco();
            require('../DAO/Usuario.php');
            $us_nome        =       $_POST['txtNome'];
            $us_login       =       $_POST['txtLogin'];
            $us_senha       =       $_POST['txtSenha'];
            $us_email       =       $_POST['txtEmail'];
            $us_telefone    =       $_POST['txtTelefone'];
            $us_permissao   =       1;
            $usuario = new Usuario();
            $usuario->setDados(null,$us_nome,$us_login,$us_senha,$us_email,$us_telefone,$us_permissao);
            $usuario->salvar($usuario,$db);
             } 
        ?>
    </body>
</html>
