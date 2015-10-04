var AppDispatcher =require("../dispatchers/app-dispatcher");
var AppConstants = require("../constants/app-constants");
var assign =require('react/lib/Object.assign');
var EventEmiiter =require('events').EventEmitter;

var CHANGE_EVENT='change';

var _catalog=[
    {id:1, title: 'Widget #1', cost: 1},
    {id:2, title: 'Widget #2', cost: 2},
    {id:3, title: 'Widget #3', cost: 3}
    ];

var _cartItems=[];

function _removeItem(index){
	_cartItems[index].inCart = false;
	_cartItems.splice(index,1);
}


function _increaseItem(index){
  _cartItems[index].qty++;
}

function _decreaseItem(index){
  if(_cartItems[index].qty>1){
    _cartItems[index].qty--;
  }
  else {
    _removeItem(index);
  }
}
function _addItem(item){
  if(!item.inCart){
    item['qty'] = 1;
    item['inCart'] = true;
    _cartItems.push(item);
  }
  else {
    _cartItems.forEach(function(cartItem, i){
      if(cartItem.id===item.id){
        _increaseItem(i);
      }
    });
  }
}

function _cartTotal(){
var qty=0,total=0;
_cartItems.forEach(function(cartItem){
	qty+=cartItem.qty;
	total+=cartItem.qty*cartItem.cost;
});
return {'qty':qty,'total':total};
});

}