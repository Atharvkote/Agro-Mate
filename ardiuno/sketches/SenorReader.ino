#include <DHT.h>

#define DHTPIN 2          // DHT11 connected to Digital Pin 2
#define DHTTYPE DHT11
#define MOISTUREPIN A0    // Soil moisture sensor connected to A0

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
  Serial.println("Starting communication...");
}

void loop() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();
  int moisture = analogRead(MOISTUREPIN); // Read moisture sensor value

  if (!isnan(temperature) && !isnan(humidity)) {
    // Send all sensor data in JSON format
    Serial.print("{\"temperature\":");
    Serial.print(temperature);
    Serial.print(",\"humidity\":");
    Serial.print(humidity);
    Serial.print(",\"moisture\":");
    Serial.print(moisture);
    Serial.println("}");
  } else {
    Serial.println("Failed to read from DHT sensor!");
  }

  delay(5000); // Wait 5 seconds before next reading
}
