const fs = require('fs').promises;
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const schemas = require('./models/schemas');

const app = express();
const port = 8080;

mongoose.connect("mongodb+srv://platnu:J991006309@test.6c4mzyj.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log('connected to mongodb'))
  .catch(e => console.error(e));

app.use(cors());
app.use(bodyParser.json());

// This function encodes a common pattern of server responses. When the function `f` is successful,
// it responds with a status 200 (Ok) and a json with the ok flag set to true. The rest of the
// object returned from `f` is also included in the response. In case the operation fails, the 500
// status (Server Error) is returned with ok set to false and the error message.
async function okOrError(res, f) {
  try {
    const resolved = await f();
    res.status(200).json({ ok: true, ...resolved });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
}

// Some functions will return null instead of giving an exception when something is not found. This
// function simply turns a null object into an exception.
function assertNotNull(obj) {
  if (obj === null) throw new Error("Not found");
  return obj;
}

// Populates the database with some initial hard coded products. This function should never be used
// by the client app. Instead it is supposed to be called once, when the database starts or is
// reset.
app.post('/api/populate_products', async (req, res) => {
  const hardcoded_products = require('./products');
  const promises = [];
  for (const product of hardcoded_products) {
    const p = new schemas.Product(product);

    promises.push(new Promise((resolve, reject) => {
      p.save(err => {
        if (err) reject(err);
        else resolve();
      })
    }));
  }

  try {
    await Promise.all(promises);
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
});

// Get all products in the database.
app.get('/api/products', async (req, res) => {
  await okOrError(res, async () => ({
    products: await schemas.Product.find({})
  }));
});

// Get one specific product from the database by id.
app.get('/api/product/:id', async (req, res) => {
  await okOrError(res, async () => ({
    product: assertNotNull(await schemas.Product.findOne({ _id: req.params.id })),
  }));
});

// Deletes one product from the database.
app.delete('/api/product/:id', async (req, res) => {
  await okOrError(res, async () => {
    await schemas.Product.deleteOne({ _id: req.params.id });
  });
});

// Creates a new product.
app.post('/api/product', async (req, res) => {
  await okOrError(res, async () => {
    const product = new schemas.Product(req.body);
    await product.save();
    return { product }
  });
});

// Updates an existing product.
app.patch('/api/product/:id', async (req, res) => {
  await okOrError(res, async () => {
    const product = await schemas.Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return { product };
  })
});

// Populates the database with some initial hard coded users. This function should never be used by
// the client app. Instead it is supposed to be called once, when the database starts or is reset.
app.post('/api/populate_users', async (req, res) => {
  const hardcoded_users = require('./users');
  const promises = [];
  for (const user of hardcoded_users) {
    const p = new schemas.User(user);

    promises.push(new Promise((resolve, reject) => {
      p.save(err => {
        if (err) reject(err);
        else resolve()
      })
    }));
  }

  try {
    await Promise.all(promises);
    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
});

// Get all users from the database.
app.get('/api/users', async (req, res) => {
  await okOrError(res, async () => ({
    users: await schemas.User.find({})
  }));
});

// Get one specific user from the database by id.
app.get('/api/user/:id', async (req, res) => {
  await okOrError(res, async () => ({
    user: assertNotNull(await schemas.User.findOne({ _id: req.params.id })),
  }));
});

// Deletes a user from the database by id
app.delete('/api/user/:id', async (req, res) => {
  await okOrError(res, async () => {
    await schemas.User.deleteOne({ _id: req.params.id });
  });
});

// Creates a new user
app.post('/api/user', async (req, res) => {
  await okOrError(res, async () => {
    const user = new schemas.User(req.body);
    await user.save();
    return { user };
  });
});

// Updates a user by id.
app.patch('/api/user/:id', async (req, res) => {
  await okOrError(res, async () => {
    const user = await schemas.User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
    return { user };
  })
});

// Finds a user that matches login and password. The `login` and `password` values are passed in
// the query string.
app.get('/api/login', async (req, res) => {
  await okOrError(res, async () => {
    const user = await schemas.User.findOne({ email: req.query.email });
    if (!user) throw new Error("User not found");
    if (user.password != req.query.password) throw new Error("Wrong password");
    return { user };
  });
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
