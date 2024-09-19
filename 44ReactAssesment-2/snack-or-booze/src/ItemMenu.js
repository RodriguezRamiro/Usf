import React from "react";
import { Link } from "react-router-dom";
import "./ItemMenu.css";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem
} from "reactstrap";

/** Generic ItemMenu component for displaying food or drinks */
function ItemMenu({ items, type }) {
  return (
    <section className="col-md-4">
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {type} Menu
          </CardTitle>
          <CardText>
            A list of available {type.toLowerCase()} at our cafe.
          </CardText>
          <ListGroup>
            {items.map(item => (
              <Link to={`/${type.toLowerCase()}/${item.id}`} key={item.id}>
                <ListGroupItem>{item.name}</ListGroupItem>
              </Link>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
    </section>
  );
}

export default ItemMenu;
