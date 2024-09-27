import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  Image,
  ImageBackground,
} from 'react-native';

const Stack = createStackNavigator();

const images = {
  background: require('./assets/background/background.jpeg'),
  pizzaMargherita: require('./assets/food/Margherita.jpeg'),
  pizzaPepperoni: require('./assets/food/Pepperoni.jpeg'),
  pizzaHawaiian: require('./assets/food/Hawaiian.jpeg'),
  pizzaVeggie: require('./assets/food/Veggie.jpeg'),
  pizzaBBQChicken: require('./assets/food/BBQ.jpeg'),
  drinkCoke: require('./assets/food/Coke.jpeg'),
  drinkSprite: require('./assets/food/Sprite.jpeg'),
  drinkLemonade: require('./assets/food/Lemonade.jpeg'),
  burgerClassic: require('./assets/food/Classic.jpeg'),
  burgerCheese: require('./assets/food/Cheese.jpeg'),
  burgerBacon: require('./assets/food/Bacon.jpeg'),
  burgerVeggie: require('./assets/food/Cheese.jpeg'),
  fries: require('./assets/food/Fries.jpeg'),
  drinkRootBeer: require('./assets/food/Beer.jpeg'),
  drinkIcedTea: require('./assets/food/Ice.jpeg'),
  drinkMilkshake: require('./assets/food/Milkshake.jpeg'),
};

const USD_TO_ZAR = 18;

const convertToZAR = (price) => {
  return (price * USD_TO_ZAR).toFixed(2);
};

const restaurants = [
  {
    id: '1',
    name: 'Pizza Place',
    menu: [
      { item: 'Margherita', price: 10, image: images.pizzaMargherita },
      { item: 'Pepperoni', price: 12, image: images.pizzaPepperoni },
      { item: 'Hawaiian', price: 11, image: images.pizzaHawaiian },
      { item: 'Veggie', price: 9, image: images.pizzaVeggie },
      { item: 'BBQ Chicken', price: 13, image: images.pizzaBBQChicken },
    ],
    drinks: [
      { item: 'Coke', price: 2, image: images.drinkCoke },
      { item: 'Sprite', price: 2, image: images.drinkSprite },
      { item: 'Lemonade', price: 3, image: images.drinkLemonade },
    ],
  },
  {
    id: '2',
    name: 'Burger Joint',
    menu: [
      { item: 'Classic Burger', price: 8, image: images.burgerClassic },
      { item: 'Cheese Burger', price: 9, image: images.burgerCheese },
      { item: 'Bacon Burger', price: 10, image: images.burgerBacon },
      { item: 'Veggie Burger', price: 8, image: images.burgerVeggie },
      { item: 'Fries', price: 3, image: images.fries },
    ],
    drinks: [
      { item: 'Root Beer', price: 2, image: images.drinkRootBeer },
      { item: 'Iced Tea', price: 2, image: images.drinkIcedTea },
      { item: 'Milkshake', price: 4, image: images.drinkMilkshake },
    ],
  },
];

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username && password) {
      navigation.navigate('Home');
    } else {
      Alert.alert('Error', 'Please enter both username and password');
    }
  };

  return (
    <ImageBackground source={images.background} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Welcome Back!</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} color="#ff6347" />
        <Button title="Register" onPress={() => navigation.navigate('Register')} />
      </View>
    </ImageBackground>
  );
};

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (username && password) {
      Alert.alert('Success', 'You have registered successfully!');
      navigation.navigate('Login');
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  return (
    <ImageBackground source={images.background} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Register" onPress={handleRegister} color="#ff6347" />
        <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
      </View>
    </ImageBackground>
  );
};

const MenuScreen = ({ navigation }) => {
  return (
    <ImageBackground source={images.background} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Available Restaurants</Text>
        <FlatList
          data={restaurants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.restaurant}>
              <Text style={styles.restaurantName}>{item.name}</Text>
              <TouchableOpacity
                style={styles.orderButton}
                onPress={() => navigation.navigate('Order', { restaurant: item })}>
                <Text style={styles.orderButtonText}>View Menu</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <Button title="Logout" onPress={() => navigation.navigate('Login')} />
      </View>
    </ImageBackground>
  );
};

