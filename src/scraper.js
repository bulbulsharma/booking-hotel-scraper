const puppeteer = require('puppeteer');

async function scrapeBestFiveStarHotel() {
  const browser = await puppeteer.launch({
    headless: false, // Set to true for headless mode
    timeout: 0,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled'
    ]
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
  );

  const city = 'Udaipur';
  const nights = 5;

  const today = new Date();
  today.setDate(today.getDate() + 7);
  const checkin = today.toISOString().split('T')[0];
  const checkoutDate = new Date(today);
  checkoutDate.setDate(today.getDate() + nights);
  const checkout = checkoutDate.toISOString().split('T')[0];

  const adults = 2;
  const children = 1;
  const childAges = 1;
  const currency = 'INR';

  const url = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(city)}&checkin=${checkin}&checkout=${checkout}&group_adults=${adults}&group_children=${children}&age=${childAges}&no_rooms=1&selected_currency=${currency}`;

  console.log(`🔎 Searching for hotels in ${city} from ${checkin} to ${checkout}...`);

  await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

  // ✅ Robust attempt to apply 5-star filter
  try {
    await page.waitForSelector('[data-filters-group="class"]', { timeout: 15000 });

    const fiveStarLabel = await page.$x("//label[contains(., '5 stars') or contains(., '5-star')]");
    if (fiveStarLabel.length) {
      await fiveStarLabel[0].click();
      await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 0 });
      console.log('✅ 5-star filter applied via UI.');
    } else {
      console.log('⚠️ 5-star filter label not found.');
    }
  } catch (err) {
    console.log('⚠️ Failed to apply 5-star filter via UI:', err.message);
  }

  await page.waitForSelector('[data-testid="property-card"], .sr_property_block_main_row', { timeout: 45000 });
  await page.waitForTimeout(3000);

  const hotels = await page.evaluate((nights) => {
    const hotelNodes = document.querySelectorAll('[data-testid="property-card"], .sr_property_block_main_row');
    const results = [];

    hotelNodes.forEach(node => {
      const name = node.querySelector('[data-testid="title"], .sr-hotel__name')?.innerText?.trim();
      const ratingText = node.querySelector('[data-testid="review-score"], .bui-review-score__badge')?.innerText?.trim();
      const rating = ratingText ? parseFloat(ratingText.split('\n')[0]) : null;

      const rawPriceText = node.querySelector('[data-testid="price-and-discounted-price"], .bui-price-display__value, .fcab3ed991')?.innerText || '';
      const priceMatch = rawPriceText.replace(/,/g, '').match(/₹\s?(\d{3,6})/);
      const perNightPrice = priceMatch ? parseInt(priceMatch[1], 10) : null;
      const price = perNightPrice ? perNightPrice * nights : null;

      if (name && price) {
        results.push({ name, rating, price });
      }
    });

    return results;
  }, nights);

  if (!hotels.length) {
    console.log('❌ No hotels found.');
    await browser.close();
    return;
  }

  // Sort by rating
  hotels.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  const bestHotel = hotels[0];

  console.log(`\n✅ Best hotel from 5-star filtered list:\n`);
  console.log(`🏨 Name   : ${bestHotel.name}`);
  console.log(`⭐ Rating : ${bestHotel.rating || 'N/A'}`);
  console.log(`💰 Price  : ₹${bestHotel.price} (for ${nights} nights)`);

  await browser.close();
}

scrapeBestFiveStarHotel();
