import React, { Component } from "react";

  import "../App.css";
  import 'bootstrap/dist/css/bootstrap.min.css';
  import Content from "./Content.js";
 


  class App extends Component {
	  render() {
		return (

		  <div className="App">
            <Content/>
     
         </div>

		);
	  }
	}
	export default App;