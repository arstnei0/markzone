// @refresh reload
import { Suspense } from "solid-js"
import {
	Body,
	ErrorBoundary,
	FileRoutes,
	Head,
	Html,
	Meta,
	Routes,
	Scripts,
	Title,
} from "solid-start"
import { Error } from "~/component/logic/Error"
import './styles/root.css'

export default function Root() {
	return (
		<Html lang="en">
			<Head>
				<Title>MarkZone</Title>
				<Meta charset="utf-8" />
				<Meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
                <script>{`
let mem = localStorage.getItem('m');
if (!mem) { localStorage.setItem('m', 'l'); mem = 'l'; };
globalThis.gtheme = mem;
if (gtheme === "l") {
	document.documentElement.classList.add("l");
} else {
	document.documentElement.classList.add("d");
}
                    `}
                </script>
			</Head>
			<Body>
				<Suspense>
                    <ErrorBoundary fallback={() => <Error />}>
						<Routes>
							<FileRoutes />
						</Routes>
					</ErrorBoundary>
				</Suspense>
				<Scripts />
			</Body>
		</Html>
	)
}
