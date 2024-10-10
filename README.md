# SkySage Weather App

SkySage is a weather application built with React that provides current weather information based on the user's location or a manually entered location.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/SkySage.git
    cd SkySage
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your Weather API key:
    ```env
    REACT_APP_WEATHER_API_KEY=your_api_key_here
    ```

## Usage

1. Start the development server:
    ```sh
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## Features

- Fetches current weather data based on the user's geolocation.
- Allows manual location search to fetch weather data.
- Displays various weather parameters such as temperature, humidity, wind speed, UV index, etc.

