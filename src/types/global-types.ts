export type Order = {
  id: string;
  items: string[];
  address: string;
  clientName: string;
  notificationId: string;
};


export type User= {
    id: string;
    accountType: string | null;
    createdAt: Date;
    updatedAt: Date;
    email: string;
}