
import ApiService from '../../service/api.service';

const setStatus = async (orders) => {
    try {
        for (const order of orders) {
            if (order.banking === 1 && order.status !== 1) {
                const response = await ApiService.get(`order-payment/order-information/${order.orderCode}`);
                if (response.status === 200) {
                    const psymentStatus = response.data.data;
                    let status = -1;
                    if (psymentStatus.status === "PENDING") {
                        status = -1;
                    } else if (psymentStatus.status === "CANCELLED") {
                        status = 0;
                    } else if (psymentStatus.status === "PAID") {
                        status = 1;
                    } else{
                        status = -1;
                    }
                    await ApiService.post(`orders/set-status/${order._id}/${status}`);
                } else {
                    console.log("Error: Unable to fetch order information");
                }
            }
            /*await new Promise(resolve => setTimeout(resolve, 5000));*/
        }
    } catch (error) {
        console.error("Error setting order status:", error);
    }
};

export default setStatus;
