import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Modal, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [pantalla, setPantalla] = useState('ventas');
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Martillo', descripcion: 'Herramienta', precio: 120, stock: 10 },
    { id: 2, nombre: 'Taladro', descripcion: 'Taladro eléctrico', precio: 500, stock: 5 },
  ]);
  const [carrito, setCarrito] = useState([]);
  const [modalPagoVisible, setModalPagoVisible] = useState(false);
  const [modalProductoVisible, setModalProductoVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [productoActual, setProductoActual] = useState(null);
  const [metodoPago, setMetodoPago] = useState('efectivo');

  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevaDesc, setNuevaDesc] = useState('');
  const [nuevoPrecio, setNuevoPrecio] = useState('');
  const [nuevoStock, setNuevoStock] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = () => {
    if (username === 'admin' && password === '1234') {
      setUsuario(username);
      setUsername('');
      setPassword('');
    } else {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  const logout = () => {
    setUsuario(null);
    setPantalla('ventas');
    setMenuVisible(false);
  };

  const agregarAlCarrito = (producto) => {
    if (producto.stock <= 0) return;
    setCarrito([...carrito, { ...producto }]);
    setProductos(productos.map(p => p.id === producto.id ? { ...p, stock: p.stock - 1 } : p));
  };

  const quitarDelCarrito = (index, productoId) => {
    setCarrito(carrito.filter((_, i) => i !== index));
    setProductos(productos.map(p => p.id === productoId ? { ...p, stock: p.stock + 1 } : p));
  };

  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  const confirmarPago = () => {
    if (carrito.length === 0) {
      Alert.alert('Carrito vacío', 'Agrega productos antes de pagar');
      return;
    }
    Alert.alert('Venta realizada', `Método: ${metodoPago}\nTotal: $${total}`);
    setCarrito([]);
    setModalPagoVisible(false);
  };

  const abrirModalProducto = (producto = null) => {
    setProductoActual(producto);
    if (producto) {
      setNuevoNombre(producto.nombre);
      setNuevaDesc(producto.descripcion);
      setNuevoPrecio(producto.precio.toString());
      setNuevoStock(producto.stock.toString());
    } else {
      limpiarFormulario();
    }
    setModalProductoVisible(true);
  };

  const guardarProducto = () => {
    if (!nuevoNombre || !nuevoPrecio || !nuevoStock) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (productoActual) {
      setProductos(productos.map(p => p.id === productoActual.id ? {
        ...p,
        nombre: nuevoNombre,
        descripcion: nuevaDesc,
        precio: parseFloat(nuevoPrecio),
        stock: parseInt(nuevoStock),
      } : p));
    } else {
      const nuevo = {
        id: Date.now(),
        nombre: nuevoNombre,
        descripcion: nuevaDesc,
        precio: parseFloat(nuevoPrecio),
        stock: parseInt(nuevoStock),
      };
      setProductos([...productos, nuevo]);
    }

    limpiarFormulario();
    setModalProductoVisible(false);
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  const limpiarFormulario = () => {
    setNuevoNombre('');
    setNuevaDesc('');
    setNuevoPrecio('');
    setNuevoStock('');
    setProductoActual(null);
  };

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput placeholder="Usuario" value={username} onChangeText={setUsername} style={styles.input} />
        <TextInput placeholder="Contraseña" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={() => setMenuVisible(!menuVisible)}>
        <Text style={styles.buttonText}>&#9776;</Text>
      </TouchableOpacity>

      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={() => { setPantalla('ventas'); setMenuVisible(false); }}>
            <Text>Ventas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => { setPantalla('almacen'); setMenuVisible(false); }}>
            <Text>Almacén</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={logout}>
            <Text>Salir</Text>
          </TouchableOpacity>
        </View>
      )}

      {pantalla === 'ventas' && (
        <>
          <ScrollView style={styles.list}>
            {productos.map(p => (
              <View key={p.id} style={styles.card}>
                <Text style={styles.cardTitle}>{p.nombre} (${p.precio})</Text>
                <Text>{p.descripcion}</Text>
                <Text>Stock: {p.stock}</Text>
                <TouchableOpacity style={styles.smallButton} onPress={() => agregarAlCarrito(p)}>
                  <Text style={styles.smallButtonText}>Agregar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <Text style={styles.title}>Carrito</Text>
          <ScrollView style={styles.list}>
            {carrito.map((item, i) => (
              <TouchableOpacity key={i} onLongPress={() => quitarDelCarrito(i, item.id)} style={styles.cartItem}>
                <Text>{item.nombre} - ${item.precio}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text>Total: ${total}</Text>
          <TouchableOpacity style={styles.button} onPress={() => setModalPagoVisible(true)}>
            <Text style={styles.buttonText}>Pagar</Text>
          </TouchableOpacity>

          <Modal visible={modalPagoVisible} animationType="slide">
            <View style={styles.container}>
              <Text style={styles.title}>Método de Pago</Text>
              <Picker selectedValue={metodoPago} onValueChange={setMetodoPago} style={{ width: '100%' }}>
                <Picker.Item label="Efectivo" value="efectivo" />
                <Picker.Item label="Tarjeta" value="tarjeta" />
                <Picker.Item label="Transferencia" value="transferencia" />
              </Picker>
              <Text style={{ marginTop: 10 }}>Total: ${total}</Text>
              <TouchableOpacity style={styles.button} onPress={confirmarPago}>
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#999' }]} onPress={() => setModalPagoVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      )}

      {pantalla === 'almacen' && (
        <>
          <ScrollView style={styles.list}>
            {productos.map(p => (
              <View key={p.id} style={styles.card}>
                <Text>{p.nombre} (${p.precio})</Text>
                <Text>{p.descripcion}</Text>
                <Text>Stock: {p.stock}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity style={styles.smallButton} onPress={() => abrirModalProducto(p)}>
                    <Text style={styles.smallButtonText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.smallButton, { backgroundColor: '#E53935' }]} onPress={() => eliminarProducto(p.id)}>
                    <Text style={styles.smallButtonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.fab} onPress={() => abrirModalProducto()}>
            <Text style={styles.fabText}>+</Text>
          </TouchableOpacity>

          <Modal visible={modalProductoVisible} animationType="slide">
            <View style={styles.container}>
              <Text style={styles.title}>{productoActual ? 'Editar Producto' : 'Agregar Producto'}</Text>
              <TextInput placeholder="Nombre" value={nuevoNombre} onChangeText={setNuevoNombre} style={styles.input} />
              <TextInput placeholder="Descripción" value={nuevaDesc} onChangeText={setNuevaDesc} style={styles.input} />
              <TextInput placeholder="Precio" value={nuevoPrecio} onChangeText={setNuevoPrecio} keyboardType="numeric" style={styles.input} />
              <TextInput placeholder="Stock" value={nuevoStock} onChangeText={setNuevoStock} keyboardType="numeric" style={styles.input} />
              <TouchableOpacity style={styles.button} onPress={guardarProducto}>
                <Text style={styles.buttonText}>{productoActual ? 'Guardar Cambios' : 'Agregar Producto'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#999' }]} onPress={() => setModalProductoVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f5f5f5' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  button: { backgroundColor: '#6200ee', padding: 10, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  input: { backgroundColor: '#fff', padding: 8, borderRadius: 8, marginBottom: 5 },
  menuButton: { backgroundColor: '#6200ee', padding: 10, borderRadius: 8, alignSelf: 'flex-start' },
  menu: { position: 'absolute', top: 60, left: 15, backgroundColor: '#fff', borderRadius: 8, padding: 10, elevation: 5 },
  menuItem: { paddingVertical: 10, paddingHorizontal: 20 },
  list: { marginBottom: 10 },
  card: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginBottom: 5 },
  smallButton: { backgroundColor: '#4CAF50', padding: 5, borderRadius: 5, marginTop: 5, alignItems: 'center', flex: 1, marginHorizontal: 2 },
  smallButtonText: { color: '#fff', fontSize: 12 },
  cartItem: { backgroundColor: '#eee', padding: 8, borderRadius: 8, marginBottom: 3 },
  fab: { position: 'absolute', bottom: 20, right: 20, backgroundColor: '#6200ee', borderRadius: 50, width: 50, height: 50, alignItems: 'center', justifyContent: 'center' },
  fabText: { color: '#fff', fontSize: 24 },
});

