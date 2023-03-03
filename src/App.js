
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Home, Login, Public } from "./container/public";
import path from "./ultis/path";


function App() {
	const { test } = useSelector(state => state.app);
	console.log(test);
	return (
		<div>
			<div>
				<Routes>
					<Route path={path.PUBLIC} element={<Public />} >
						<Route path={path.HOME} element={<Home />} />
						<Route path={path.LOGIN} element={<Login />} />


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
