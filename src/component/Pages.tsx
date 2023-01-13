import type { Component } from "solid-js"
import { For } from "solid-js"
import { Show } from "solid-js"
import { trpc } from "~/utils/trpc"
import "./Pages.css"
import { getPageLink } from "~/lib/page"
import { List, ListItem } from "./ui/List"
import { Button } from "./ui/Button"

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
								<ListItem>
									<div class="page-item">
										<a href={getPageLink(page.id)}>
											<div class="page-title">
												{page.title}
											</div>
										</a>
										<div class="page-actions">
											<Button round variant="text">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="1em"
													height="1em"
													viewBox="0 0 24 24"
												>
													<path
														fill="currentColor"
														d="M12 17q.425 0 .713-.288Q13 16.425 13 16v-4.025q0-.425-.287-.7Q12.425 11 12 11t-.712.287Q11 11.575 11 12v4.025q0 .425.288.7q.287.275.712.275Zm0-8q.425 0 .713-.288Q13 8.425 13 8t-.287-.713Q12.425 7 12 7t-.712.287Q11 7.575 11 8t.288.712Q11.575 9 12 9Zm0 13q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Z"
													></path>
												</svg>
											</Button>
											<Button round variant="text">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="1em"
													height="1em"
													viewBox="0 0 24 24"
												>
													<path
														fill="currentColor"
														d="M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75l1.83-1.83z"
													></path>
												</svg>
											</Button>
										</div>
									</div>
								</ListItem>
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
