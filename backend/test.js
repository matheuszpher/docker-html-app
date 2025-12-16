const http = require("http");
const assert = require("assert");

function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => resolve({ statusCode: res.statusCode, body }));
    });
    req.on("error", reject);
    if (data) req.write(data);
    req.end();
  });
}

(async () => {
  console.log("Running tests...");
  try {
    // Teste 1: GET /
    const responseRoot = await makeRequest({
      hostname: "localhost",
      port: 3000,
      path: "/",
      method: "GET",
    });
    assert.strictEqual(responseRoot.statusCode, 200);
    assert.strictEqual(responseRoot.body, "Welcome to the Node.js API!");
    console.log("✔ Test 1: GET / passed");

    // Teste 2: POST /items
    const newItem = JSON.stringify({ name: "Test Item" });
    const responsePost = await makeRequest(
      {
        hostname: "localhost",
        port: 3000,
        path: "/items",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(newItem),
        },
      },
      newItem
    );

    assert.strictEqual(responsePost.statusCode, 201);
    const responseBodyPost = JSON.parse(responsePost.body);
    assert.strictEqual(responseBodyPost.message, "Item added successfully!");
    assert.strictEqual(responseBodyPost.item.name, "Test Item");
    console.log("✔ Test 2: POST /items passed");

    // Teste 3: GET /items
    const responseGetItems = await makeRequest({
      hostname: "localhost",
      port: 3000,
      path: "/items",
      method: "GET",
    });

    assert.strictEqual(responseGetItems.statusCode, 200);
    const items = JSON.parse(responseGetItems.body);
    assert.ok(Array.isArray(items));
    assert.ok(items.length > 0);
    console.log("✔ Test 3: GET /items passed");
  } catch (err) {
    console.error("Test failed:", err.message);
    process.exit(1);
  }

  console.log("All tests passed successfully!");
  process.exit(0);
})();
