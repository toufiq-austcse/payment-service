**Initiate Transaction**

POST api/transactions/initiate

BODY 

        {
		"orderId": 2, //number
		"totalAmount": 150.00, //number
		"successUrl": "https://google.com", //string
		"failUrl": "https://google.com", //string
		"cancelUrl": "https://google.com", //string
		"customer": {
			"name": "Md. Toufiqul Islam", //string
			"email": "***toufiq.austcse***@gmail.com", //string
			"address": "***123***", //string
			"city": "Dhaka", //string
			"postcode": "***1219***", //string
			"country": "Bangladesh", //string
			"phone": "+88012*******" //string
		},
		"noOfItems": 1 //number
	}	

RESPONSE 302 Redirect

        {
	    "gatewayPageUrl":""
	}


