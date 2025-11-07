<?php

	session_start();

    $email = $_POST["email"];
    $senha = sha1($_POST["senha"]);

	require_once 'conexao.php'

	$sql = "select * from usuarios where email='$email' and senha='$senha'"; //SQL utilizado para a consulta
	$res = $con->query($sql); //Executa o comando no banco de dados e armazena a resposta em $res
	if(mysqli_num_rows($res) > 0){ //checa se foram encontrados resultados
		header("Location: crud.php");
	}
	else{
		header("Location: index.php");
	}

	$con->close(); //fecha a conexao com o banco
?>