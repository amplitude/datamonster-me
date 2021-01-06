import React, { Component } from 'react'
import copyToClipboard from 'copy-to-clipboard'

// The hostname of the image sharing lambda
const ENDPOINT = 'https://rrcxoiokh1.execute-api.us-west-2.amazonaws.com/'

class Share extends Component {

	constructor(props) {
		super(props)

		this.state = {
			open: false,
			copied: false,
		}

		this.containerRef = React.createRef()

		this.makeShareUrl = this.makeShareUrl.bind(this)
		this.copy = this.copy.bind(this)
		this.open = this.open.bind(this)
		this.close = this.close.bind(this)
		this.onClickOutside = this.onClickOutside.bind(this)
	}

	open() {
		this.setState({ open: true })
		document.addEventListener('mousedown', this.onClickOutside)
	}

	close() {
		this.setState({ open: false })
		document.removeEventListener('mousedown', this.onClickOutside)
	}

	copy() {
		copyToClipboard(this.makeShareUrl())
		this.setState({ copied: true })
		clearTimeout(this.copyDelay)
		this.copyDelay = setTimeout(() => {
			this.setState({ copied: false })
		}, 1000)
	}

	onClickOutside(event) {
		if (this.containerRef &&
			!this.containerRef.current.contains(event.target)) {
			this.close()
		}
	}

	makeShareUrl() {
		const params = encodeURIComponent(JSON.stringify(this.props.choices))
		return `${ENDPOINT}?choices=${params}`
	}

	render() {
		const { state, makeShareUrl } = this
		return (
			<span className='share-container' ref={this.containerRef}>

				{/* The normal link */}
				<a className='finish' onClick={this.open}><p>SHARE</p></a>

				{/* The tooltip */}
				{state.open && (<span className='share-tooltip'>
					<input value={makeShareUrl()} readOnly/>
					<button onClick={this.copy}>
						{ state.copied ? 'Copied' : 'Copy' }
					</button>
				</span>)}

			</span>

		)
	}

}

export default Share
