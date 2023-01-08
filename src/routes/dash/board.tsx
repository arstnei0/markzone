import type { Component } from "solid-js"
import { Dashboard } from "~/component/Dashboard"
import { protectedRoute } from "~/utils/session"

export const [routeData, DashboardPage] = protectedRoute((props) => {
    console.log('run')
	return (
		<>
			<Dashboard user={props.session.user} />
		</>
	)
})

export default DashboardPage
