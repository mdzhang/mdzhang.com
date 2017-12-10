import React, { Component } from "react";
import Card from "react-md/lib/Cards/Card";
import CardTitle from "react-md/lib/Cards/CardTitle";
import CardText from "react-md/lib/Cards/CardText";

class EmptyPostPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: true
    };
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    if (window.innerWidth >= 640) {
      this.setState({ mobile: false });
    } else {
      this.setState({ mobile: true });
    }
  }
  render() {
    const { mobile } = this.state;
    const expand = mobile;
    return (
      <Card raise className="md-grid md-cell md-cell--12">
        <CardTitle
          expander={expand}
          title="Stay tuned!"
        />

        <CardText expandable={expand}>
          This site, along with any future blog posts, is still under construction
        </CardText>
      </Card>
    );
  }
}

export default EmptyPostPreview;
