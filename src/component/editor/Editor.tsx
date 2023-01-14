/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Accessor, Component, Setter } from "solid-js"
import { createEffect } from "solid-js"
import { isServer } from "solid-js/web"

declare global {
	const tinymce: any
}

declare module "solid-js" {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace JSX {
		interface IntrinsicElements {
			"tinymce-editor": any
		}
	}
}

export const Editor: Component<{
	content: Accessor<string>
	setContent: Setter<string>
}> = (props) => {
	import(
		"https://cdn.jsdelivr.net/npm/@tinymce/tinymce-webcomponent@2/dist/tinymce-webcomponent.min.js" as any
	)

	let editorEl: any

	if (!isServer) {
        const g = globalThis as any
		g.editorChange = () => {
			props.setContent(editorEl.value)
		}

		createEffect(() => {
			console.log(props.content())
		})
	}

	return (
		<>
			<tinymce-editor
				api-key="q86rtqvf66rv2fg8ps1lvquvq31ke10zjnqqiz3y4wlwmovj"
				height="70vh"
				on-Input="editorChange"
				menubar="edit format insert table"
				toolbar="undo redo | styles | bold italic | link image code searchreplace | alignleft aligncenter alignright alignjustify | fullscreen"
				plugins="autoresize fullscreen table image link code searchreplace"
				ref={editorEl}
			>
				{props.content()}
			</tinymce-editor>
		</>
	)
}
