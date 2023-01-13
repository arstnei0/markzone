import Keyv from "keyv"
import { KeyvFile } from "keyv-file"

export const contentStore = new Keyv({
	ttl: 300000,
	store: new KeyvFile({
		filename: `./transformed.tmp.json`,
	}),
})
