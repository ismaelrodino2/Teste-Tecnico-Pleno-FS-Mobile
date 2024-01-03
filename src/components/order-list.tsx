import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Order } from "../types/global-types";

type Props = {
  orders: Order[];
  incomingOrders: Order[];
  loading: boolean;
};

const SkeletonLoading = () => (
  <View
    testID="skeleton-loading"
    style={{ ...styles.orderContainer, backgroundColor: "white" }}
  >
    <View style={styles.skeletonHeading} />
    <View style={styles.skeletonSubHeading} />
    <View style={styles.skeletonItem} />
    <View style={styles.skeletonItem} />
  </View>
);

const OrdersList = (props: Props) => {
  const allOrders = [...props.orders, ...props.incomingOrders];

  return (
    <View>
      <Text style={styles.heading}>Trabalhador</Text>

      <Text style={styles.subHeading}>Pedidos:</Text>
      <View style={styles.gridContainer}>
        {allOrders.map((order) => (
          <View key={order.id} style={styles.orderContainer}>
            <Text style={styles.orderClientName}>{order.clientName}</Text>
            <Text
              style={styles.orderAddress}
            >{`Endereço: ${order.address}`}</Text>
            <Text style={styles.orderItems}>{`Itens: ${order.items.join(
              ", "
            )}`}</Text>
          </View>
        ))}
        {props.orders.length === 0 && !props.loading ? (
          <Text>Nenhum pedido</Text>
        ) : null}
        {props.loading ? <SkeletonLoading /> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 8,
  },
  orderContainer: {
    backgroundColor: "lightblue",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    width: "48%", // Adjust based on your design
  },
  orderClientName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  orderAddress: {
    marginBottom: 4,
  },
  orderItems: {
    color: "gray",
  },
  skeletonHeading: {
    height: 24,
    backgroundColor: "lightgray",
    marginBottom: 8,
  },
  skeletonSubHeading: {
    height: 18,
    backgroundColor: "lightgray",
    marginBottom: 2,
  },
  skeletonItem: {
    height: 16,
    backgroundColor: "lightgray",
    marginBottom: 4,
  },
});

export default OrdersList;
