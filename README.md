# 🏨 Booking.com 5-Star Hotel Price Scraper

This project is a web scraper built with **Puppeteer (Node.js)** that returns the **lowest listing price** for a **5-night stay** for **2 adults and 1 infant (age < 2 years)** at the **highest-rated 5-star hotel** in any specified city, using **Booking.com**.

---

## ✨ Features

- Searches for real-time hotel listings on Booking.com
- Applies filters: 5-star rating, 2 adults + 1 infant
- Calculates price for a 5-night stay (starting 7 days from today)
- Extracts:
  - Hotel name
  - Rating
  - Total price
  - Booking.com link
- Automatically identifies and selects the 5-star filter from the UI

---

## 📦 Tech Stack

- **Node.js**
- **Puppeteer** (Headless Chrome automation)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)


## Installation

1. Clone the repository:
   ```
   git clone https://github.com/bulbulsharma/booking-hotel-scraper.git
   ```

2. Navigate to the project directory:
   ```
   cd node-puppeteer-scraper
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To run the scraper, execute the following command:

```
npm start
```

This will automatically search Booking.com for the best-rated 5-star hotel in Mumbai for 2 adults and 1 infant (under 2 years) for a 5-night stay starting 7 days from today.


## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

