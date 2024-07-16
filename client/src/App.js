import './App.css';
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<div className='navbar'>
					<Link to='/'> Home Page</Link>
					<Link to='/createpost'> Create A Post</Link>
				</div>
				<Routes>
					<Route path='/' Component={Home}></Route>
					<Route path='/createpost' Component={CreatePost}></Route>
					<Route path='/ById/:id' Component={Post}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