const OrderScreen = ({ route, navigation }) => {
  const { restaurant } = route.params;
  const [order, setOrder] = useState([]);

  const addToOrder = (item) => {
    setOrder([...order, item]);
    Alert.alert('Success', `${item.item} added to your order.`);
  };

  const handleCheckout = () => {
    const orderNumber = Math.floor(Math.random() * 10000); // Generate a random order number
    navigation.navigate('Cart', { order, orderNumber });
  };

  return (
    <ImageBackground source={images.background} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>{restaurant.name} Menu</Text>

        <Text style={styles.subHeader}>Pizzas</Text>
        <FlatList
          data={restaurant.menu}
          keyExtractor={(item) => item.item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => addToOrder(item)} style={styles.menuItem}>
              <Image source={item.image} style={styles.menuImage} />
              <Text style={styles.menuText}>
                {item.item} - R{convertToZAR(item.price)}
              </Text>
            </TouchableOpacity>
          )}
        />

        <Text style={styles.subHeader}>Drinks</Text>
        <FlatList
          data={restaurant.drinks}
          keyExtractor={(item) => item.item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => addToOrder(item)} style={styles.menuItem}>
              <Image source={item.image} style={styles.menuImage} />
              <Text style={styles.menuText}>
                {item.item} - R{convertToZAR(item.price)}
              </Text>
            </TouchableOpacity>
          )}
        />

        <Button title="Checkout" onPress={handleCheckout} color="#ff6347" />
        <Button title="Back to Restaurants" onPress={() => navigation.goBack()} />
      </View>
    </ImageBackground>
  );
};

const CartScreen = ({ route, navigation }) => {
  const { order, orderNumber } = route.params;
  const total = order.reduce((acc, curr) => acc + curr.price, 0);

  const removeItem = (itemToRemove) => {
    const updatedOrder = order.filter(item => item.item !== itemToRemove.item);
    navigation.navigate('Cart', { order: updatedOrder, orderNumber });
  };

  return (
    <ImageBackground source={images.background} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Your Cart</Text>
        <Text style={styles.orderNumber}>Order Number: #{orderNumber}</Text>
        <FlatList
          data={order}
          keyExtractor={(item) => item.item}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={item.image} style={styles.menuImage} />
              <Text style={styles.menuText}>
                {item.item} - R{convertToZAR(item.price)}
              </Text>
              <Button title="Remove" onPress={() => removeItem(item)} color="#ff6347" />
            </View>
          )}
        />
        <Text style={styles.total}>Total: R{convertToZAR(total)}</Text>
        <Button title="Track Order" onPress={() => navigation.navigate('TrackOrder', { order, orderNumber })} />
        <Button title="Back to Menu" onPress={() => navigation.goBack()} />
      </View>
    </ImageBackground>
  );
};

const TrackOrderScreen = ({ route, navigation }) => {
  const { order, orderNumber } = route.params;

  return (
    <ImageBackground source={images.background} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Order Tracking</Text>
        <Text style={styles.orderNumber}>Order Number: #{orderNumber}</Text>
        {order.length > 0 ? (
          <FlatList
            data={order}
            keyExtractor={(item) => item.item}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={item.image} style={styles.menuImage} />
                <Text style={styles.menuText}>{item.item} - R{convertToZAR(item.price)}</Text>
              </View>
            )}
          />
        ) : (
          <Text>No orders found.</Text>
        )}
        <Button title="Logout" onPress={() => navigation.navigate('Login')} />
        <Button title="Back to Cart" onPress={() => navigation.goBack()} />
      </View>
    </ImageBackground>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={MenuScreen} />
        <Stack.Screen name="Order" component={OrderScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="TrackOrder" component={TrackOrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  header: {
    padding: 50,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 10,
  },
  restaurant: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: '600',
  },
  orderButton: {
    backgroundColor: '#ff6347',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  menuImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'right',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});
