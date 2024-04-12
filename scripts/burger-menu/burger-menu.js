export function BurgerMenu() {
	const $menuBtn = document.querySelector(".menu__button"),
		$menuContainer = document.querySelector(".menu__list"),
		$menuBtn_closed = "js-menu__button--close",
		$menuContainer_opened = "js-menu__list--open";

	let $isOpen = false;

	// Open menu
	function openMenu() {
		$menuBtn.classList.add($menuBtn_closed);
		$menuBtn.setAttribute("aria-expanded", "true");
		$menuBtn.setAttribute("aria-label", "Close menu");
		$menuContainer.classList.add($menuContainer_opened);
		$isOpen = true;
	}

	// Close menu
	function closeMenu() {
		$menuBtn.classList.remove($menuBtn_closed);
		$menuBtn.setAttribute("aria-expanded", "false");
		$menuBtn.setAttribute("aria-label", "Open menu");
		$menuContainer.classList.remove($menuContainer_opened);
		$isOpen = false;
	}

	if ($menuBtn) {
		$menuBtn.addEventListener("click", function(e) {
			e.stopPropagation();
			e.preventDefault();

			if ($isOpen === false) {
				openMenu();
				// Close menu for click to the document / menu item
				window.addEventListener("click", function(event) {
					if (!$menuBtn.contains(event.target)) {
						closeMenu();
					}
				});
			} else {
				closeMenu();
			}
		});
	}
}
