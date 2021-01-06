/*
 * Functionality that composites decoration choices into a single image
 */

import { categories, decorations } from './asset-config'

// Had to use this v2 fork to get compatibility with node-canvas 2 which is
// what is used on the lambda
import mergeImages from 'merge-images-v2';

// Take the user's choices and make the image. Supports the Canvas instance to
// be passed in when used from Node as part of the share lambda.
export function makeComposite(choices, {
	Canvas,
	assetsDir = 'assets',
 } = {}) {

	// Build a list of the paths to all selected images
	const decorationImages = choices
	.reduce((images, selections, categoryIndex) => {
		selections.forEach(selectionIndex => {
			const categoryName = categories[categoryIndex];
			const decorationName = decorations[categoryName].flat()[selectionIndex]
			images.push(`${assetsDir}/${categoryName}/${decorationName}.png`)
		})
		return images
	}, [])

	// Append the choices to the base image
	const images = [`${assetsDir}/poses/DatamonsterBase1_Hero Artboard1x.png`]
		.concat(decorationImages)

	// Returns a promise
	return mergeImages(images, {
		Canvas,

		// Specify dimensions explicitly because it has trouble detecting SVG size
		width: 936,
		height: 880,
	})
}
