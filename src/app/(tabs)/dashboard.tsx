import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
// import Pusher from "pusher-js";
import Modal from "react-native-modal";
import axios from "axios";
import { router, useRootNavigationState } from "expo-router";
import { Order } from "../../types/global-types";
import OrdersList from "../../components/order-list";
import { useGetSessionClientSide } from "../../contexts/AuthContext";

export default function Dashboard() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [incomingOrders, setIncomingOrders] = useState<any>([]);

  const fetchData = async () => {
    try {
      const data: Order[] = await axios.get("/api/user", {
        params: {
          workerId: "123",
        },
      });
      setOrders(data); // Atualiza o estado com os dados da API
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   const pusher = new Pusher(process.env.EXPO_PUBLIC_PUSHER_APP_KEY!, {
  //     cluster: "sa1",
  //   });

  //   const channel = pusher.subscribe("dashboard");

  //   channel.bind("incoming-order", (notification: any) =>
  //     setIncomingOrders((prev: any) => [...prev, notification])
  //   );

  //   return () => {
  //     pusher.unsubscribe("dashboard");
  //   };
  // }, []);

  const session = useGetSessionClientSide()
  const navigationState = useRootNavigationState();



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
