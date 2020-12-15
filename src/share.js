/*
 * Gets bundled into a lambda that is used to generate shareable images on
 * the fly.
 */
import { makeComposite } from './lib/image-processor'
const path = require('path')

// When this is deployed to AWS, this gets loaded from a layer
import Canvas from 'canvas'

// The lambda entry point
exports.handler = async (event) => {

	// Get the user's choices
	let choices
	try { choices = JSON.parse(event.queryStringParameters.choices) }
	catch (e) { return { statusCode: 400 } }

	// Build the image
	const data = await makeComposite(choices, {
		Canvas,
		assetsDir: path.join(__dirname, 'public/assets'),
	})

	// Return it
	return {
		statusCode: 200,
		body: data,
	}
}
