
# 🌿 Sensor-to-Server IoT Communication (Arduino + ESP32)

This project demonstrates an IoT setup where an **Arduino (or compatible board)** reads environmental sensor data (temperature, humidity, and soil moisture) and sends it over **UART** to an **ESP32**, which then forwards the data via **HTTP POST** to a backend server.

## 📶 Architecture Overview

```
[Sensors: DHT11 + Soil Moisture]
        |
     [Arduino]
        |
   UART (9600 baud)
        |
     [ESP32]
        |
     Wi-Fi
        |
   [HTTP POST to Backend API]
```

## 🔧 Components Used

| Component            | Purpose                                     |
|---------------------|---------------------------------------------|
| **DHT11 Sensor**     | Measures temperature and humidity           |
| **Soil Moisture Sensor** | Measures soil water content          |
| **Arduino Board**    | Reads sensor data and sends it over UART   |
| **ESP32 Dev Board**  | Receives UART data and sends it via Wi-Fi  |
| **Wi-Fi Network**    | Used by ESP32 to communicate with backend  |

## 📡 Arduino Code: Sensor Reader & UART Sender

### Functionality

- Reads data from:
  - **DHT11** for temperature & humidity.
  - **Soil moisture sensor** via analog input.
- Prints sensor values to **Serial** in JSON format, e.g.:

```json
{"temperature":24.50,"humidity":45.20,"moisture":631}
```

### Key Pins

- `DHT11` connected to **Digital Pin 2**
- `Soil Moisture Sensor` connected to **Analog Pin A0**

### Communication

- Data is sent every **5 seconds** over `Serial` (9600 baud rate), which is received by ESP32 via UART2.

## 🔌 ESP32 Code: Wi-Fi + UART Receiver + HTTP Client

### Functionality

- Initializes UART2 (pins **RX2: GPIO16**, **TX2: GPIO17**) to read incoming data from Arduino.
- Connects to the given Wi-Fi network using SSID and password.
- Waits for JSON string input from Arduino via UART2.
- On receiving valid JSON, it performs an HTTP `POST` to a specified server URL.
- Handles Wi-Fi reconnection if disconnected.

### Configuration

```cpp
const char* ssid = "Wifi_Name";
const char* password = "Wifi_Password";
const char* serverUrl = "https://example.com/api/data"; // Your server endpoint
```

### UART Configuration

```cpp
#define RX2_PIN 16
#define TX2_PIN 17
Serial2.begin(9600, SERIAL_8N1, RX2_PIN, TX2_PIN);
```

### HTTP Request

- JSON is sent with `Content-Type: application/json`
- Response code is printed to Serial for debugging

## 🔄 Data Flow Summary

1. **Arduino**
   - Reads sensors
   - Constructs JSON
   - Sends over UART

2. **ESP32**
   - Listens via `Serial2`
   - Parses incoming JSON string
   - Sends it to the backend via `HTTPClient::POST()`

3. **Backend Server**
   - Receives and processes sensor data

## 🧪 Example Output

**Serial Monitor (ESP32):**

```
ESP32 Starting...
Connecting to WiFi......
Connected to WiFi!
IP Address: 192.168.1.105
Waiting for UART2 input...
Received Data from UART2: {"temperature":24.50,"humidity":45.20,"moisture":631}
📡 Response Code: 200
```

## 📌 Notes

- Ensure **common GND** connection between Arduino and ESP32.
- Baud rates must match (`9600` used here).
- If ESP32 doesn’t connect to Wi-Fi, check credentials or signal strength.
- Arduino must be powered independently or via ESP32 5V pin (depending on power draw).
- Update `serverUrl` with your actual backend endpoint that accepts JSON POST data.

