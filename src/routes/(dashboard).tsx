import { Component } from "solid-js";
import { Outlet } from "solid-start";
import '~/styles/global.css'

const DashboardWrapper: Component = () => {
    return <Outlet />
}

export default DashboardWrapper
