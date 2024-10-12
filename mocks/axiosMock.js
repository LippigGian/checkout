import axios from "../axiosConfig"
import MockAdapter from 'axios-mock-adapter';

// Crear una instancia de MockAdapter
// const mock = new MockAdapter(axios, );
const mock = new MockAdapter(axios, { delayResponse: 2000 });
// Configurar los mocks

// Configurar el mock para la URL "/api/orders/sendform"
mock.onPost("/api/orders/sendform").reply(200, {
  success: true,
  id: "12345", // Este es el ID de la orden que se generará
});


//Mock para checkout (pantalla general)
mock.onGet(/\/checkout\/orders\/\w+/).reply((config) => {
  // Extrae el orderId del URL
  const orderId = config.url.split('/').pop();

  // Define una respuesta simulada basada en el orderId
  const mockData = {
    id: orderId,
    description: 'Descripción de ejemplo',
    amount: 10,
    name: 'Gianfranco Lippi',
  };
  return [200, mockData];
});

//Mock para crear QR:
mock.onPost(/\/pago-modo\/orders\/\w+/).reply((config) => {
  // Extrae el orderId del URL
  const orderId = config.url.split('/').pop();

  // Define una respuesta simulada basada en el orderId
  const mockData = {
    "imgQR": "https://geopagos.s3.amazonaws.com/qr/20240910/66e06604e6522.png",
    "qrString": "00020101021241360011coop.sipago98113069226478599020130150011coop.sipago501500112033897593851260022000014300000000002738652040008530303254031055802AR5915federico kucher6015Capital Federal610414146217051366e06604e65226304325A",
    "subscriptionUrl": "https://sse-hub-geopagos.prod.geopagos.com/hub?topic=https://api.sipago.coop/payments/qr/942087&Last-Event-ID=eba0a023-3ebc-4d9f-823f-cda7a8a39841",
    "urlModo": "https://assets.mobile.playdigital.com.ar/pago-ecommerce-modo?qr=00020101021241360011coop.sipago98113069226478599020130150011coop.sipago501500112033897593851260022000014300000000002738652040008530303254031055802AR5915federico%20kucher6015Capital%20Federal610414146217051366e06604e65226304325A&callback=https%3A%2F%2Fwww.sipago.coop%2F&callbackSuccess=https%3A%2F%2Fwww.sipago.coop%2F",
    "idQrHash": "66e06604e6522",
    "amount": 105
  }
  return [200, mockData];
});

mock.onGet(/\/pago-tarjeta\/orders\/\w+/).reply((config) => {
  // Extrae el orderId del URL
  const orderId = config.url.split('/').pop();

  // Define una respuesta simulada basada en el orderId
  const mockData = {
    id: orderId,
    description: 'Descripción de ejemplo',
    amount: 10,
    name: 'Gianfranco Lippi',
  };

  return [200, mockData];
});

mock.onGet(/\/pago-modo\/orders\/\w+/).reply((config) => {
  // Extrae el orderId del URL
  const orderId = config.url.split('/').pop();

  // Define una respuesta simulada basada en el orderId
  const mockData ={
        "idQrHash": "66ce0a91f002a",
        "amount": "105",
        "clientId": "452878db-e1be-42ad-8525-cde0b2796c37",
        "qr_raw": "00020101021241360011coop.sipago98113069226478599020130150011coop.sipago501500112033897593851260022000014300000000002738652040008530303254031055802AR5915federico kucher6015Capital Federal610414146217051366ce0a91f002a630475F2",
        "urlCallback": "https://www.sipago.coop/",
        "urlRedirect": "https://www.sipago.coop/",
        "subscriptionUrl": "https://sse-hub-geopagos.prod.geopagos.com/hub?topic=https://api.sipago.coop/payments/qr/942087&Last-Event-ID=eba0a023-3ebc-4d9f-823f-cda7a8a39841"
      }

  return [200, mockData];
});


// mock.onGet("/pago-modo/orders/ff2d5419-59b6-11eb-9483-12d963eaa349").reply(() => {
//   console.log("Mocked API call intercepted");
//   return [200, {
//     "idQrHash": "66ce0a91f002a",
//     "amount": "105",
//     "clientId": "452878db-e1be-42ad-8525-cde0b2796c37",
//     "qr_raw": "00020101021241360011coop.sipago98113069226478599020130150011coop.sipago501500112033897593851260022000014300000000002738652040008530303254031055802AR5915federico kucher6015Capital Federal610414146217051366ce0a91f002a630475F2",
//     "urlCallback": "https://www.sipago.coop/",
//     "urlRedirect": "https://www.sipago.coop/",
//     "subscriptionUrl": "https://sse-hub-geopagos.prod.geopagos.com/hub?topic=https://api.sipago.coop/payments/qr/942087&Last-Event-ID=eba0a023-3ebc-4d9f-823f-cda7a8a39841"
//   }];
// });

mock.onGet('/users').reply(200, {
  users: [{ id: 1, name: 'John Smith' }],
});

mock.onPost('/api/data').reply(200, {
  link: 'https://mocked-payment-link.com',
});

// mock.onPost('/api/link').reply(200, {
//   message: 'User registered successfully',
// });

// Configurar los mocks
mock.onPost('/api/link').reply(config => {
  // Parsear los datos enviados en el cuerpo de la petición
  const { amount, description, currencyCode, userId } = JSON.parse(config.data);

  // Devolver una respuesta que incluya los datos dinámicos
  return [200, {
    amount: amount,
    description: description,
    currencyCode: currencyCode,
    userId: userId,
    message: `Se creó el link de pago por $${amount} para "${description}"`,
    link: 'https://mocked-payment-link.com',
  }];
});

