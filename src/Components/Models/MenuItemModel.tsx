type MenuItemModel = {
    id: number,
    name: string,
    price: number,
    orderItem: {
        quantity: number,
        specialInstructions: string
    }
};

export default MenuItemModel;