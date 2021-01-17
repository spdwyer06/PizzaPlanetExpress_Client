import MenuItemModel from './MenuItemModel';

type OrderModel = {
    id: number,
    user: {
        firstName: string,
        lastName: string
    },
    customer: {
        firstName: string,
        lastName: string,
        phoneNumber: number
    },
    orderTime: Date,
    menuItems: MenuItemModel[],
    totalPrice: number,
    isPaid: boolean
};

export default OrderModel;