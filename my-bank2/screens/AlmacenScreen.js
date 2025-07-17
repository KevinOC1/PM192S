import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, TextInput,
  Modal, Alert, StyleSheet
} from 'react-native';

export default function AlmacenScreen({ navigation, productos, setProductos, logout }) {
  const [modalProductoVisible, setModalProductoVisible] = useState(false);
  const [productoActual, setProductoActual] = useState(null);

  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevaDesc, setNuevaDesc] = useState('');
  const [nuevoPrecio, setNuevoPrecio] = useState('');
  const [nuevoStock, setNuevoStock] = useState('');

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

  return (
    <View style={styles.container}>
      <View style={styles.menuRow}>
        <TouchableOpacity style={styles.menuBtn} onPress={() => navigation.navigate('Ventas')}>
          <Text style={styles.menuText}>Ir a Ventas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menuBtn, { backgroundColor: '#E53935' }]} onPress={logout}>
          <Text style={styles.menuText}>Salir</Text>
        </TouchableOpacity>
      </View>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#f5f5f5' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: { backgroundColor: '#fff', padding: 8, borderRadius: 8, marginBottom: 5 },
  button: { backgroundColor: '#6200ee', padding: 10, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  menuRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  menuBtn: { backgroundColor: '#6200ee', padding: 10, borderRadius: 8 },
  menuText: { color: '#fff' },
  list: { marginBottom: 10 },
  card: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginBottom: 5 },
  smallButton: { backgroundColor: '#4CAF50', padding: 5, borderRadius: 5, marginTop: 5, alignItems: 'center', flex: 1, marginHorizontal: 2 },
  smallButtonText: { color: '#fff', fontSize: 12 },
  fab: { position: 'absolute', bottom: 20, right: 20, backgroundColor: '#6200ee', borderRadius: 50, width: 50, height: 50, alignItems: 'center', justifyContent: 'center' },
  fabText: { color: '#fff', fontSize: 24 },
});
