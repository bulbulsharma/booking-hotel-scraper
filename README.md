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

---

## 🚀 How to Run

### 1. Clone this repo

```bash
git clone https://github.com/bulbulsharma/booking-hotel-scraper
cd booking-hotel-scraper
