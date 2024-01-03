import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import Modal from "react-native-modal";
import axios from "axios";
import { Redirect } from "expo-router";
import { Order, User } from "../../types/global-types";
import OrdersList from "../../components/order-list";
import { AuthContext } from "../../contexts/AuthContext";
import Pusher from "pusher-js/react-native";
import { LogouButton } from "../../components/logout-button";
import { ModalNotification } from "../../components/modal";

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, isLoading] = useState(false);
  const [incomingOrders, setIncomingOrders] = useState<Order[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        isLoading(true);

        const usersData = await axios.get(
          `${process.env.EXPO_PUBLIC_BASE_API_URL}/api/user`,
          {
            params: {
              accountType: "adm",
            },
          }
        );
        setUsers(usersData.data.users);

        const ordersData = await axios.get(
          `${process.env.EXPO_PUBLIC_BASE_API_URL}/api/order`,
          {
            params: {
              workerId: user?.id,
            },
          }
        );

        setOrders(ordersData.data.orders);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      } finally {
        isLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataAndSubscribe = async () => {
      const pusher = new Pusher(
        process.env.EXPO_PUBLIC_PUSHER_APP_KEY! as string,
        {
          cluster: "sa1",
        }
      );
      pusher.subscribe("dashboard");

      pusher.bind("incoming-order", (notification: Order[]) =>
        setIncomingOrders((prev: any) => [...prev, notification])
      );

      return () => {
        pusher.unsubscribe("dashboard");
      };
    };

    fetchDataAndSubscribe();
  }, []);

  if (!user) {
    return <Redirect href="/(tabs)/signin" />;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <OrdersList
        orders={orders}
        incomingOrders={incomingOrders}
        loading={loading}
      />

      <ModalNotification users={users} />
      <LogouButton />
    </View>
  );
}
