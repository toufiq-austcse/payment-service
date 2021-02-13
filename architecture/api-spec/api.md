**Initiate Transaction**

POST /transactions/initiate

BODY 

        {
		orderId:2,
		totalAmount: 150.00,
		successUrl: '',
		failUrl:'',
		cancelUrl:'',
		customer:{
			name:'',
			email:'',
			address:'',
			city:'',
			postcode:'',
			country:'',
			phone:'',

		},
		noOfItems:'',

        }

RESPONSE 302 Redirect

        {
	    "gatewayPageUrl":""
	}