mock.onPost('app/login').reply(200, {
  token: 'Bienvenido de nuevo Gian',
});


mock.onPost('/api/numerotarjeta').reply(200, {
  

  
    //       "code": null,
    //       "financialRate": 0,
    //       "installment": 1,
    //       "installmentId": 31,
    //       "name": "1 Cuota",
    //       "quantity": 1,
    //       "receivedAmount": 94.07,
    //       "total": 100,
    //       "type": "INSTALLMENT_WITH_FC"
    //     },

    "success": "OK",
    "data": [
      {
        "name": "Visa",
        "brand": "VISA",
        "type": "CREDIT",
        "securityCodeLength": 3,
        "imageUrl": "https://geopagos.s3.amazonaws.com/images/cabal/payments/visa.png",
        "installments": [
          {
            "code": null,
            "financialRate": 0,
            "installment": 1,
            "installmentId": 31,
            "name": "1 Cuota",
            "quantity": 1,
            "receivedAmount": 9.41,
            "total": 10,
            "type": "INSTALLMENT_WITH_FC"
          },
          {
            "code": null,
            "financialRate": 0.1444,
            "installment": 3,
            "installmentId": 203,
            "name": "3 Cuotas",
            "quantity": 3,
            "receivedAmount": 9.29,
            "total": 12.12,
            "type": "INSTALLMENT_WITH_FC"
          },
          {
            "code": null,
            "financialRate": 0,
            "installment": 6,
            "installmentId": 204,
            "name": "6 Cuotas",
            "quantity": 6,
            "receivedAmount": 6.57,
            "total": 10,
            "type": "INSTALLMENT_WITH_FC"
          },
          {
            "code": null,
            "financialRate": 0,
            "installment": 9,
            "installmentId": 32,
            "name": "9 Cuotas",
            "quantity": 9,
            "receivedAmount": 5.49,
            "total": 10,
            "type": "INSTALLMENT_WITH_FC"
          },
          {
            "code": null,
            "financialRate": 0.392,
            "installment": 12,
            "installmentId": 34,
            "name": "12 Cuotas",
            "quantity": 12,
            "receivedAmount": 8.86,
            "total": 19.02,
            "type": "INSTALLMENT_WITH_FC"
          },
          {
            "code": null,
            "financialRate": 0.0603,
            "installment": 13,
            "installmentId": 33,
            "name": "Cuota Simple 3",
            "quantity": 13,
            "receivedAmount": 9.36,
            "total": 10.79,
            "type": "INSTALLMENT_WITH_FC"
          },
          {
            "code": null,
            "financialRate": 0.1145,
            "installment": 16,
            "installmentId": 35,
            "name": "Cuota Simple 6",
            "quantity": 16,
            "receivedAmount": 9.31,
            "total": 11.61,
            "type": "INSTALLMENT_WITH_FC"
          },
          {
            "code": null,
            "financialRate": 0.1645,
            "installment": 19,
            "installmentId": 985,
            "name": "Cuota Simple 9",
            "quantity": 19,
            "receivedAmount": 9.27,
            "total": 12.49,
            "type": "INSTALLMENT_WITH_FC"
          },
          {
            "code": null,
            "financialRate": 0.2107,
            "installment": 7,
            "installmentId": 961,
            "name": "Cuota Simple 12",
            "quantity": 7,
            "receivedAmount": 9.2,
            "total": 13.42,
            "type": "INSTALLMENT_WITH_FC"
          }
        ],
        "merchantId": "77000170",
        "terminalId": "77000170"
      }
    ]
  
});








//Confirmar pago. SOLICIUTD POST
// {
//   "data": {
//     "cardNumber": "4338 3100 1073 2210",
//     "cardExpiration": "11/28",
//     "cardCVV": "304",
//     "cardType": "CREDIT",
//     "cardBrand": "VISA",
//     "cardHolderName": "Gianfranco Lippi",
//     "installments": {
//       "code": null,
//       "financialRate": 0,
//       "installment": 1,
//       "installmentId": 31,
//       "name": "1 Cuota",
//       "quantity": 1,
//       "receivedAmount": 94.07,
//       "total": 100,
//       "type": "INSTALLMENT_WITH_FC"
//     },
//     "customerEmail": "Gianfran.lippi@yahoo.com.ar",
//     "customerName": "Gianfranco Lippi",
//     "identificationNumber": "39.595.478",
//     "cellphoneNumber": "",
//     "province": null,
//     "isNamePasted": false,
//     "isDNIPasted": false,
//     "isCVVPasted": false,
//     "isCardNumberPasted": false,
//     "sessionId": "22d6ca6f-1256-41bc-b3a1-9c0622b97db9",
//     "meta": {
//       "source": "https://checkout.sipago.coop",
//       "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
//       "clientIp": "181.44.116.160"
//     },
//     "origin": "dashboard_payment_link",
//     "items": [
//       {
//         "name": "prueba",
//         "quantity": 1,
//         "unitPrice": {
//           "currency": "032",
//           "amount": 10000
//         },
//         "itemId": null
//       }
//     ],
//     "taxes": [],
//     "tip": null
//   },
//   "uuid": "674a5e0d-fa99-4caf-887a-6bb5d279eb74",
//   "hasPendingPayment": false,
//   "tokenCaptcha": "",
//   "appKey": "cabal",
//   "ecommerceManager": false,
//   "userUuid": "ff2d5419-59b6-11eb-9483-12d963eaa349"
// }


export default mock;




