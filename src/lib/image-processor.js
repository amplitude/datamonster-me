/*
 * Functionality that composites decoration choices into a single image
 */

import { categories, decorations } from './asset-config'
import mergeImages from 'merge-images';

// Take the user's choices and make the image. Supports the Canvas and Image
// instances to be passed in when used from Node as part of the share lambda.
export function makeComposite(choices, { Canvas, Image } = {}) {

	// Build a list of the paths to all selected images
	const decorationImages = choices
	.reduce((images, selections, categoryIndex) => {
		selections.forEach(selectionIndex => {
			const categoryName = categories[categoryIndex];
			const decorationName = decorations[categoryName].flat()[selectionIndex]
			images.push(`assets/${categoryName}/${decorationName}.png`)
		})
		return images
	}, [])

	// Append the choices to the base image
	const images = ['assets/base_datamonster_tail_left.png']
		.concat(decorationImages)

	// Returns a promise
	return mergeImages(images, { Canvas, Image })
}
