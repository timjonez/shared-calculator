import json
from channels.generic.websocket import WebsocketConsumer


class CalculationConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
    
    def receive(self, calculation):
        json_calc = json.loads(calculation)
        str_calculation = json_calc['calculation']
        