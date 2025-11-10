<?php

	session_start();

    $email = $_POST["email"];
    $senha = sha1($_POST["senha"]);

	require_once 'conexao.php';

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

<?php
	// backend/validar.php
	session_start();

	require_once 'conexao.php';

	$email = $_POST["email"];
	$senha = sha1($_POST["senha"]);

	// prepared statement para evitar SQL injection
	$stmt = $con->prepare("SELECT id, email, usuario, senha FROM usuarios WHERE email = ? AND senha = ?");
	$stmt->bind_param('ss', $email, $senha);
	$stmt->execute();
	$res = $stmt->get_result();

	if ($res && $res->num_rows === 1) {
		$user = $res->fetch_assoc();

		// regenerar id de sessão para segurança
		session_regenerate_id(true);

		// gravar dados na sessão
		$_SESSION['user_id'] = $user['id'];
		$_SESSION['user_email'] = $user['email'];
		$_SESSION['user_name'] = $user['usuario'];

		header('Location: ../frontend/paises.php');
		exit;
	} else {
		header('Location: ../frontend/index.php?login=failed');
		exit;
	}
?>