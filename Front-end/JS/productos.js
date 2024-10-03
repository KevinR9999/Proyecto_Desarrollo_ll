document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    searchProducts();
  });
  
  function searchProducts() {
    // Obtener el valor de la barra de búsqueda
    let input = document.getElementById('search-bar').value.toLowerCase();
    
    // Lista de productos y sus respectivas URLs
    const products = [
      { name: "AFILADOR DE CUCHILLOS", url: "../Cocina/Cocina.html" },
      { name: "LIMPIAHORNOS TANTE", url: "../Cocina/Cocina.html" },
      { name: "POLVO LIMPIADOR ABRASIVO TANTE", url: "../Cocina/Cocina.html" },
      { name: "QUITAGRASA TANTE", url: "../Cocina/Cocina.html" },
      { name: "NATUSAL SAL MARINA", url: "../Cocina/Cocina.html" },
      { name: "SALSA DE SOYA", url: "../Cocina/Cocina.html" },
      { name: "SALSA DE AJO", url: "../Cocina/Cocina.html" },
      { name: "SALSA NEGRA", url: "../Cocina/Cocina.html" },

      { name: "AMBIENTADOR VARITAS FRUTOS ROJOS", url: "../Hogar/Hogar.html" },
      { name: "AMBIENTADOR VARITAS FULL FRESH FRUTOS ROJOS", url: "../Hogar/Hogar.html" },
      { name: "AMBIENTADOR VARITAS FULL FRESH LAVANDA CÍTRICA", url: "../Hogar/Hogar.html" },
      { name: "AMBIENTADOR VARITAS FULL FRESH SWEET TRANQUILITY", url: "../Hogar/Hogar.html" },
      { name: "VENENO K4", url: "../Hogar/Hogar.html" },
      { name: "RODILLO QUITA PELUSA", url: "../Hogar/Hogar.html" },
      { name: "AROMATIZANTE PARA AUTOS AZUL", url: "../Hogar/Hogar.html" },
      { name: "AROMATIZANTE PARA AUTOS ROJO", url: "../Hogar/Hogar.html" },

      { name: "ALISADO JAPONES", url: "../Belleza/Belleza.html" },
      {name: "GEL FRIO", url: "../Belleza/Belleza.html" },
      {name: "SHAMPOO ROMERO", url: "../Belleza/Belleza.html" },
      {name: "SHAMPOO ANTI-CASPA", url: "../Belleza/Belleza.html" },
      {name: "MASCARILLA COLAGENO AMARILLA", url: "../Belleza/Belleza.html" },
      {name: "MASCARILLA ALOE", url: "../Belleza/Belleza.html" },
      {name: "GEL ALOE VERA", url: "../Belleza/Belleza.html" },
      {name: "MASCARILLA 3 PASOS", url: "../Belleza/Belleza.html" },

      {name: "CINTA GRUESA TESA", url: "../Pepeleria/Papeleria.html" },
      {name: "NOTAS ESPIRAL", url: "../Pepeleria/Papeleria.html" },
      {name: "PEGANTE SIPEGA CRISTAL", url: "../Pepeleria/Papeleria.html" },
      {name: "SILICONA FRIA LIQUIDA TESA", url: "../Pepeleria/Papeleria.html" },
      {name: "BLOCK FLUORESCENTE", url: "../Pepeleria/Papeleria.html" },
      {name: "PROTECTOR HOJAS TAMAÑO CARTA OFIPLUS", url: "../Pepeleria/Papeleria.html" },
      {name: "RESMA DE PAPEL TAMAÑO CARTA", url: "../Pepeleria/Papeleria.html" },
      {name: "MARCADORES PRIMAVERA NEON", url: "../Pepeleria/Papeleria.html" },

      {name: "DETERGENTE LIQUIDO ROPA CLASICA TANTE", url: "../Limpieza/Limpieza.html" },
      {name: "DETERGENTE LIQUIDO ROPA COLOR TANTE", url: "../Limpieza/Limpieza.html" },
      {name: "DETERGENTE LIQUIDO ROPA OSCURA", url: "../Limpieza/Limpieza.html" },
      {name: "QUITAMANCHAS EN POLVO ROPA BLANCA TANTE", url: "../Limpieza/Limpieza.html" },
      {name: "QUITAMANCHAS EN POLVO ROPA COLOR TANTE", url: "../Limpieza/Limpieza.html" },
      {name: "QUITAMANCHAS LIQUIDO ROPA BLANCA TANTE", url: "../Limpieza/Limpieza.html" },
      {name: "QUITAMANCHAS LIQUIDO ROPA COLOR TANTE", url: "../Limpieza/Limpieza.html" },
      {name: "SUAVIZANTE PRIMAVERAL TANTE", url: "../Limpieza/Limpieza.html" },

      {name: "DOMINO ROJO", url: "../Juguetes/Juguetes.html" },
      {name: "JUEGO QUIEN SOY", url: "../Juguetes/Juguetes.html" },
      {name: "ROMPECABEZAS DE PAPEL PARA COLOREAR", url: "../Juguetes/Juguetes.html" },
      {name: "SLIME EN FORMA DE CARRO", url: "../Juguetes/Juguetes.html" },
      {name: "YOYOS DE DINOSAURIOS", url: "../Juguetes/Juguetes.html" },
      {name: "SLIME DE DINOSAURIOS", url: "../Juguetes/Juguetes.html" },
      {name: "JUEGO JENGA", url: "../Juguetes/Juguetes.html" },
      {name: "BUBBLY BURBUJAS PEQUEÑO", url: "../Juguetes/Juguetes.html" },

      {name: "SALSA PARA GATOS", url: "../Mascotas/Mascota.html" },
      {name: "SALSA PARA PERROS SABOR A POLLO", url: "../Mascotas/Mascota.html" },
      {name: "SALSA PARA PERROS SABOR A CARNE", url: "../Mascotas/Mascota.html" },
      {name: "AMBIENTADOR PARA ARENA DE GATOS", url: "../Mascotas/Mascota.html" },
      {name: "ARENA PARA GATOS", url: "../Mascotas/Mascota.html" },
      {name: "BAÑO SECO PARA PERROS", url: "../Mascotas/Mascota.html" },
      {name: "BAÑO SECO PARA GATOS", url: "../Mascotas/Mascota.html" },
      {name: "CARNITAS DE RES SNACK PARA PERROS", url: "../Mascotas/Mascota.html" },

      {name: "AROMATICA DE ALBAHACA", url: "../Alimentos/Alimentos.html" },
      {name: "AROMATICA CIDRÓN", url: "../Alimentos/Alimentos.html" },
      {name: "CHOCOLATE ITALO SIN AZÚCAR", url: "../Alimentos/Alimentos.html" },
      {name: "CORN PUFFS LIFENESS", url: "../Alimentos/Alimentos.html" },
      {name: "ROSQUILLAS LIFENESS", url: "../Alimentos/Alimentos.html" },
      {name: "PALITOS INTEGRALES LIFENESS", url: "../Alimentos/Alimentos.html" },
      {name: "PAQUETE COMPLETO LIFENESS", url: "../Alimentos/Alimentos.html" },
      {name: "LIMONADA DE PIÑA COLADA", url: "../Alimentos/Alimentos.html" },

      {name: "CUBIERTOS PARA BEBE", url: "../Bebes/Bebes.html" },
      {name: "PAÑITOS DAMPY X 150U", url: "../Bebes/Bebes.html" },
      {name: "PAÑITOS DAMPY X 25U", url: "../Bebes/Bebes.html" },
      {name: "SHAMPOO PARA BEBE", url: "../Bebes/Bebes.html" },

      // Añadir más productos aquí
    ];
    
    // Buscar el producto que coincida con la entrada del usuario
    for (let product of products) {
      if (product.name.toLowerCase().includes(input)) {
        // Redirigir a la página del producto si se encuentra una coincidencia
        window.location.href = product.url;
        return;
      }
    }
    
    // Si no se encuentra ninguna coincidencia, mostrar un mensaje
    alert("Producto no encontrado");
  }
  
  function handleKeyPress(event) {
    // Detectar si se presionó la tecla Enter
    if (event.key === 'Enter') {
      event.preventDefault();
      searchProducts();
    }
  }
  