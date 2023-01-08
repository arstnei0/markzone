import { Component, Show } from "solid-js";
import { useParams } from "solid-start";
import { trpc } from "~/utils/trpc";

const PublicPage: Component = () => {
    const pageId = parseInt(useParams().id)
    const page = trpc.page.public.useQuery(() => pageId)

    return <><Show when={page.isLoading} fallback={<>
        <h1>{page.data?.title}</h1>
        <div innerHTML={page.data?.content}></div>
    </>}>

    </Show></>
}

export default PublicPage
