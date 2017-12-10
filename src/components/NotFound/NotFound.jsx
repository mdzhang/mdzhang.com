import React, { Component } from "react";
import Card from "react-md/lib/Cards/Card";
import CardTitle from "react-md/lib/Cards/CardTitle";
import "./NotFound.scss";


class NotFound extends Component {
  render() {
    return (
      <div className="not-found-container md-grid mobile-fix">
        <Card className="md-grid md-cell--8">
          <div className="not-found-wrapper">
            <CardTitle
              title="Oops! There's nothing here"
            />
          </div>
        </Card>
      </div>
    );
  }
}

export default NotFound;
