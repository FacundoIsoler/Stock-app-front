import { useState } from 'react';

import './App.css';

// Estado inicial del formulario
const initialState = { name: "", price: 0 };

function App() {
  // Estado para indicar si se está cargando la solicitud
  const [isLoading, setIsLoading] = useState(false);
  // Estado para almacenar los datos del producto en el formulario
  const [product, setProduct] = useState(initialState);

  // Función para manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    const fieldValue = e.target.value;
    const fieldName = e.target.name;

    // Actualiza el estado del producto con los nuevos valores
    setProduct({ ...product, [fieldName]: fieldValue });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica: asegura que se haya ingresado un nombre de producto
    if (!product.name) {
      console.log("Debes llenar el campo Nombre de producto");
      return;
    }

    // Indica que se está cargando la solicitud
    setIsLoading(true);

    // Envía la solicitud POST al servidor backend
    fetch('http://localhost:4000/api/v1/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        // Maneja la respuesta del servidor
        if (data.ok) {
          console.log("Producto creado con éxito");
          // Restablece el formulario al estado inicial
          setProduct(initialState);
        } else {
          console.log(data.message);
        }
      })
      .catch((err) => {
        // Maneja errores de conexión o del servidor
        console.log(err);
      })
      .finally(() => {
        // Indica que la solicitud ha terminado de procesarse
        setIsLoading(false);
      });
  };

  return (
    <div className="App">
      <h1>Nuevo producto</h1>
      <form onSubmit={handleSubmit}>
        {/* Campo de entrada para el nombre del producto */}
        <input onChange={handleChange} value={product.name} type="text" name="name" placeholder="Nombre del producto..." />
        {/* Campo de entrada para el precio del producto */}
        <input onChange={handleChange} value={product.price} type="number" name="price" placeholder="Precio del producto..." />
        {/* Botón de envío del formulario */}
        <button type="submit">
          {/* Muestra un mensaje dependiendo del estado de carga */}
          {isLoading ? "Creando producto..." : "Crear producto"}
        </button>
      </form>
    </div>
  );
}

export default App;
