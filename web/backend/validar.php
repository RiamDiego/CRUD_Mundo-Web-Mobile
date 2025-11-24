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