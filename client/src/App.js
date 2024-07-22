import './App.css';
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<div className='navbar'>
					<Link to='/'> Home Page</Link>
					<Link to='/createpost'> Create A Post</Link>
					<Link to='/login'> Login</Link>
					<Link to='/register'> Register</Link>
				</div>
				<Routes>
					<Route path='/' Component={Home}></Route>
					<Route path='/createpost' Component={CreatePost}></Route>
					<Route path='/ById/:id' Component={Post}></Route>
					<Route path='/login' Component={Login}></Route>
					<Route path='/register' Component={Register}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
