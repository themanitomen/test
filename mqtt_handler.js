const mqtt = require('mqtt');

class MqttHandler {
  constructor() {
    this.mqttClient = null;
    this.host = 'mqtt://m15.cloudmqtt.com';
    this.username = 'vhtpyzek'; 
    this.password = 'IHjGbkiD4oMZ';
	this.port =16073
  }
  
  connect() {
  
    this.mqttClient = mqtt.connect(this.host, { username: this.username, password: this.password, port:this.port });

    
    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

  
    this.mqttClient.on('connect', () => {
      console.log(`mqtt client connected`);
    });

   

	
	this.mqttClient.subscribe('esti/acces', {qos: 2});
	this.mqttClient.subscribe('esti/luz', {qos: 2});

    this.mqttClient.on('message', function (topic, message) {
		
      console.log(message.toString());
    });
	 this.mqttClient.on('mens', function (topic, mens) {
      console.log(mens.toString());
    });

    this.mqttClient.on('close', () => {
      console.log(`mqtt client disconnected`);
    });
  }
    

    sendMessage(message) {
    		if(this.mqttClient.subscribe="esti/luz"){
			this.mqttClient.publish('esti/luz', message);
		}
		if(this.mqttClient.subscribe="esti/acces"){
		this.mqttClient.publish('esti/acces', message);
	
	}
  }
}


module.exports = MqttHandler;