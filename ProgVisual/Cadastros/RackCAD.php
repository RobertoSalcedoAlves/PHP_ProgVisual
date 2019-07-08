<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">                
        <title>Racks</title>
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
                <h1 class="h3 mb-3 font-weight-normal">Cadastro de Racks</h1>

                <label for="txtIdentificador" class="sr-only">Identificador</label>
                <input name="txtIdentificador" type="text" id="txtIdentificador" size="50" class="form-control" placeholder="Identificador" required autofocus>
                
                <select name="id_equipamento" class="custom-select custom-select-sm">
                    <option selected>Selecione...</option>                
                    <?php
                    require('../Banco.php');
                    require('../DAO/Equipamento.php');
                    $equipamento = new Equipamento();
                    $objeto = $equipamento->SelecionarTodos($fields,$values,$db);
                    foreach($objeto as $m => $obj){ ?>
                        <option value="<?php echo $obj->getId(); ?>"><?php echo $obj->getNome(); ?></option>
                    <?php } ?>
                </select>
                <input type="submit" name="Submit" value="Cadastrar" class="btn-lg btn-primary">
            </form>
            <?php
                }else{ 
                require('../Banco.php');
                $db = new Banco();
                require('../DAO/Rack.php');
                $identificador = $_POST['identificador'];
                
                $rack = new Rack();
                $rack->setDados(null,$identificador);
                $rack->salvar($rack,$db);
                 } 
            ?>
        </div>    
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    </body>
</html>
