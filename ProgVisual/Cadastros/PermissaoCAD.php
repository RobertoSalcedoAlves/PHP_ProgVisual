<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">                
        <title>Permissões</title>
    </head>
    <body>
        <div class="container"  style="width:40%;">
            <?php if (!$_POST){ 
                $msg    = @$_REQUEST['msg'];
                if (isset($msg)){
                echo '<font color="red"> '.$msg.'</font><br><br>';
                }
                $link = explode('/',$_SERVER ['REQUEST_URI']);
                $qtd = count($link); echo '<br>';
            ?>
            <form action="<?php echo $link[$qtd-1]; ?>" method="post" class="form-signin">
                <h1 class="h3 mb-3 font-weight-normal">Cadastro de Permissões</h1>

                <label for="txtNome" class="sr-only">Nome</label>
                <input name="txtNome" type="text" id="txtNome" size="50" class="form-control" placeholder="Nome" required autofocus>

                <label for="txtLogin" class="sr-only">Login</label>
                <input name="txtLogin" type="text" id="txtLogin" size="50" class="form-control" placeholder="Login" required>

                <label for="txtSenha" class="sr-only">Senha</label>
                <input name="txtSenha" type="password" id="txtSenha" size="50" class="form-control" placeholder="Senha" required>

                <label for="txtEmail" class="sr-only">E-mail</label>
                <input name="txtEmail" type="email" id="txtEmail" size="20" class="form-control" placeholder="E-mail" required>

                <label for="txtTelefone" class="sr-only">Telefone</label>
                <input name="txtTelefone" type="text" id="txtTelefone" size="50" class="form-control" placeholder="Telefone" required>
                <br>
                <input type="submit" name="Submit" value="Cadastrar" class="btn-lg btn-primary">
            </form>
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
        </div>    
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    </body>
</html>
