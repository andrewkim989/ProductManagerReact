import React, { Component } from 'react';
import './App.css';
import "react-router";
import { BrowserRouter, Route, NavLink} from 'react-router-dom';

var products = [];

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className = "App">
          <h1>Pony Product Management</h1>
          <div id = "top">
            <NavLink exact to = "/" activeClassName = "here">Home</NavLink> | 
            <NavLink exact to = "/products" activeClassName = "here">Product List</NavLink> | 
            <NavLink to = "/products/new" activeClassName = "here">Create a Product</NavLink>
          </div>
          <div id = "main">
            <Route exact path = "/" component = {Home} />
            <Route exact path = "/products" component = {Products} />
            <Route path = "/products/new" component = {New} />
            <Route path = "/products/edit/:id" component = {Edit} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <div id = "home">
        <h2><b>Home Page</b></h2><br></br>
        <h3>Welcome to Pony Product Management!</h3>
        <h3>You can view all of the MLP-related products, add a new product,
        edit a product's information, or delete a product on this website! Have fun!</h3>
        <img src = "https://derpicdn.net/img/2018/11/2/1873237/medium.jpeg" alt = "plushies"></img>
      </div>
    )
  }
}

class New extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        name: "",
        price: 0,
        image: "",
        nameError: "",
        priceError: "",
        submit: false
    };
    this.handleName = this.handleName.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleName(event) {
    var name = event.target.value;
    this.setState({name: name});

    if (name.length < 1) {
      this.setState({nameError: "Please enter the product's name", submit: false});
    }
    else if (name.length < 4) {
      this.setState({nameError: "Name should be at least 4 characters long", submit: false});
    }
    else {
      this.setState({nameError: ""});
      if (this.state.price > 0) {
        this.setState({submit: true});
      }
    }
  }

  handlePrice(event) {
    var price = event.target.value;
    this.setState({price: price});

    if (price < 0.01) {
      this.setState({priceError: "Invalid price", submit: false});
    }
    else {
      this.setState({priceError: ""});
      if (this.state.name.length > 0) {
        this.setState({submit: true});
      }
    }
  }

  handleImage(event) {
    var image = event.target.value;
    this.setState({image: image});
  }

  submit(e) {
    e.preventDefault();
    products.push({name: this.state.name, price: this.state.price, image: this.state.image});
    this.setState({name: "", price: 0, image: ""});
    this.props.history.push("/products");
  }

  render() {
    return (
      <div id = "create">
        <h2>Create a new product</h2><br></br>
        <form onSubmit = {this.submit}>
            <div className = "error">{this.state.nameError}</div>
            Name: <input type = "text" name = "name" value = {this.state.name}
            onChange = {this.handleName}></input><br></br><br></br>

            <div className = "error">{this.state.priceError}</div>
            Price: <input type = "number" name = "price" value = {this.state.price}
            onChange = {this.handlePrice}></input><br></br><br></br>

            Image URL: <input type = "text" name = "image" value = {this.state.image}
            onChange = {this.handleImage}></input><br></br><br></br>
            
            <input type = "submit" className = "btn btn-success" value = "Create"
            disabled = {!this.state.submit}></input>
        </form>
      </div>
    )
  }
}

class Edit extends Component {
  constructor(props) {
    super(props);
    var id = this.props.match.params.id - 1;
    this.state = {
        name: products[id].name,
        price: products[id].price,
        image: products[id].image,
        nameError: "",
        priceError: "",
        submit: true
    };
    this.handleName = this.handleName.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleName(event) {
    var name = event.target.value;
    this.setState({name: name});

    if (name.length < 1) {
      this.setState({nameError: "Please enter the product's name", submit: false});
    }
    else if (name.length < 4) {
      this.setState({nameError: "Name should be at least 4 characters long", submit: false});
    }
    else {
      this.setState({nameError: ""});
      if (this.state.price > 0) {
        this.setState({submit: true});
      }
    }
  }

  handlePrice(event) {
    var price = event.target.value;
    this.setState({price: price});

    if (price < 0.01) {
      this.setState({priceError: "Invalid price", submit: false});
    }
    else {
      this.setState({priceError: ""});
      if (this.state.name.length > 0) {
        this.setState({submit: true});
      }
    }
  }

  handleImage(event) {
    var image = event.target.value;
    this.setState({image: image});
  }

  submit(e) {
    e.preventDefault();
    var id = this.props.match.params.id - 1;
    products[id].name = this.state.name;
    products[id].price = this.state.price;
    products[id].image = this.state.image;
    this.setState({name: "", price: 0, image: ""});
    this.props.history.push("/products");
  }

  delete(id) {
    products.splice(id, 1);
    this.props.history.push("/products");
  }

  render() {
    var id = this.props.match.params.id - 1;
    return (
      <div id = "edit">
        <h2>Edit product</h2><br></br>
        <form onSubmit = {this.submit}>
            <div className = "error">{this.state.nameError}</div>
            Name: <input type = "text" name = "name" value = {this.state.name}
            onChange = {this.handleName}></input><br></br><br></br>

            <div className = "error">{this.state.priceError}</div>
            Price: <input type = "number" name = "price" value = {this.state.price}
            onChange = {this.handlePrice} step = "0.01"></input><br></br><br></br>

            Image URL: <input type = "text" name = "image" value = {this.state.image}
            onChange = {this.handleImage}></input><br></br><br></br>
            
            <input type = "submit" className = "btn btn-primary button" value = "Update"
            disabled = {!this.state.submit}></input>
            <button className = "btn btn-dark button" onClick = {() => this.delete(id)}>Delete</button>
        </form>
      </div>
    )
  }
}

class Products extends Component {
  
  delete(e) {
    products.splice(e.target.value, 1);
    this.props.history.push("/products");
  }
  
  render() {
    if (products.length < 1) {
      return (
        <div id = "nope">
          <h2>No Products found</h2>
          <img src = "https://derpicdn.net/img/view/2017/8/28/1522240.png" alt = "shrug"></img>
        </div>
      )
    }
    else {
      var productClasses = products.map((product, i) => {
        return (
          <div className = "singleproduct" key = {i}>
            <img src = {product.image} alt = ""></img>
            <h4>{product.name}</h4>
            <h4>{product.price} bits</h4>
            <NavLink to = {"/products/edit/" + (i + 1)}>
              <button className = "btn btn-primary">Edit</button>
            </NavLink>
            <button className = "btn btn-dark" value = {i} 
            onClick = {(i) => this.delete(i)}>Delete</button>
          </div>
        )
      });
    }

    return (
      <div id = "products">
        <h2>Products List</h2>
        {productClasses}
      </div>
    );
  }
}

export default App;
