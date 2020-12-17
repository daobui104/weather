import React, { Component } from "react";
import "./styles.css";

class About extends Component {
  state = {
    city: "",
    description: "",
    tempMin: 0,
    tempMax: 0,
    zipcode: 0
  };

  handleChange = (event) => {
    this.setState({ zipcode: event.target.value });
    //console.log("Your zip code is" + this.state.zipcode);
  };

  handleSubmit = (event) => {
    console.log("Your zip code: " + this.state.zipcode);
    event.preventDefault();

    let url =
      "https://api.openweathermap.org/data/2.5/weather?zip=" +
      this.state.zipcode +
      ",us&appid=052f26926ae9784c2d677ca7bc5dec98";
    console.log(url);

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((weo) => {
        console.log(weo);
        this.setState({
          city: weo.name,
          description: weo.weather[0].description,
          tempMin: weo.main.temp_min,
          tempMax: weo.main.temp_max
        });
      })
      .catch((ex) => {
        console.log(ex);
      });
  };

  convert = (kelvin) => {
    return (((kelvin - 273.15) * 9) / 5 + 32).toFixed(1);
  };

  render() {
    let output =
      this.state.city +
      ": currently " +
      this.state.description +
      " with a high of " +
      this.convert(this.state.tempMax) +
      " degrees and a low of " +
      this.convert(this.state.tempMin) +
      " degrees";
    if (this.state.city === "") output = "";
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>{output}</p>
          <label>
            Please enter your zip code for the weather:
            <input type="text" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Get my forecast!" />
        </form>
      </div>
    );
  }
}

export default About;
