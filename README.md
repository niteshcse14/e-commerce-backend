##E-Commerce-Backend
<h6>Used Technologies:</h6>
<li>Nodejs</li>
<li>GraphQL</li>
<li>MongoDB</li>
<li>Keystonejs Framework</li>
<hr>

Reason for choosing mongodb :
<ul>Schemaless</ul>
<ul>Faster process</ul>
<ul>It is document based</ul>
<ul>also No SQL injection</ul>

Reason for choosing mongodb :
<ul>better query efficiency</ul>
<ul>it easy for understanding</ul>
<ul>more stable</ul>


<hr>
<li>if user create a order then noOfItems will be dedect from Items model.</li>
<li>if user delete order then noOfItems will be added in Items model.</li>
<li>out of stock cases also handled in delete, create & update order.</li>
</hr>


run project using
<hr>
<h3>npm start</h3>
<hr>

All API's are in GraphQL.
##Query
firstly we will have to login for any query:
login format in query:  
<b>
```json
loginResolver(email: "nitesh.cse14@nituk.ac.in", password: "123456") {
id
name{
	first
	last
	full
}
email
}
```
</b>

logout resolver format: 
<b>
```json
logoutResolver{
  }
```
</b>


##Mutation
signup format in Mutation:  
<b>
```json
signup(name:{
    first: "Nitesh",
    last: "Meena"
  }, email: "nitesh.cse14@nituk.ac.in", password:"123456") {
    id
  }
```
  </b>


get all ordered by 'email id' or 'email id and item id'
 <b>
 ```json
ordersList(email:"nitesh.cse14@nituk.ac.in") {
    id
    itemName
    noOfItems
  }
```
  </b>


createOrder format:
<b>
```json
createOrder(item:"5c8a3ce9a11a4e27362d6329", noOfItems:20, email:"ajay@gmail.com"){
  id
  itemName
  noOfItems
}
```
</b>

updateOrder format:
<b>
```json
updateOrder(item:"savedItem _id", noOfItems: ?, email:"registered user email id"){
  id
  itemName
  noOfItems
}
```
</b>

deleteOrder format:
<b>
```json
deleteOrder(item:"savedItem _id", email:"registered user email id"){
  id
  itemName
  noOfItems
}
```
</b>
