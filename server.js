const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route handler
app.get('/api/:date?', (req, res) => {
  let dateParam = req.params.date;
  let date;

  // Handle empty date parameter (current time)
  if (!dateParam) {
    date = new Date();
    return res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }

  // Check if it's a Unix timestamp (numeric string)
  if (/^\d+$/.test(dateParam)) {
    date = new Date(parseInt(dateParam));
  } else {
    date = new Date(dateParam);
  }

  // Handle invalid date
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Valid date response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});