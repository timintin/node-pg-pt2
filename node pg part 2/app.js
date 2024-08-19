
const express = require("express");
const app = express();
const companiesRoutes = require('./routes/companies');
const invoicesRoutes = require('./routes/invoices');
const industriesRoutes = require('./routes/industries');  // New industries routes
const ExpressError = require("./expressError");

app.use(express.json());  // Middleware to parse JSON
app.use('/companies', companiesRoutes);
app.use('/invoices', invoicesRoutes);
app.use('/industries', industriesRoutes);  // Add the industries routes

/** 404 handler */
app.use(function(req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

/** general error handler */
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  return res.json({
    error: err,
    message: err.message
  });
});

module.exports = app;

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
