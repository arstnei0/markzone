import { Component, For } from "solid-js"
import { Show } from "solid-js"
import { trpc } from "~/utils/trpc"
import { Shadow } from "./ui/Shadow"
import "./Pages.css"
import { getPageLink } from "~/lib/page"
import { List, ListItem } from "./ui/List"

export const Pages: Component = () => {
	const pages = trpc.page.all.useQuery()

	return (
		<div id="page-list">
			<Show
				when={pages.isLoading}
				fallback={
					<List>
						<For each={pages.data}>
							{(page) => (
								<a href={getPageLink(page.id)}>
									<ListItem>{page.title}</ListItem>
								</a>
							)}
						</For>
					</List>
				}
			>
				<></>
			</Show>
		</div>
	)
}
