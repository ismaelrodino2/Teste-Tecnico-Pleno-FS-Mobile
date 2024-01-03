import axios from "axios";
import { useContext, useState } from "react";
import { View, StyleSheet, Button } from "react-native";
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

  console.log("props.users", props.users);
  console.log("admId", admId);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onFinish = async () => {
    console.log("asdasd", user?.id, "asdasd", admId);
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
        headerComponent={
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
                  <Picker.Item
                    label={adms.email}
                    value={adms.id}
                    key={adms.id}
                  />
                ))}
            </Picker>
          </View>
        }
        footerComponent={
          <View style={{ display: "flex", gap: 8 }}>
            <Button onPress={onFinish} title={"Notificar"} />
            <AwesomeButton progress={loading} onPress={onFinish}>
              Text
            </AwesomeButton>
            <AwesomeButton onPress={() => setModalVisible(false)}>
              Cancelar
            </AwesomeButton>
          </View>
        }
      />

      {/* 
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
      </RNModal> */}
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
