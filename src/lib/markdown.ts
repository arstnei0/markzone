import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import remarkGfm from "remark-gfm"
import remarkToc from "remark-toc"
import * as shiki from "shiki"
import withShiki from '@stefanprobst/rehype-shiki'

const highlighter = await shiki.getHighlighter({ theme: "dracula" })

export async function transformMarkdown(content: string): Promise<string> {
	const transformer = await unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkToc)
		.use(remarkRehype)
		.use(rehypeStringify)
		.use(withShiki, { highlighter })
		.process(content)

	return String(transformer)
}
