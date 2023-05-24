import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const HandleSignup = () => {
    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Signup has been successful"))
        .catch((err) => console.log(err));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        value={email}
        onChangeText={(txt) => setEmail(txt)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        value={password}
        onChangeText={(txt) => setPassword(txt)}
      />
      <TouchableOpacity style={styles.signupButton} onPress={HandleSignup}>
        <Text style={styles.signupText}>Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6e4ad",
    paddingTop: 50,
    paddingHorizontal: 20,
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "500",
    textAlign: "center",
    paddingBottom: 20,
  },
  input: {
    backgroundColor: "white",
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 15,
    width: "100%",
  },
  loginButton: {
    backgroundColor: "#1d97c1",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    width: "100%",
  },
  signupButton: {
    backgroundColor: "#a28252",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    width: "100%",
  },
  loginText: {
    color: "white",
    fontSize: 16,
  },
  signupText: {
    color: "white",
    fontSize: 16,
  },
});

export default Signup;
