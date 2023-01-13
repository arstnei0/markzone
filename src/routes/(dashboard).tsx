import type { Component } from "solid-js"
import { Outlet } from "solid-start"
import "~/styles/global.css"

const DashboardWrapper: Component = () => {
	return (
		<div class="dashboard">
            <a href="/dashboard"><h1>Dashboard</h1></a>
			<Outlet />
		</div>
	)
}

export default DashboardWrapper
