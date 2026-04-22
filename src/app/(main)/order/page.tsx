import Order from "@/components/Order/Order";
import { Suspense } from "react";

const OrderPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Order />
        </Suspense>
    );
};

export default OrderPage;