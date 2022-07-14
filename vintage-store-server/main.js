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


app.post('/api/populate_products', async (req, res) => {
  const hardcoded_products = require('./products');
  const promises = [];
  for (const product of hardcoded_products) {
    const p = new schemas.Product(product);

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

async function okOrError(res, f) {
  try {
    const resolved = await f();
    res.status(200).json({ ok: true, ...resolved });
  } catch (error) {
    res.status(500).json({ ok: false, error: error.message });
  }
}

function assertNotNull(obj) {
  if (obj === null) throw new Error("Not found");
  return obj;
}

app.get('/api/products', async (req, res) => {
  await okOrError(res, async () => ({
    products: await schemas.Product.find({})
  }));
});

app.get('/api/product/:id', async (req, res) => {
  await okOrError(res, async () => ({
    product: assertNotNull(await schemas.Product.findOne({ _id: req.params.id })),
  }));
});

app.delete('/api/product/:id', async (req, res) => {
  await okOrError(res, async () => {
    await schemas.Product.deleteOne({ _id: req.params.id });
  });
});

app.post('/api/product', async (req, res) => {
  await okOrError(res, async () => {
    const product = new schemas.Product(req.body);
    console.log("Product: ");
    console.log(product);

    await product.save();
    return { product }
  });

  
});

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

app.get('/api/users', async (req, res) => {
  await okOrError(res, async () => ({
    users: await schemas.User.find({})
  }));
});

app.get('/api/user/:id', async (req, res) => {
  await okOrError(res, async () => ({
    user: assertNotNull(await schemas.User.findOne({ id: req.params.id })),
  }));
});

app.delete('/api/user/:id', async (req, res) => {
  await okOrError(res, async () => {
    await schemas.User.deleteOne({ id: req.params.id });
  });
});

app.post('/api/user', async (req, res) => {
  await okOrError(res, async () => {
    const user = new schemas.User(req.body);
    await user.save();
  });
});

app.patch('/api/user/:id', async (req, res) => {
  await okOrError(res, async () => {
    const user = await schemas.User.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    return { user };
  })
});

app.get('/api/login', async (req, res) => {
  await okOrError(res, async () => {
    const user = await schemas.User.findOne({ email: req.query.email });
    if (!user) throw new Error("User not found");
    console.log(user);
    console.log(req.query.password)
    if (user.password != req.query.password) throw new Error("Wrong password");
    return { user };
  });
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
