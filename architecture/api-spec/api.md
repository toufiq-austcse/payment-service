**Initiate Transaction**

POST /transactions/initiate

BODY 

        {
		"orderId": 2,
		"totalAmount": 150.00,
		"successUrl": "https://google.com",
		"failUrl": "https://google.com",
		"cancelUrl": "https://google.com",
		"customer": {
			"name": "Md. Toufiqul Islam",
			"email": "***toufiq.austcse***@gmail.com",
			"address": "***123***",
			"city": "Dhaka",
			"postcode": "***1219***",
			"country": "Bangladesh",
			"phone": "+88012*******"
		},
		"noOfItems": 1
	}	

RESPONSE 302 Redirect

        {
	    "gatewayPageUrl":""
	}


