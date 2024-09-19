import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

/** Home component showing the number of snacks and drinks */
function Home({ snacks, drinks }) {
  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
            <h3 className="font-weight-bold">
              Welcome to Silicon Valley's premier dive cafe!
            </h3>
          </CardTitle>
          <CardText>
            We currently have {snacks.length} snacks and {drinks.length} drinks available.
          </CardText>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;
