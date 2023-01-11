import { SITE_URL } from "~/config"

export function getPageLink(pageId: number) {
	return `/page/${pageId}`
}

export function getFullPageLink(pageId: number) {
	return `${SITE_URL}${getPageLink(pageId)}`
}
