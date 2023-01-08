import { Component, Show } from "solid-js"
import { trpc } from "~/utils/trpc"

export const Pages: Component = () => {
	const pages = trpc.page.all.useQuery()

	return (
		<>
			<Show
				when={pages.isLoading}
				fallback={pages.data?.map((page) => (
					<>
						<p>{page.title}</p>
						<p>{page.id}</p>
					</>
				))}
			>
				<></>
			</Show>
		</>
	)
}
