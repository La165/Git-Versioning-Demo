import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, decreaseQuantity, removeFromCart } from "./Store";
import CouponApply from "./CouponApply";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const { discount = 0, applied = false, code = "", message = "" } =
    useSelector((state) => state.coupon) || {};

  const [discountPercentage, setDiscountPercentage] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // PRICE CALCULATIONS
  const calculations = useMemo(() => {
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const customDiscountAmount = totalPrice * (discountPercentage / 100);
    const priceAfterCustomDiscount = totalPrice - customDiscountAmount;

    const couponDiscountAmount = priceAfterCustomDiscount * (discount / 100);
    const gstAmount = priceAfterCustomDiscount * 0.18;

    const netAmount =
      priceAfterCustomDiscount + gstAmount - couponDiscountAmount;

    return {
      totalPrice,
      customDiscountAmount,
      priceAfterCustomDiscount,
      couponDiscountAmount,
      gstAmount,
      netAmount,
    };
  }, [cartItems, discountPercentage, discount]);

  const {
    totalPrice,
    customDiscountAmount,
    priceAfterCustomDiscount,
    couponDiscountAmount,
    gstAmount,
    netAmount,
  } = calculations;

  const upiId = "7675087614@ibl";
  const payerName = "Lalitha's FoodZone";
  const upiLink = `upi://pay?pa=${upiId}&pn=${payerName}&am=${netAmount}&cu=INR`;

  const [showQR, setShowQR] = useState(false);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🛒 Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <h4 className="text-center text-secondary">Your cart is empty</h4>
      ) : (
        <>
          {/* CART ITEMS */}
          <div className="row g-3">
            {cartItems.map((item) => (
              <div className="col-md-6" key={item.id}>
                <div className="card shadow-sm p-3 d-flex flex-row align-items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rounded"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                  <div className="ms-3 flex-grow-1">
                    <h5>{item.name}</h5>
                    <p className="text-muted">₹{item.price}</p>

                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => {
                          dispatch(decreaseQuantity({ id: item.id }));
                          toast.info(`${item.name} removed from cart`);
                        }}
                      >
                        -
                      </button>

                      <span className="mx-2 fw-bold">{item.quantity}</span>

                      <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => {
                          dispatch(addToCart(item));
                          toast.success(`${item.name} added to cart`);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="btn btn-danger btn-sm ms-3"
                    onClick={() => {
                      dispatch(removeFromCart({ id: item.id }));
                      toast.error(`${item.name} removed from cart`);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* COUPON APPLY */}
          <div className="mt-4">
            <CouponApply />
            <p className="mt-2 fw-bold">
              {message && (applied ? "✔ " : "✖ ")} {message}{" "}
              {code && `(Code: ${code})`}
            </p>
          </div>

          {/* EXTRA DISCOUNT BUTTONS */}
          <div className="mt-3">
            <h4>Extra Discount (Choose one)</h4>
            <button
              className="btn btn-warning m-1"
              onClick={() => {
                setDiscountPercentage(10);
                toast.success("10% extra discount applied!");
              }}
            >
              Apply 10% Discount
            </button>

            <button
              className="btn btn-warning m-1"
              onClick={() => {
                setDiscountPercentage(20);
                toast.success("20% extra discount applied!");
              }}
            >
              Apply 20% Discount
            </button>

            <button
              className="btn btn-warning m-1"
              onClick={() => {
                setDiscountPercentage(30);
                toast.success("30% extra discount applied!");
              }}
            >
              Apply 30% Discount
            </button>
          </div>

          {/* PRICE DETAILS */}
          <div className="mt-3">
            <h3>Total Amount: ₹{totalPrice.toFixed(2)}</h3>

            {discountPercentage > 0 && (
              <>
                <h4>Extra Discount Applied: {discountPercentage}%</h4>
                <h4>Extra Discount Amount: ₹{customDiscountAmount.toFixed(2)}</h4>
                <h4>
                  Price After Extra Discount: ₹{priceAfterCustomDiscount.toFixed(2)}
                </h4>
              </>
            )}

            {applied && (
              <h4>Coupon Discount: ₹{couponDiscountAmount.toFixed(2)}</h4>
            )}

            <h4>GST (18%): ₹{gstAmount.toFixed(2)}</h4>

            <h2 className="mt-2 text-success">
              Amount to Pay: ₹{netAmount.toFixed(2)}
            </h2>
          </div>

          {/* QR CODE */}
          <button
            className="btn btn-primary mt-3"
            onClick={() => setShowQR(true)}
          >
            Pay Now (Scan QR)
          </button>

          {showQR && (
            <div className="text-center mt-3">
              <h2>Scan To Pay</h2>
              <QRCodeCanvas value={upiLink} size={250} />
              <h3>Total Amount: ₹{netAmount.toFixed(2)}</h3>
            </div>
          )}

          {/* CHECKOUT */}
          <div className="text-end mt-4">
            <button
              className="btn btn-success"
              onClick={async () => {
                if (cartItems.length === 0) {
                  Swal.fire({
                    icon: "warning",
                    title: "Cart is empty!",
                    text: "Please add some items before checkout.",
                  });
                  return;
                }

                const orderData = {
                  items: cartItems.map(({ id, name, price }) => ({
                    id,
                    name,
                    price,
                  })),
                  totalAmount: netAmount,
                };

                try {
                  await axios.post(
                    "http://localhost:3000/api/v1/products/saveOrders",
                    orderData
                  );

                  Swal.fire({
                    icon: "success",
                    title: "Order Placed!",
                    text: "Your order has been placed successfully!",
                  }).then(() => {
                    navigate("/orders"); // Navigate after user clicks OK
                  });
                } catch (error) {
                  Swal.fire({
                    icon: "error",
                    title: "Order Failed!",
                    text:
                      error.response?.data?.message ||
                      "Something went wrong. Please try again.",
                  });
                }
              }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
