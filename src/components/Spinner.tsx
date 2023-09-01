import { useIsFetching } from "@tanstack/react-query"
import { RotatingTriangles } from "react-loader-spinner"

const Spinner = () => {
	const isFetching = useIsFetching()

	return isFetching ? (
		<div id="loading-spinner-wrapper" className="spinner-container">
			<RotatingTriangles
				visible={true}
				height="160"
				width="160"
				ariaLabel="rotating-triangels-loading"
				wrapperStyle={{}}
				wrapperClass="rotating-triangels-wrapper"
			/>
		</div>
	) : null
}

export default Spinner


