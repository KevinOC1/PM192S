import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import VentasScreen from './screens/VentasScreen';
import AlmacenScreen from './screens/AlmacenScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [usuario, setUsuario] = useState(null);

  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Martillo', descripcion: 'Herramienta', precio: 120, stock: 10 },
    { id: 2, nombre: 'Taladro', descripcion: 'Taladro eléctrico', precio: 500, stock: 5 },
  ]);
  const [carrito, setCarrito] = useState([]);

  const login = (username, password) => {
    if (username === 'admin' && password === '1234') {
      setUsuario(username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUsuario(null);
  };

  if (!usuario) return <LoginScreen login={login} />;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Ventas">
          {(props) => (
            <VentasScreen
              {...props}
              productos={productos}
              setProductos={setProductos}
              carrito={carrito}
              setCarrito={setCarrito}
              logout={logout}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Almacén">
          {(props) => (
            <AlmacenScreen
              {...props}
              productos={productos}
              setProductos={setProductos}
              logout={logout}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
