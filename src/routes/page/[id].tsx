/* eslint-disable solid/no-innerhtml */
import type { Component } from "solid-js"
import { For, Show } from "solid-js"
import { Link, useParams } from "solid-start"
import { SITE_URL } from "~/config"
import { themes } from "~/theme/themes"
import { trpc } from "~/utils/trpc"
import '~/styles/page.css'

const PublicPage: Component = () => {
	const pageId = parseInt(useParams().id)
	const page = trpc.page.public.useQuery(() => pageId)

	return (
		<>
			<Show
				when={page.isLoading}
				fallback={
					<>
						<article>
							<h1 id="article-title">{page.data?.title}</h1>
                            <span>This article is published with <a href={SITE_URL}>Markzone</a></span>
							<div innerHTML={page.data?.transformed} />
						</article>
						<Show when={page.data?.theme}>
							<For
								each={
									Reflect.get(
										themes,
										page.data?.theme || "default"
									).css.files
								}
							>
								{(css) => <Link href={css} rel="stylesheet" />}
							</For>
						</Show>
					</>
				}
			>
				<p>Page Loading...</p>
			</Show>
		</>
	)
}

export default PublicPage
