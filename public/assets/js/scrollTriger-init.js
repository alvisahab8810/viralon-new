/* ===================================================================
    ScrollTriger Animation Init
* ================================================================= */
(function($) {
	"use strict";

	$(document).ready(function() {


		/* ==================================================
		    Start GSAP ScrollTiger Animation JS
		================================================== */
		gsap.registerPlugin(ScrollTrigger)

		const Scroll = new function() {
			let sections
			let page
			let main
			let scrollTrigger
			let tl
			let win

			// Init
			this.init = () => {
				sections = document.querySelectorAll('section')
				page = document.querySelector('#page')
				main = document.querySelector('.parallax-items')
				win = {
					w: window.innerWidth,
					h: window.innerHeight
				}

				this.setupTimeline()
				this.setupScrollTrigger()
				window.addEventListener('resize', this.onResize)
			}

			// Setup ScrollTrigger
			this.setupScrollTrigger = () => {
				page.style.height = (this.getTotalScroll() + win.h) + 'px'

				scrollTrigger = ScrollTrigger.create({
					id: 'mainScroll',
					trigger: '.parallax-items',
					animation: tl,
					pin: true,
					scrub: true,
					snap: {
						snapTo: (value) => {

							let labels = Object.values(tl.labels)

							const snapPoints = labels.map(x => x / tl.totalDuration());
							const proximity = 0.1

							console.log(tl.labels, tl.totalDuration(), labels, snapPoints)

							for (let i = 0; i < snapPoints.length; i++) {
								if (value > snapPoints[i] - proximity && value < snapPoints[i] + proximity) {
									return snapPoints[i]
								}
							}
						},
						duration: {
							min: 0.2,
							max: 0.6
						},
					},
					start: 'top top',
					end: '+=' + this.getTotalScroll(),
				})
			}

			// Setup timeline
			this.setupTimeline = () => {
				tl = gsap.timeline()
				tl.addLabel("label-initial")

				sections.forEach((section, index) => {
					const nextSection = sections[index + 1]
					if (!nextSection) return

					tl.to(nextSection, {
							y: -1 * nextSection.offsetHeight,
							duration: nextSection.offsetHeight,
							ease: 'linear',
						})
						.addLabel(`label${index}`)
				})
			}

			// On resize
			this.onResize = () => {
				win = {
					w: window.innerWidth,
					h: window.innerHeight
				}

				this.reset()
			}

			// Reset
			this.reset = () => {
				if (typeof ScrollTrigger.getById('mainScroll') === 'object') {
					ScrollTrigger.getById('mainScroll').kill()
				}

				if (typeof tl === 'object') {
					tl.kill()
					tl.seek(0)
				}

				document.body.scrollTop = document.documentElement.scrollTop = 0
				this.init()
			}

			// Get total scroll
			this.getTotalScroll = () => {
				let totalScroll = 0
				sections.forEach(section => {
					totalScroll += section.offsetHeight
				})
				totalScroll -= win.h
				return totalScroll
			}
		}

		Scroll.init()
		/* End GSAP ScrolTiger Animation */

	}); // end document ready function

})(jQuery); // End jQuery