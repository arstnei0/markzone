import Keyv from "keyv"
import { KeyvFile } from "keyv-file"
import { tmpdir } from "os"

export const transformedStore = new Keyv({
	ttl: 300000,
	store: new KeyvFile({
		filename: `./transformed.tmp.json`,
	}),
})
