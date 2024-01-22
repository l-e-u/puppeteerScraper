import puppeteer from 'puppeteer';

const getQuotes = async () => {
   // Start a Puppeteer session with:
   // - a visible browser ('headless: false' - easier to debug because you'll see the browser in action)
   // - no default viewport ('defaultViewport: null' - website page will in full width and height)
   const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
   });

   // Open a new page
   // const page = await browser.newPage();

   // Use the first open page
   const [page] = await browser.pages();

   // On this new page:
   // - open the "http://quotes.toscrape.com" website
   // - wait until the dom content is loaded (HTML is ready)
   await page.goto("http://quotes.toscrape.com/", {
      waitUntil: "domcontentloaded"
   });

   // Get page data

   // Variable stores one quote from the current page
   const oneQuote = await page.evaluate(() => {
      // Fetch the first element with class "quote"
      const quote = document.querySelector(".quote");

      // Fetch the sub-elements from the previously fetched quote element
      // Get the displayed text and return it (`.innerText')
      const text = quote.querySelector(".text").innerText;
      const author = quote.querySelector(".author").innerText;

      return { text, author };
   });

   // Variable stores all quotes from the current page
   const allQuotes = await page.evaluate(() => {
      // Fetch all elements with the class "quote"
      const quotes = document.querySelectorAll(".quote");

      // Convert the quotes to an iterable array
      // For each quote, fetch the text and author
      return [...quotes].map(quote => {
         // Fetch the sub-elements from the previously fetched quote element
         // Get the displayed text and return it ('.innerText)
         const text = quote.querySelector('.text').innerText;
         const author = quote.querySelector('.author').innerText;

         return { text, author };
      });
   });

   // Function gets all the quotes from the current page
   const getQuotes = async () => {
      return await page.evaluate(() => {
         // Fetch all elements with the class "quote"
         const quotes = document.querySelectorAll(".quote");

         // Convert the quotes to an iterable array
         // For each quote, fetch the text and author
         return [...quotes].map(quote => {
            // Fetch the sub-elements from the previously fetched quote element
            // Get the displayed text and return it ('.innerText)
            const text = quote.querySelector('.text').innerText;
            const author = quote.querySelector('.author').innerText;

            return { text, author };
         });
      });
   };

   // Display the saved quote extracted from the current page at that time
   // console.log(oneQuote);

   // Display the saved quotes extracted from the current page at that time
   // console.log(allQuotes);

   // Display all quotes extracted form the current page
   console.log(await getQuotes());

   // Click on the "Next" button to navigate to the next page
   await page.click(".pager > .next > a");

   // Display all quotes extracted form the current page
   console.log(await getQuotes());

   // Close the browser
   await browser.close();
};

// Start the scraping
getQuotes();
