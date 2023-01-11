/* eslint-disable solid/no-innerhtml */
import type { Component } from "solid-js"
import { For, Show } from "solid-js"
import { Link, useParams } from "solid-start"
import { SITE_URL } from "~/config"
import { trpc } from "~/utils/trpc"
import "~/styles/page.css"
import { Loading } from "~/component/Loading"
import { LoadingFull } from "~/component/LoadingFull"

const PublicPage: Component = () => {
	const pageId = parseInt(useParams().id)
	const page = trpc.page.view.useQuery(() => pageId)

	return (
		<>
			<Show
				when={page.isLoading}
				fallback={
					<>
						<article>
							<h1 id="article-title">{page.data?.title}</h1>
							<span>
								This article is published on{" "}
								<a href={SITE_URL}>Markzone</a>
							</span>
							<br />
							<span>Published on {page.data?.createdAt}</span>
							<Show
								when={
									page.data?.createdAt ===
									page.data?.updatedAt
								}
								fallback={
									<>
										<br />
										<span>
											Updated on {page.data?.updatedAt}
										</span>
									</>
								}
							>
								<></>
							</Show>
							<div innerHTML={page.data?.content} />
						</article>
						<Show when={page.data?.theme}>
							<For each={page.data?.theme.css.files}>
								{(css) => <Link href={css} rel="stylesheet" />}
							</For>
						</Show>
					</>
				}
			>
                <LoadingFull />
			</Show>
		</>
	)
}

export default PublicPage
