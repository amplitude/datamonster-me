/*
 * Gets bundled into a lambda that is used to generate shareable images on
 * the fly.
 */
import { decorations } from './lib/asset_config'

// The lambda entry point
exports.handler = async (event) => {
	return {
		statusCode: 200,
		body: 'Hey',
	}
}
