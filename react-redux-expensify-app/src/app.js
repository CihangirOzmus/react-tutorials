import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
// import 'normalize.css/normalize.css'
import './styles/style.scss'
import AppRouter from "./routers/AppRouter";

ReactDOM.render(<AppRouter/>, document.getElementById('app'));