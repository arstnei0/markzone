import { useParams } from "solid-start"
import { getPageLink } from "~/lib/page"
import { withDash } from "~/utils/dash"
import "~/styles/success.css"
import { Button } from "~/component/ui/Button"
import "~/component/ui/ToggleButton/togglebutton.css"

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
				<div class="toggle-button-group">
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
			</div>
		</>
	)
})

export default SuccessPage
