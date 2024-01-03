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
import { LogouButton } from "../../components/logout-button";
import { ModalNotification } from "../../components/modal";

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useContext(AuthContext);


  const [incomingOrders, setIncomingOrders] = useState<any>([]);

  console.log('o user é', user?.id)

  const fetchData = async () => {
    try {

      const usersData = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_API_URL}/api/user`,
        {
          params: {
            accountType: "adm",
          },
        }
      );
      console.log('os users são', usersData.data.users)
      setUsers(usersData.data.users)
      console.log("user?.id", user?.id);
      const ordersData = await axios.get(
        `${process.env.EXPO_PUBLIC_BASE_API_URL}/api/order`,
        {
          params: {
            workerId: user?.id,
            // workerId: user?.id,
          },
        }
      );

      console.log("aaaa", (ordersData.data.orders));

      setOrders(ordersData.data.orders); // Atualiza o estado com os dados da API
      console.log("23112312", (ordersData.data.orders));

    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
    }
  };
  console.log("1112222", (orders));

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


      <ModalNotification users={users} />
      <LogouButton />
    </View>
  );
}
