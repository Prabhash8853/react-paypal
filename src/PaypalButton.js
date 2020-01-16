import React, { useState, useEffect } from "react";

function PaypalButton({ product }) {
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = React.createRef();

  useEffect(() => {
    // const script = document.createElement("script");

    // script.src =
    //   "https://www.paypal.com/sdk/js?client-id=AUvuCxBT3tO3_DD5aqOmlksN_2X5I2gneZMHE9qJQM3chocms4CHkPpdL7lUrKtxsNU_ozg6zK7WEuYl";
    // script.addEventListener("load", () => setLoaded(true));

    // document.body.appendChild(script);
    // if (loaded) {
    //   setTimeout(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: product.description,
                amount: {
                  currency_code: "INR",
                  value: product.price
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          setPaidFor(true);
          console.log(order);
        },
        onError: err => {
          setError(err);
          console.error(err);
        }
      })
      .render("#render_paypal");
    //   });
    // }
  }, [product.description, product.price]);

  if (paidFor) {
    return (
      <div>
        <h1>Congrats, you just bought {product.name}!</h1>
      </div>
    );
  }

  return (
    <div>
      {error && <div>Uh oh, an error occurred! {error.message}</div>}
      <h1>
        {product.description} for ${product.price}
      </h1>
      <div id="render_paypal" ref={paypalRef} />
    </div>
  );
}

export default PaypalButton;
