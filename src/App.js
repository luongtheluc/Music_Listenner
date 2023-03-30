
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home, Login, Personal, Public, Album } from "./container/public";
import path from "./ultis/path";
import { useEffect } from "react";
import * as actions from './store/actions'




function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(actions.getHome())
	}, [])
	return (
		<div>
			<div>
				<Routes>
					<Route path={path.PUBLIC} element={<Public />} >
						<Route path={path.HOME} element={<Home />} />
						<Route path={path.LOGIN} element={<Login />} />
						<Route path={path.MYMUSIC} element={<Personal />} />
						<Route path={path.ALBUM__TITLE__PID} element={<Album />} />
						<Route path={path.PLAYLIST__TITLE__PID} element={<Album />} />


						<Route path={path.STAR} element={<Home />} />
					</Route>
				</Routes>
			</div>
			<div>
				<ToastContainer
					position="top-right"
					autoClose={1000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					draggable
					pauseOnHover
					theme="colored"
				/>
			</div>
		</div>

	);
}

export default App;
