import axios from "axios";
import React, { useContext, useState } from "react";
import { Button, Text, View, Modal as RNModal, StyleSheet } from "react-native";
import { User } from "../types/global-types";
import { AuthContext } from "../contexts/AuthContext";
import { Picker } from "@react-native-picker/picker";

type Props = {
  users: User[];
};

export function ModalNotification(props: Props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [admId, setAdmId] = useState("");
  const { user } = useContext(AuthContext);

  console.log("props.users", props.users);
  console.log("admId", admId);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onFinish = async () => {
    console.log("asdasd", user?.id, "asdasd", admId);
    try {
      const aa = await axios.post(
        `${process.env.EXPO_PUBLIC_BASE_API_URL}/api/notification`,
        {
          workerId: user?.id,
          admId,
        }
      );
      console.log("123123", aa);
      setLoading(true);
      // notification.success({ message: "Estabelecimento notificado" });
    } catch (err) {
      console.error(err);
      // notification.error({ message: "Erro ao notificar o estabelecimento" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Show modal" onPress={toggleModal} />

      <RNModal
        visible={isModalVisible}
        animationType="slide"
        // onBackdropPress={toggleModal}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <Text>Selecione o estabelecimento!</Text>

          <Picker
            selectedValue={admId}
            onValueChange={(itemValue) => setAdmId(itemValue)}
            
          >
            <Picker.Item label={"Selecione um estabelecimento"} value={""} key={""} />

            {props.users.length > 0 &&
              props.users.map((adms: { email: string; id: string }) => (
                <Picker.Item label={adms.email} value={adms.id} key={adms.id} />
              ))}
          </Picker>
          <Button onPress={onFinish} title="Notificar" />
          <Button
            onPress={() => setModalVisible(false)}
            title="Fechar o modal"
          />
        </View>
      </RNModal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: "70%", // Defina a largura desejada aqui
    height: "70%", // Defina a altura desejada aqui
  },
});
