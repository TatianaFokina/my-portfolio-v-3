export function AnchorLinkFix() {
	const $anchorLinks = document.querySelectorAll(".js-anchor-link");

	for(let i = 0; i < $anchorLinks.length; i++) {
		$anchorLinks[i].addEventListener("click", () => {
			const $anchorLinkHref = $anchorLinks[i].href;
			const $anchorLinkTarget = document.getElementById($anchorLinkHref.split("#")[1]);

			if($anchorLinkTarget) {
				// Add tabindex="-1" for a target element
				$anchorLinkTarget.setAttribute("tabindex", "-1");

				// Remove tabindex="-1". Delete after first call
				$anchorLinkTarget.addEventListener("blur", () => {
					$anchorLinkTarget.removeAttribute("tabindex");
				}, {once: true});

				// Fix for TalkBack + Android
				$anchorLinkTarget.focus();
			}
		// Optimization for Chrome and non-fast scrollable region
		}, {passive: true});
	}
}
