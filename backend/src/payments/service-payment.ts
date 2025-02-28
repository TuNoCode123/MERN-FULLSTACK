import axios, { AxiosRequestConfig } from "axios";
import { linkPayment } from "../utils/actions/actions";
require("dotenv").config();

const createAccessToken = async () => {
  const config: AxiosRequestConfig = {
    url: process.env.BASEURLPAYPAL + "v1/oauth2/token",
    method: "post",
    auth: {
      username: process.env.CLIENT_ID ? process.env.CLIENT_ID : "test",
      password: process.env.CLIENT_SECRET ? process.env.CLIENT_SECRET : "test",
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: "grant_type=client_credentials",
  };
  const response = await axios(config);
  return response.data.access_token;
};

export const createOrder = async (price = 1, doctorId: any, patientId: any) => {
  const access_token = await createAccessToken();
  const config: AxiosRequestConfig = {
    url: "https://api-m.sandbox.paypal.com/v2/checkout/orders",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    data: {
      intent: "CAPTURE",
      purchase_units: [
        {
          items: [
            {
              name: "test payment nodejs",
              description: "test course with nodejs",
              quantity: 1,
              unit_amount: { currency_code: "USD", value: price },
            },
          ],
          amount: {
            currency_code: "USD",
            value: price,
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: price,
              },
            },
          },
        },
      ],
      payment_source: {
        paypal: {
          experience_context: {
            payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
            user_action: "PAY_NOW",
            shipping_preference: "NO_SHIPPING",
            return_url: `${process.env.BASEURL}${linkPayment.complete}?doctorId=${doctorId}&patientId=${patientId}`,
            cancel_url: `${process.env.BASEURL}${linkPayment.cancel}?doctorId=${doctorId}`,
          },
        },
      },
    },
  };
  try {
    const response = await axios(config);
    return response.data.links.find((item: any) => item.rel == "payer-action")
      .href;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error creating order:", error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }
  }
};
export const capturePayment = async (token: any) => {
  const access_token = await createAccessToken();
  const config: AxiosRequestConfig = {
    url: process.env.BASEURLPAYPAL + `v2/checkout/orders/${token}/capture`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  };
  const response = await axios(config);
  console.log("----->", response.data);
};
