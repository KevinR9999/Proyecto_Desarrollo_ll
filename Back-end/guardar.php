<?php
// Conexión a la base de datos
$servername = "localhost";  // Cambia esto si tu base de datos está en otro servidor
$username = "root";    // Reemplaza con tu usuario de la base de datos
$password = "";  // Reemplaza con tu contraseña de la base de datos
$dbname = "test"; // Reemplaza con el nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Obtener datos en formato JSON
$data = json_decode(file_get_contents('php://input'), true);

$nombre_cliente = $conn->real_escape_string($data['nombre_cliente']);
$direccion_cliente = $conn->real_escape_string($data['direccion_cliente']);
$productos = $conn->real_escape_string($data['productos']);
$total = $conn->real_escape_string($data['total']);

// Insertar en la base de datos
$sql = "INSERT INTO compras (nombre_cliente, direccion_cliente, productos, total, fecha) VALUES ('$nombre_cliente', '$direccion_cliente', '$productos', '$total', NOW())";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "Compra guardada con éxito."]);
} else {
    echo json_encode(["error" => $conn->error]);
}

$conn->close();
?>