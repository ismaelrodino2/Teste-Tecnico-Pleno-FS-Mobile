import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
// import Pusher from "pusher-js";
import Modal from "react-native-modal";
import axios from "axios";
import { router, useRootNavigationState } from "expo-router";
import { Order, User } from "../../types/global-types";
import OrdersList from "../../components/order-list";
import {
  AuthContext,
  useGetSessionClientSide,
} from "../../contexts/AuthContext";
import Pusher from "pusher-js/react-native";

export default function Dashboard() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useContext(AuthContext);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [incomingOrders, setIncomingOrders] = useState<any>([]);

  const fetchData = async () => {
    try {
  
      console.log("user?.id", user?.id);
      const ordersData = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_API_URL}/api/order`,
        {
          params: {
            workerId: "450bd6a6-912a-41eb-9900-d7cc9033eff5",
            // workerId: user?.id,
          },
        }
      );

      console.log("aaaa", (ordersData.data.orders));

      setOrders(ordersData.data.orders); // Atualiza o estado com os dados da API
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const pusher = new Pusher(
      process.env.EXPO_PUBLIC_PUSHER_APP_KEY! as string,
      {
        cluster: "sa1",
      }
    );
    pusher.subscribe("dashboard");

    pusher.bind("incoming-order", (notification: any) =>
      setIncomingOrders((prev: any) => [...prev, notification])
    );

    return () => {
      pusher.unsubscribe("dashboard");
    };
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Adm</Text>

      <Text>Pedidos:</Text>

      <OrdersList orders={orders} incomingOrders={incomingOrders} />

      <Button title="Notificar estabelecimento" onPress={toggleModal} />

      <Modal isVisible={true}>
        <View style={{ flex: 1 }}>
          <Text>I am the modal content!</Text>
        </View>
      </Modal>
    </View>
  );
}
