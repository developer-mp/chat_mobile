import { useState, useEffect, useCallback } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";

const Chat = ({ navigation }) => {
  const [messages, setMessages] = useState([]);

  const HandleSignout = () => {
    signOut(auth).catch((err) => console.log(err));
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 20,
          }}
          onPress={HandleSignout}
        >
          <Text
            style={{
              fontSize: 16,
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const msgs = collection(db, "messages");
    const q = query(msgs, orderBy("createdAt", "desc"));

    const newMsg = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: {
            _id: doc.data().user,
            avatar:
              "https://ui-avatars.com/api/?background=0dbc3f&color=FFF&name=${FirstName_LastName}",
          },
        }))
      );
    });

    return () => newMsg();
  }, []);

  const saveMsgs = useCallback((messages = []) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, messages));
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(db, "messages"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <View style={{ backgroundColor: "#f6f3ea", flex: 1, color: "black" }}>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={(messages) => saveMsgs(messages)}
        user={{
          _id: auth?.currentUser?.email,
        }}
      />
    </View>
  );
};

export default Chat;
