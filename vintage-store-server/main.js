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
  });

  
});

app.patch('/api/product/:id', async (req, res) => {
  console.log(req.body);
  await okOrError(res, async () => {
    await schemas.Product.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
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

// New function: Searching user by email (copiado da função anterior, substituindo id por email)
// app.patch('/api/user/:email', async (req, res) => {
//   console.log(req.body);
//   await okOrError(res, async () => {
//     await schemas.User.findOneAndUpdate(
//       { email: req.params.email },
//       req.body
//     );
//     return { user: req.body };
//   })
// });

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

// New function: Searching user by email (copiado da função anterior, substituindo id por email)
// app.patch('/api/user/:email', async (req, res) => {
//   console.log("entramos no app.patch")
//   console.log(req.body);
//   await okOrError(res, async () => {
//     await schemas.User.findOneAndUpdate(
//       { email: req.params.email},
//       {$set: {
//         email: req.params.email
//       }}
//     );
//   })
// });

/*
// TODO: Implement server side

async function fetchUsers() {
  return { ok: true, users: internalGetUsers() };
}

async function fetchUser(uid) {
  const users = internalGetUsers();
  const idx = users.findIndex(u => u.id === uid);
  if (idx < 0) return { ok: false, error: "user not found" };
  return { ok: true, user: users[idx] };
}

async function updateUser(update) {
  if (!["valid", "partial"].includes(isValidUser(update)))
    return { ok: false, error: "invalid user object format" };

  const users = internalGetUsers();
  const idx = users.findIndex(u => u.id === update.id);
  if (idx < 0) return { ok: false, error: "user not found" };
  // Update only the fields that have changed, the res remain the same.
  users[idx] = { ...users[idx], ...update };
  internalSetUsers(users);
  return { ok: true, user: users[idx] };
}

async function login({ email, password }) {
  const users = internalGetUsers();
  const idx = users.findIndex(u => u.email == email);
  if (idx < 0) return { ok: false, error: "user not found" };
  const user = users[idx];
  if (user.password !== password) return { ok: false, error: "wrong password" };
  localStorage.setItem("currentUser", JSON.stringify(user));
  return { ok: true, user: user };
}

async function registerUser(user) {
  if (isValidUser(user) !== "valid")
    return { ok: false, error: "user object is not in the correct format" };
  const users = internalGetUsers();
  const idx = users.findIndex(u => u.email === user.email);
  if (idx != -1) return  { ok: false, error: "user already exists" };
  users.push(user)
  localStorage.setItem("currentUser", JSON.stringify(user));
  internalSetUsers(users);
  return { ok: true, user: user };
}

async function updateCurrentUser(userUpdates) {
  if (!["partial", "valid"].includes(isValidUser(userUpdates)))
    return { ok: false, error: "user updates is not in the correct format" };
  let currentUser = localStorage.getItem("currentUser");
  if (!currentUser) return { ok: false, error: "user not logged in" };
  currentUser = { ...JSON.parse(currentUser), ...userUpdates };
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  return { ok: true, user: currentUser };
}

async function calculateShippingCost(zipCode) {

  // Very simple way of producing a cost that is kind of random and determined
  // by the zip code.
  let hash = 0;
  for (let i = 0; i < zipCode.length; i++) {
    hash += Math.pow(10, i) * zipCode.charCodeAt(i);
    hash += zipCode.charCodeAt(i);
    hash %= 100;
  }
  return hash;
}

function internalSetUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function internalSetProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}

function internalGetUsers() {
  let users = localStorage.getItem("users");
  if (!users) {
    internalSetUsers(HARDCODED_USERS);
    // Make sure it is a clone so that it can be modified at will
    return JSON.parse(JSON.stringify(HARDCODED_USERS));
  }
  return JSON.parse(users);
}

function internalGetProducts() {
  let products = localStorage.getItem("products");
  if (!products) {
    internalSetProducts(HARDCODED_PRODUCTS);
    // Make sure it is a clone so that it can be modified at will
    return JSON.parse(JSON.stringify(HARDCODED_PRODUCTS));
  }
  return JSON.parse(products);
}

// Returns if an object is a valid user object
// * "invalid" - `userObj` is not a valid user object
// * "valid" - `userObj` has exactly all of the required fields of a user with the correct types.
// * "partial" - `userObj` has only some of the required fields of a user.
// * "superset" - `userObj` has all of the required fields plus some other fields.
function isValidUser(userObj) {
  if (typeof userObj !== "object") return "invalid";
  let hasMissingKey = false;
  const keys = new Set(Object.keys(userObj));
  for (const key of Object.keys(USER_PROPERTIES)) {
    if (!keys.has(key)) {
      hasMissingKey = true;
      continue;
    }
    keys.delete(key);
    if (!( (typeof userObj[key] === "string" && USER_PROPERTIES[key] === String)
        || (typeof userObj[key] === "number" && USER_PROPERTIES[key] === Number)
        ||  userObj[key] instanceof USER_PROPERTIES[key])) return "invalid";
  }
  // An object with only some of the expected keys and other unexpected keys, is not
  // valid.
  if (keys.size > 0 && hasMissingKey) return "invalid";
  // Event partial users can't be missing the "id" key.
  if (hasMissingKey && "id" in userObj) return "partial";
  if (keys.size > 0) return "superset";
  return "valid";
}

*/

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
