import { useParams } from "solid-start"
import { withDash } from "~/utils/dash"

export const [routeData, SuccessPage] = withDash(() => {
	const params = useParams()
	const shareLink = `/page/${params.id}`

	return (
		<>
			<h1>Page created successfully!</h1>
			<p>
				Share with others with this link:{" "}
				<a href={shareLink}>{shareLink}</a>
			</p>
		</>
	)
})

export default SuccessPage
