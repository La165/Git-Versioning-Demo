// src/components/ProductCard.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./Store";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  // compute discounted price if discount present
  const discount = product.discount || 0;
  const discountedPrice = +(product.price * (1 - discount / 100)).toFixed(2);

  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm">
        <div style={{ height: 180, overflow: "hidden" }}>
          <img
            src={product.image}
            alt={product.name}
            className="card-img-top"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            loading="lazy"
          />
        </div>

        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start">
            <h6 className="card-title mb-1">{product.name}</h6>
            <span className="badge bg-info text-dark">{product.category}</span>
          </div>

          <p className="text-muted small mb-2" style={{ flex: "0 0 auto" }}>
            {product.description}
          </p>

          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                {discount > 0 ? (
                  <>
                    <div className="small text-muted text-decoration-line-through">
                      ₹{product.price.toFixed(2)}
                    </div>
                    <div className="fw-bold text-success">₹{discountedPrice}</div>
                  </>
                ) : (
                  <div className="fw-bold text-success">₹{product.price.toFixed(2)}</div>
                )}
              </div>

              <div className="text-end">
                <span className="badge bg-warning text-dark">★ {product.rating ?? 4.5}</span>
              </div>
            </div>

            {discount > 0 && (
              <div className="mb-2">
                <small className="text-danger">{discount}% OFF</small>
              </div>
            )}

            <button
              className="btn btn-primary w-100"
              onClick={() => dispatch(addToCart({ ...product }))}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
