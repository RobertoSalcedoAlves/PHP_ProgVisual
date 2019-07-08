<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">                
        <title>Equipamento</title>
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
            <form action="<?php echo $link[$qtd-1]; ?>" method="post" class="form">
                <h1 class="h3 mb-3 font-weight-normal">Cadastro de Equipamento</h1>

                <label for="txtNumSerie" class="sr-only">Número de Série</label>
                <input name="txtNumSerie" type="text" id="txtNumSerie" size="50" class="form-control" placeholder="Número de Série" required autofocus>

                <label for="txtIdentity" class="sr-only">Identity</label>
                <input name="txtIdentity" type="text" id="txtIdentity" size="50" class="form-control" placeholder="Identity" required>

                <label for="txtVersaoFirmware" class="sr-only">Versão do firmware</label>
                <input name="txtVersaoFirmware" type="text" id="txtVersaoFirmware" size="50" class="form-control" placeholder="Versão do firmware" required>

                <label for="txtPrefixoBackup" class="sr-only">Prefixo do backup</label>
                <input name="txtPrefixoBackup" type="text" id="txtPrefixoBackup" size="20" class="form-control" placeholder="Prefixo do backup" required>

                <input type="submit" name="Submit" value="Cadastrar" class="btn-lg btn-primary">
            </form>
            <?php
                }else{ 
                require('../Banco.php');
                $db = new Banco();
                require('../DAO/Equipamento.php');
                $num_serie          =       $_POST['num_serie'];
                $identity           =       $_POST['identity'];
                $versao_firmware    =       $_POST['versao_firmware'];
                $prefixo_backup     =       $_POST['prefixo_backup'];
                
                $equipamento = new Equipamento();
                $equipamento->setDados(null,$num_serie,$identity,$identity,$versao_firmware,$prefixo_backup);
                $equipamento->salvar($equipamento,$db);
                 } 
            ?>
        </div>    
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    </body>
</html>
