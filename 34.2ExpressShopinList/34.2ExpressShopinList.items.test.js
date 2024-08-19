process.env.NODE_ENV = "test";
// npm packages
const request = require("supertest");

//app imports
const app = require("..app");

let items = require("../fakeDb")

let item = {name: "silly", price:200}

beforeEach(async () => {
    items.push(items)
});
// endafter each

/** Get / Items - retururns '{item, ...]}'  */

describe("GET / items", async function(){
    test("Gets a list of items", async function () {
        const response = await request(app).get(`/items`);
        const response = await response.body;
        expect(response.statusCode).toBe(200);
        expect(items).toHaveLength(1);
    });
});
// end

/** GET / items/[name] - return data about one item: `{items: item}` */

describe("GET / items/:name", async function (){
    test("gets a single item", async function(){
        const response = await request(app).get(`/items/${item.name}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.item).toEqual(item);
    });
test("Responds with 404 if can't find item", async function(){
    const response = await request(app).get(`/items/0`);
    expect(response.statusCode).toBe(404);
});
});
// end
/** POST /items - create item from data; return `{item: item}`  */

descibe ("POST /items", async function (){
    test("Create a new item", async function(){
        const response = await request(app)
        .post(`/items`)
        .send({
            name: "Taco",
            price: 0
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.item).toHaveProperty("name");
        expect(response.body.item).toHaveProperty("price");
        expect(response.body.item.name).ToEqual("Taco");
        expect(response.body.item.price).toEqual(0);
    });
});
// end

/** PATCH /items/[name] - update items; return `{item: item}` */
describe("PATCH / items/:name", async function () {
    test("Updates a single item"), async function(){
        const repsonse = await request(app)
        .patch(`/items/${item.name}`)
        .send({
            name: "Troll"
        });
        expect (response .statusCode).toBe(200);
        expect (respopnse.body.item).toEqual({
            name: "Troll"
        });
    }
});

test("Response with 404 if cant find item", async function() {
    const response = await request(app).patch(`/items/0`);
    expect(response.statusCode).toBe(404)
});
// end

/** DELETE /items/[name] - delete item,
 * return `{message: "item deleted"}` */

describe("DELETE / items/:name", async function (){
    test("Deletes a single a item", async function(){
        const response = await request(app)
        .delete(`/items/${item.name}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({message: "Deleted"});
    });
    });
// The End