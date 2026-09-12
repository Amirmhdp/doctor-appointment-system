import json

import requests


class ZarinPal:

    LIVE_API_REQUEST = ('https://api.zarinpal.com/pg/v4/payment/request.json')

    LIVE_API_VERIFY = ('https://api.zarinpal.com/pg/v4/payment/verify.json')

    LIVE_STARTPAY = ('https://www.zarinpal.com/pg/StartPay/{authority}')

    SANDBOX_API_REQUEST = ('https://sandbox.zarinpal.com/pg/v4/payment/request.json')

    SANDBOX_API_VERIFY = ('https://sandbox.zarinpal.com/pg/v4/payment/verify.json')

    SANDBOX_STARTPAY = ('https://sandbox.zarinpal.com/pg/StartPay/{authority}')

    def __init__(self, merchant, callback_url, sandbox=False):
        self.merchant = merchant
        self.callback_url = callback_url
        self.sandbox = sandbox

        if self.sandbox:
            self.api_request = self.SANDBOX_API_REQUEST
            self.api_verify = self.SANDBOX_API_VERIFY
            self.startpay = self.SANDBOX_STARTPAY
        else:
            self.api_request = self.LIVE_API_REQUEST
            self.api_verify = self.LIVE_API_VERIFY
            self.startpay = self.LIVE_STARTPAY

    def send_request(self, amount, description, mobile=None):

        data = {
            'merchant_id': self.merchant,
            'amount': amount,
            'callback_url': self.callback_url,
            'description': description,
            'metadata': {
                'mobile': mobile,
            }
        }

        headers = {
            'accept': 'application/json',
            'content-type': 'application/json',
        }

        response = requests.post(url=self.api_request, data=json.dumps(data), headers=headers)

        result = response.json()

        if len(result['errors']) == 0:

            authority = result['data']['authority']

            return {
                'success': True,
                'authority': authority,
                'url': self.startpay.format(
                    authority=authority
                )
            }

        return {
            'success': False,
            'error_code': result['errors'].get('code'),
            'message': result['errors'].get('message'),
        }

    def verify(self, amount, authority):

        data = {
            'merchant_id': self.merchant,
            'amount': amount,
            'authority': authority,
        }

        headers = {
            'accept': 'application/json',
            'content-type': 'application/json',
        }

        response = requests.post(url=self.api_verify, data=json.dumps(data), headers=headers)

        result = response.json()

        if len(result['errors']) == 0:

            code = result['data']['code']

            if code == 100:
                return {
                    'success': True,
                    'ref_id': result['data']['ref_id'],
                }

            if code == 101:
                return {
                    'success': True,
                    'already_verified': True,
                    'ref_id': None,
                }

        return {
            'success': False,
            'error_code': result['errors'].get('code'),
            'message': result['errors'].get('message'),
        }




