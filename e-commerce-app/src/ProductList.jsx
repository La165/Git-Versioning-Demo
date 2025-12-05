// src/components/ProductList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";

export default function ProductList({ title, fetchAction, selector }) {
  const dispatch = useDispatch();
  // selector: a function like (state) => state.veg
  const slice = useSelector(selector);

  // slice shape expected: { <itemsKey>: [...], loading, error }
  // we'll try to auto-detect item array from common names
  const items =
    slice.vegItems ?? slice.nonVegItems ?? slice.sweetItems ?? slice.desserts ??
    slice.drinks ?? slice.breakfast ?? slice.snacks ?? slice.fastfood ??
    slice.soups ?? slice.bakery ?? slice;

  useEffect(() => {
    if (fetchAction) dispatch(fetchAction());
  }, [dispatch, fetchAction]);

  const loading = slice.loading;
  const error = slice.error;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 fw-bold text-center">{title}</h2>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-danger text-center">{error?.message ?? error}</p>}

      <div className="row">
        {Array.isArray(items) && items.length > 0 ? (
          items.map((p) => <ProductCard key={p._id ?? p.id} product={p} />)
        ) : (
          !loading && <h5 className="text-center">No items found.</h5>
        )}
      </div>
    </div>
  );
}
