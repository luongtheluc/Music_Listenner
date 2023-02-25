import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {


	return (

		<div>
			<div>
				app
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
