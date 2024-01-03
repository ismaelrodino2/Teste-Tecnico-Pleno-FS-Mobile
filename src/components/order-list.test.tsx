import { render } from "@testing-library/react-native";
import OrdersList from "./order-list";

describe("<OrdersList />", () => {
  it('renders "Nenhum pedido" when no orders and not loading', async () => {
    const { queryByText } = render(
      <OrdersList orders={[]} incomingOrders={[]} loading={false} />
    );

    expect(queryByText("Nenhum pedido")).toBeTruthy();
  });
});
