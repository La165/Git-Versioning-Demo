import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "./Store";
import "./Orders.css";

const Orders = () => {
  const dispatch = useDispatch();

  const { getOrderedItems, loading, error } = useSelector(
    (state) => state.getOrders
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h2 className="orders-heading">🛒 Your Orders</h2>

        {/* Loading */}
        {loading && <p className="orders-loading">Fetching your orders...</p>}

        {/* Error */}
        {error && <p className="orders-error">Error: {error}</p>}

        {/* No Orders */}
        {!loading && getOrderedItems.length === 0 && (
          <p className="orders-empty">You have not placed any orders yet.</p>
        )}

        {/* Orders List */}
        {getOrderedItems.length > 0 &&
          getOrderedItems.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <span className="order-id">Order #{order._id}</span>
                <span className="order-amount">₹{order.totalAmount}</span>
              </div>

              <h4 className="order-subheading">Items Ordered:</h4>

              <ul className="order-item-list">
                {order.items?.map((item, index) => (
                  <li key={index} className="order-item">
                    <span>{item.name}</span>
                    <span>
                      ₹{item.price} × {item.quantity}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="order-date">
                Placed On: {new Date(order.orderDate).toLocaleString()}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Orders;
