import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFinish = async () => {
    console.log({ email, password });
    try {
      // Perform your login logic here
      // Call the login function (replace with your authentication logic)
    } catch (error) {
      // Handle login error
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        style={styles.input}
      />

      <Button
        title="Submit"
        onPress={onFinish}
        disabled={loading}
      />

      <View style={styles.divider} />

      <Text style={styles.signUpText}>
        If you don't have an account,{' '}
        <TouchableOpacity onPress={() => console.log('Navigate to Signup')}>
          <Text style={{ color: 'blue', fontWeight: 'bold' }}>Sign Up</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    maxWidth: 600,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  signUpText: {
    textAlign: 'center',
    marginTop: 10,
    color: 'gray',
  },
});

export default SignIn;
