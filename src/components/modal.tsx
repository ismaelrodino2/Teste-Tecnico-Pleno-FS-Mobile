import axios from "axios";
import { useContext, useState } from "react";
import { View, StyleSheet, Button, Pressable, Text } from "react-native";
import Toast from "react-native-root-toast";
import { User } from "../types/global-types";
import { AuthContext } from "../contexts/AuthContext";
import { Picker } from "@react-native-picker/picker";
import BasicModal from "react-native-basic-modal";
import AwesomeButton from "react-native-really-awesome-button";

type Props = {
  users: User[];
};

export function ModalNotification(props: Props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [admId, setAdmId] = useState("");
  const { user } = useContext(AuthContext);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onFinish = async () => {
    setLoading(true);

    try {
      await axios.post(
        `${process.env.EXPO_PUBLIC_BASE_API_URL}/api/notification`,
        {
          workerId: user?.id,
          admId,
        }
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Notificar Administrador" onPress={toggleModal} />

      <BasicModal
        isVisible={isModalVisible}
        title="Notificar administrador!"
        description="Selecione o administrador e envie uma notificação."
        onBackdropPress={() => setModalVisible(false)}
      >
        <View>
          <Picker
            selectedValue={admId}
            onValueChange={(itemValue) => setAdmId(itemValue)}
          >
            <Picker.Item
              label={"Selecione um estabelecimento"}
              value={""}
              key={""}
            />

            {props.users.length > 0 &&
              props.users.map((adms: { email: string; id: string }) => (
                <Picker.Item label={adms.email} value={adms.id} key={adms.id} />
              ))}
          </Picker>
          <View style={{ display: "flex", gap: 8 }}>
            <Pressable
              style={styles.button}
              onPress={onFinish}
              disabled={loading}
            >
              <Text style={styles.text}>
                {loading ? "Carregando..." : "Notificar"}
              </Text>
            </Pressable>
          </View>
        </View>
      </BasicModal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderBottomLeftRadius: 16,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#14ACF2",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
