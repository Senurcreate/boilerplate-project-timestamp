const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Routes
app.get('/api/:date?', (req, res) => {
  let dateString = req.params.date;
  let date;

  // Handle empty date parameter (current time)
  if (!dateString) {
    date = new Date();
    return res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }

  // Check if it's a Unix timestamp (number string)
  if (/^\d+$/.test(dateString)) {
    date = new Date(parseInt(dateString));
  } else {
    date = new Date(dateString);
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