**Get Payment Options**

GET /payments/options

RESPONSE 200 OK

    [
	    {
			id:1,
			name:"sslcommerz"
	    }
    ]
**Initiate Transaction**

POST /transactions/initiate

BODY 

    {
		option_id:1,
		order_id:2,
		total_amount: 150.00
		currency: 'BDT',
		success_url: '',
		fail_url:'',
		cancel_url:'',
		cus_name:'',
		cus_email:'',
		cus_add:'',
		cus_city:'',
		cus_postcode:'',
		cus_country:'',
		cus_phone:'',
		num_of_item:'',
	}

RESPONSE 201 Created

    {
	    "transaction_id":1,
	    "session_key":"",
	    "gateway_page_url":""
	}

**Initiate Refund**

POST /refunds/initiate

BODY

    {
		option_id:1,
		transaction_id:1,
		refund_amount:50.00,
		refund_remarks:"reason of refund"
	}
Response : 201 Created

