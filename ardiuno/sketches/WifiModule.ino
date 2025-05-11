#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "Wifi_Name";      
const char* password = "Wifi_Password";      
const char* serverUrl = "Server_URL";  // Backend API URL

//  UART2 pin configuration
#define RX2_PIN 16   // RX2 → GPIO16
#define TX2_PIN 17   // TX2 → GPIO17

void setup() {
  Serial.begin(9600);   //  Serial Monitor
  Serial2.begin(9600, SERIAL_8N1, RX2_PIN, TX2_PIN);  //  Initialize UART2
  delay(1000);

  Serial.println("\nESP32 Starting...");
  Serial.print("Connecting to WiFi");

  WiFi.begin(ssid, password);

  unsigned long startTime = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - startTime < 15000) { 
    delay(500);
    Serial.print(".");
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n Connected to WiFi!");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\n Failed to connect to WiFi. Check credentials!");
  }
}

void loop() {
  Serial.println(" Waiting for UART2 input...");
  delay(1000);

  if (Serial2.available()) {  //  Check UART2 data
    String jsonData = Serial2.readStringUntil('\n');  //  Read from UART2
    jsonData.trim();

    Serial.println(" Received Data from UART2: " + jsonData);

    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;
      http.begin(serverUrl);
      http.addHeader("Content-Type", "application/json");

      int httpResponseCode = http.POST(jsonData);  //  Send data to backend

      Serial.println("📡 Response Code: " + String(httpResponseCode));
      http.end();
    } else {
      Serial.println(" WiFi Disconnected! Reconnecting...");
      WiFi.begin(ssid, password);
    }
  }
}
