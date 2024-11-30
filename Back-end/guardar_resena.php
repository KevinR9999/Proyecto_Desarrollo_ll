<?php
header("Content-Type: application/json");

// Obtener los datos del formulario enviados como JSON
$data = json_decode(file_get_contents('php://input'), true);

// Verificar si los datos necesarios están presentes
if (!isset($data['id_fac'], $data['nombre'], $data['calificacion'], $data['resena'], $data['fecha'])) {
    echo json_encode(["error" => "Faltan datos para guardar la reseña."]);
    exit();
}

// Asignar datos recibidos a variables
$id_fac = $data['id_fac'];
$nombre = $data['nombre'];
$calificacion = (int)$data['calificacion']; // Asegurar que sea un entero
$resena = $data['resena'];
$fecha = $data['fecha']; // Fecha proporcionada por el frontend

// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tienda"; // Cambia este valor si el nombre de tu base de datos es diferente

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    echo json_encode(["error" => "Conexión fallida: " . $conn->connect_error]);
    exit();
}

// Insertar reseña en la base de datos
$stmt = $conn->prepare("INSERT INTO resenas (id_fac, nombre, calificacion, resena, fecha) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("isiss", $id_fac, $nombre, $calificacion, $resena, $fecha);

// Ejecutar la consulta y verificar si fue exitosa
if ($stmt->execute()) {
    echo json_encode(["message" => "Reseña guardada correctamente."]);
} else {
    echo json_encode(["error" => "Error al guardar la reseña: " . $stmt->error]);
}

// Cerrar la conexión
$stmt->close();
$conn->close();
?>
