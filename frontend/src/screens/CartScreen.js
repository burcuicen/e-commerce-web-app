import React from "react";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  return (
    <div>
      <h1>Shopping Cart Demo</h1>
      {/* this paragraph element is just temporary. It is a test to see if code is properly working. I will do the design afterwards */}
      <p>
        ADD TO CART : ProductID: {productId} Qty: {qty}
      </p>
    </div>
  );
}
