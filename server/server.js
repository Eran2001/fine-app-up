const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();
const cron = require("node-cron");
const dayjs = require("dayjs");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const secretKey = process.env.SECRET_KEY;

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Routes
// Register a new user
app.post("/api/register", async (req, res) => {
  let { firstName, lastName, email, licenseID, phone_number } = req.body;

  firstName = firstName.trim();
  lastName = lastName.trim();
  email = email.trim();
  licenseID = licenseID.trim();
  phone_number = phone_number.trim();

  if (!firstName || !lastName || !email || !licenseID || !phone_number) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // License ID validation
  const licensePattern = /^(B\d{7}|\d{9}[VX])$/;
  if (!licensePattern.test(licenseID)) {
    return res.status(400).json({ error: "Invalid License ID format" });
  }

  // Phone number validation
  const phonePattern = /^07\d{8}$/;
  if (!phonePattern.test(phone_number)) {
    return res.status(400).json({ error: "Invalid Sri Lankan phone number" });
  }

  try {
    const checkEmail = "SELECT * FROM citizens WHERE email = $1";
    const emailResult = await pool.query(checkEmail, [email]);

    if (emailResult.rows.length > 0) {
      return res.status(400).json({
        error: "Email already exists",
        message: "The provided email is already registered.",
      });
    }

    const checkLicense = "SELECT * FROM citizens WHERE license_id = $1";
    const licenseResult = await pool.query(checkLicense, [licenseID]);

    if (licenseResult.rows.length > 0) {
      return res.status(400).json({
        error: "License ID already exists",
        message: "The provided license ID is already registered.",
      });
    }

    const query = `
      INSERT INTO citizens (first_name, last_name, email, license_id, phone_number)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;

    const values = [firstName, lastName, email, licenseID, phone_number];

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting user data", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login a user
app.post("/api/login", async (req, res) => {
  const { email, licenseId } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM citizens WHERE email = $1 AND license_id = $2",
      [email, licenseId]
    );
    const user = result.rows[0];
    if (!user) {
      return res.status(400).json({ message: "Invalid email or license ID" });
    }
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get("/api/dashboard", authenticateToken, (req, res) => {
  res.json({ message: "Welcome to the dashboard" });
});

// Admin Login
app.post("/api/adminLogin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM admin_table WHERE email = $1",
      [email]
    );
    const admin = result.rows[0];
    if (!admin || admin.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: admin.id, role: "admin" }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in as admin" });
  }
});

const authenticateAdminToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get("/api/admin-dashboard", authenticateAdminToken, (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard" });
});

//admin-dashboard
//get all fines
app.get("/api/fines", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM all_fines");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// add a new fine
app.post("/api/fines", async (req, res) => {
  const { name, type, fine } = req.body;

  if (!name || !type || !fine) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO all_fines (name, type, fine) VALUES ($1, $2, $3) RETURNING *",
      [name, type, fine]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an existing fine (full update)
app.put("/api/fines/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, type, fine } = req.body;

  try {
    const result = await pool.query(
      "UPDATE all_fines SET name = $1, type = $2, fine = $3 WHERE fine_id = $4 RETURNING *",
      [name, type, fine, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Fine not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating fine:", err);
    res.status(500).json({ error: err.message });
  }
});

// Partially update a fine
app.patch("/api/fines/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const fields = [];
  const values = [];
  let query = "UPDATE all_fines SET ";

  Object.keys(req.body).forEach((key, index) => {
    fields.push(`${key} = $${index + 1}`);
    values.push(req.body[key]);
  });

  if (fields.length === 0) {
    return res.status(400).json({ error: "No fields provided for update" });
  }

  query +=
    fields.join(", ") + ` WHERE fine_id = $${values.length + 1} RETURNING *`;
  values.push(id);

  try {
    console.log("Executing query:", query, values);
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Fine not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating fine:", err);
    res.status(500).json({ error: err.message });
  }
});

// Remove a fine
app.delete("/api/fines/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    const result = await pool.query(
      "DELETE FROM all_fines WHERE fine_id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Fine not found" });
    }

    res.json({ message: "Fine deleted successfully" });
  } catch (err) {
    console.error("Error deleting fine:", err);
    res.status(500).json({ error: err.message });
  }
});

//officer
// Create a new officer
app.post("/api/officers", async (req, res) => {
  const { batch_number, name, email, password, contact } = req.body;

  // const phonePattern = /^07\d{8}$/;
  // if (!phonePattern.test(contact)) {
  //   return res.status(400).json({
  //     error: "Invalid contact number",
  //     message: "Contact number must start with 07 and be 10 digits long.",
  //   });
  // }

  try {
    const result = await pool.query(
      "INSERT INTO officers (batch_number, name, email, password, contact) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [batch_number, name, email, password, contact]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
    k;
  }
});

// Read all officers
app.get("/api/officers", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM officers ORDER BY officer_id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an officer
app.put("/api/officers/:id", async (req, res) => {
  const { id } = req.params;
  const { batch_number, name, email, password, contact } = req.body;
  try {
    const result = await pool.query(
      "UPDATE officers SET batch_number = $1, name = $2, email = $3, password = $4, contact = $5 WHERE officer_id = $6 RETURNING *",
      [batch_number, name, email, password, contact, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an officer
app.delete("/api/officers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM officers WHERE officer_id = $1", [id]);
    res.json({ message: "Officer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//post-office
// Create a new post office
app.post("/api/postoffices", async (req, res) => {
  const { postal_code, post_office_name, email, password, district } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO postoffices (postal_code, post_office_name, email, password, district) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [postal_code, post_office_name, email, password, district]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read all post offices
app.get("/api/postoffices", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM postoffices ORDER BY post_id ASC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a post office
app.put("/api/postoffices/:id", async (req, res) => {
  const { id } = req.params;
  const { postal_code, post_office_name, email, password, district } = req.body;

  try {
    const result = await pool.query(
      "UPDATE postoffices SET postal_code = $1, post_office_name = $2, email = $3, password = $4, district = $5 WHERE post_id = $6 RETURNING *",
      [postal_code, post_office_name, email, password, district, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Post office not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Partially update a post office
app.patch("/postoffices/:id", async (req, res) => {
  const { id } = req.params;
  const fields = Object.keys(req.body);
  const values = Object.values(req.body);

  if (fields.length === 0) {
    return res.status(400).json({ error: "No fields provided for update" });
  }

  const setClause = fields
    .map((field, index) => `${field} = $${index + 1}`)
    .join(", ");

  try {
    const result = await pool.query(
      `UPDATE postoffices SET ${setClause} WHERE post_id = $${
        fields.length + 1
      } RETURNING *`,
      [...values, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Post office not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a post office
app.delete("/api/postoffices/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM postoffices WHERE post_id = $1", [id]);
    res.json({ message: "Post office deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//user-dashboard
// Add a new issue
app.post("/api/issues", async (req, res) => {
  const { issue_name, description } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO issues (issue_name, description) VALUES ($1, $2) RETURNING *",
      [issue_name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all issues
app.get("/api/issues", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM issues ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//officers
// officers login
app.post("/api/officers/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Query database for officer by email
    const result = await pool.query("SELECT * FROM officers WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const officer = result.rows[0];

    // Check plain-text password
    if (officer.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { officer_id: officer.officer_id, email: officer.email },
      secretKey,
      { expiresIn: "1h" }
    );

    res.json({ token, name: officer.name, officer_id: officer.officer_id });
  } catch (error) {
    console.error("Error during officer login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// post office
// post office login
app.post("/api/post-office-login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM postoffices WHERE email = $1 AND password = $2",
      [email, password]
    );
    const postOffice = result.rows[0];
    if (!postOffice) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: postOffice.id }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
});

//officer's fine
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Post fine
app.post("/api/issuefines", async (req, res) => {
  let {
    officerId,
    licenseId,
    fineName,
    fineType,
    fineAmount,
    firstName,
    lastName,
    email,
    phoneNumber,
  } = req.body;

  officerId = officerId.trim();
  licenseId = licenseId.trim();
  fineName = fineName.trim();
  fineType = fineType.trim();
  fineAmount = fineAmount.trim();
  firstName = firstName.trim();
  lastName = lastName.trim();
  email = email.trim();
  phoneNumber = phoneNumber.trim();

  if (
    !officerId ||
    !licenseId ||
    !fineName ||
    !fineType ||
    !fineAmount ||
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // License ID validation
  const licensePattern = /^(B\d{7}|\d{9}[VX])$/;
  if (!licensePattern.test(licenseId)) {
    return res.status(400).json({ error: "Invalid License ID format" });
  }

  // Phone number validation
  const phonePattern = /^07\d{8}$/;
  if (!phonePattern.test(phoneNumber)) {
    return res.status(400).json({ error: "Invalid Sri Lankan phone number" });
  }

  try {
    // Check if citizen exists
    const citizenResult = await pool.query(
      "SELECT * FROM citizens WHERE license_id = $1 OR email = $2",
      [licenseId, email]
    );

    if (citizenResult.rows.length === 0) {
      // If the citizen doesn't exist, insert them
      await pool.query(
        "INSERT INTO citizens (license_id, first_name, last_name, email, phone_number) VALUES ($1, $2, $3, $4, $5)",
        [licenseId, firstName, lastName, email, phoneNumber]
      );
    }

    // Insert the fine into the officerfines table
    await pool.query(
      "INSERT INTO officerfines (officer_id, license_id, fine_name, fine_type, fine_amount) VALUES ($1, $2, $3, $4, $5)",
      [officerId, licenseId, fineName, fineType, fineAmount]
    );

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "New Fine Issued",
      text: `Dear user,

A new fine has been issued to you with the following details:

- officer ID: ${officerId}
- Name: ${fineName}
- Type: ${fineType}
- Amount: Rs.${fineAmount}
- License ID: ${licenseId}

Please address this fine at your earliest convenience.

Visit our website - https://fine-payment-web-react.vercel.app/
(use your email and license ID to log in)

Regards,
Fine.lk`,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({ message: "Fine issued successfully and email sent!" });
  } catch (err) {
    console.error("Error issuing fine:", err);
    res.status(500).json({ error: err.message, details: err });
  }
});

app.get("/api/allofficerfines", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM officerfines");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching all officer fines:", err);
    res.status(500).json({ error: err.message, details: err });
  }
});

app.get("/api/officerfines", async (req, res) => {
  const { licenseId } = req.query;
  if (!licenseId) {
    return res.status(400).json({ error: "License ID is required" });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM officerfines WHERE license_id = $1",
      [licenseId]
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching officer's fines:", err);
    res.status(500).json({ error: err.message, details: err });
  }
});

// delete fines
app.delete("/api/officerfines/:fine_id", async (req, res) => {
  const { fine_id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM officerfines WHERE fine_id = $1",
      [fine_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Fine not found" });
    }

    res.status(200).json({ message: "Fine successfully deleted" });
  } catch (error) {
    console.error("Error deleting fine:", error);
    res.status(500).json({ message: "Error deleting fine" });
  }
});

app.post("/api/contact", async (req, res) => {
  const { fullName, email, message } = req.body;

  if (!fullName || !email || !message) {
    return res.status(400).send("All fields are required");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Message from ${fullName}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending email");
  }
});

// reminder email
cron.schedule("0 0 * * *", async () => {
  console.log("Running scheduled fine check...");

  try {
    // Get fines older than 14 days (warning email)
    const warningFines = await pool.query(
      "SELECT * FROM officerfines WHERE created_at = CURRENT_DATE - INTERVAL '14 days'"
    );

    // Send warning emails
    for (const fine of warningFines.rows) {
      const user = await pool.query(
        "SELECT * FROM citizens WHERE license_id = $1",
        [fine.license_id]
      );

      if (user.rows.length > 0) {
        const email = user.rows[0].email;

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Fine Payment Reminder",
          text: `Dear ${user.rows[0].first_name},

This is a reminder that your fine (ID: ${fine.id}) issued on ${dayjs(
            fine.created_at
          ).format("YYYY-MM-DD")} is due in 7 days.

Fine Details:
- Type: ${fine.fine_type}
- Amount: Rs.${fine.fine_amount}

Please pay before the due date to avoid legal action.

Visit our website: https://fine-payment-web-react.vercel.app/

Regards,
Fine.lk`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Warning email sent to ${email}`);
      }
    }

    // Get fines older than 22 days (court email)
    const courtFines = await pool.query(
      "SELECT * FROM officerfines WHERE created_at = CURRENT_DATE - INTERVAL '22 days'"
    );

    // Send court notice emails
    for (const fine of courtFines.rows) {
      const user = await pool.query(
        "SELECT * FROM citizens WHERE license_id = $1",
        [fine.license_id]
      );

      if (user.rows.length > 0) {
        const email = user.rows[0].email;

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Court Summons - Unpaid Fine",
          text: `Dear ${user.rows[0].first_name},

You have failed to pay your fine (ID: ${fine.id}) issued on ${dayjs(
            fine.created_at
          ).format("YYYY-MM-DD")}. 

You are now required to appear in court on ${dayjs()
            .add(7, "days")
            .format(
              "YYYY-MM-DD"
            )}. Failure to appear may result in further legal action.

Fine Details:
- Type: ${fine.fine_type}
- Amount: Rs.${fine.fine_amount}

Please contact us if you need assistance.

Regards,
Fine.lk`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Court notice email sent to ${email}`);
      }
    }
  } catch (err) {
    console.error("Error sending scheduled emails:", err);
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
