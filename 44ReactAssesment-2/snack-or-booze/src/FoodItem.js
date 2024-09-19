import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { snacks, drinks } from "./data/items";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import ItemMenu from "./components/ItemMenu";
import FoodItem from "./components/FoodItem";
import AddItemForm from "./components/AddItemForm";
import NotFound from "./pages/NotFound";        

function App() {
  // Function to add new items (snacks/drinks)
  const addItem = (newItem, type) => {
    if (type === "snacks") {
      snacks.push({ ...newItem, id: snacks.length + 1 });
    } else if (type === "drinks") {
      drinks.push({ ...newItem, id: drinks.length + 1 });
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Homepage snacks={snacks} drinks={drinks} />
          </Route>

          <Route exact path="/snacks">
            <ItemMenu items={snacks} type="Snacks" />
          </Route>

          <Route exact path="/drinks">
            <ItemMenu items={drinks} type="Drinks" />
          </Route>

          <Route exact path="/snacks/:id">
            <FoodItem items={snacks} cantFind="/snacks" />
          </Route>

          <Route exact path="/drinks/:id">
            <FoodItem items={drinks} cantFind="/drinks" />
          </Route>

          <Route exact path="/add-item">
            <AddItemForm addItem={addItem} type="snacks" />
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
