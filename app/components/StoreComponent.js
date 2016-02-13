var React = require('react');
var jsondata = require('json!../../public/data.json');
var MerchItem = require ('./MerchItem');
import { Link } from 'react-router';
var classNames = require('classnames');

var paypal_style = {height: "2em"};
var shopping_style = {height: "1.25em", marginRight:".5em"}

const defaultType="Shirt";

const links = {
  'Shirts': '/store/:Shirt',
  'Vinyl': '/store/:Vinyl',
  'CDs': '/store/:CD',
  'Patches': '/store/:Patch'
};

var StoreComponent = React.createClass({
  getInitialState: function (){
    return {
      items : {}
    }
  },

  addToCartFN: function(e) {
    console.log(e);
  },

  render: function(){
    var type;
    if (this.props.params.type === undefined)
    {
      type = defaultType;
    }
    else {
      type = this.props.params.type.replace(":","");
    }

    //console.log("type:",type);

    var filteredItems = jsondata.filter((item)=>{
      return item.info_type === type;
    });



    return(

      <article>

      <header>
              <h1>Beatles Store</h1>

      </header>

      <div className="merchoptionsnew test">
        <div>
          {
            Object.keys(links).map(link => {
              var classes = classNames("merchlink", "blacklink",{"current" : this.props.location.pathname===links[link]});
              return(
              <Link key={link} className={classes} to={links[link]}>{ link }</Link>
            );
            })
          }
        </div>
      </div>

      <h2> <Link to="/cart/" className="greenlink">
        <img src="../images/shoppingcart.png" style={shopping_style} vertical-align="middle" />

        Cart: <span className="cartHeader">(<span className="simpleCart_quantity"></span> items)</span>
        </Link>
        <img src="../images/paypal-whitestroke.png" style={paypal_style} vertical-align="middle" />
      </h2>

      <div className="merchandise pre-scrollable">
      {
        filteredItems.map( merchitem => {
          return (
            <MerchItem key={merchitem.id} item={merchitem} selectedOption={""} callbackParent={this.addToCartFN} />
          );
        })

      }
      </div>


      </article>

    )
  }
})

module.exports = StoreComponent;
