import { defineTheme } from "../../define"
import css from './theme.css'

export default defineTheme({
	name: "zihan",
	shiki: {
		theme: "dracula",
	},
    css: {
        files: [css]
    }
})
