import { useNavigate, useParams } from "solid-start"
import { getPageLink } from "~/lib/page"
import { withDash } from "~/utils/dash"
import "~/styles/success.css"
import { Button } from "~/component/ui/Button"

export const [routeData, SuccessPage] = withDash(() => {
	const params = useParams()
	const shareLink = getPageLink(parseInt(params.id))

	return (
		<>
			<div>
				<h1>Page created successfully!</h1>
				<p>Share with others with this link: </p>
				<div class="share-link">
					<a href={shareLink}>{shareLink}</a>
				</div>
				<br />
				<Button
					variant="outlined"
					onPress={() => {
						navigator.clipboard.writeText(shareLink)
					}}
				>
					Copy link
				</Button>
				<Button
					variant="contained"
					onPress={() => {
						window.location.href = shareLink
					}}
				>
					Go to the page
				</Button>
			</div>
		</>
	)
})

export default SuccessPage
