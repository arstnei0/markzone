import {Theme, type ThemeI} from './theme'

export function defineTheme(theme: ThemeI): Theme {
	return Theme.parse(theme)
}
