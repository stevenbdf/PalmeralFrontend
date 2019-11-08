import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from './utils/protectedRoute'
import Login from './containers/Login'
import Dashboard from './containers/Dashboard'
import Users from './containers/Users'
import Suppliers from './containers/Suppliers'
import Categories from './containers/Categories'
import Products from './containers/Products'
import Inventory from './containers/Inventory'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/users" component={Users} />
          <ProtectedRoute exact path="/suppliers" component={Suppliers} />
          <ProtectedRoute exact path="/categories" component={Categories} />
          <ProtectedRoute exact path="/products" component={Products} />}
          <ProtectedRoute exact path="/inventory" component={Inventory} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;
