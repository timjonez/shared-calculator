import json
from channels.generic.websocket import WebsocketConsumer


class CalculationConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
    
    def receive(self, text_data):
        json_calc = json.loads(text_data)
        str_calculation = json_calc['calculation']

        self.send(text_data=json.dumps({
            'calculation': str_calculation
        }))
        