<?php
// Mostrar errores para desarrollo
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Verificar si el formulario fue enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recoger datos del formulario
    $name = $_POST['name'];
    $rating = $_POST['rating'];
    $review = $_POST['review'];

    // Validar que los campos no estén vacíos
    if (!empty($name) && !empty($rating) && !empty($review)) {
        try {
            // Conectar a la base de datos
            $conn = new PDO("mysql:host=localhost;dbname=test", "root", "");
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Insertar los datos en la base de datos
            $sql = "INSERT INTO reseñas (nombre, calificacion, resena) VALUES (:name, :rating, :review)";
            $stmt = $conn->prepare($sql);

            // Asignar los parámetros a los valores recogidos del formulario
            $stmt->bindParam(':name', $name);
            $stmt->bindParam(':rating', $rating);
            $stmt->bindParam(':review', $review);

            // Ejecutar la consulta
            $stmt->execute();

            // Devolver un mensaje de éxito
            echo "Reseña guardada con éxito.";
        } catch (PDOException $e) {
            // Mostrar errores en caso de fallo
            echo "Error: " . $e->getMessage();
        }

        // Cerrar la conexión
        $conn = null;
    } else {
        echo "Por favor, completa todos los campos.";
    }
} else {
    echo "Formulario no enviado correctamente.";
}
?>
