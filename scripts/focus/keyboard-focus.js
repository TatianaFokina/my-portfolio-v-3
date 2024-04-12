export function KeyboardFocus() {
	const $keyboardClass = "keyboard-focus";

	// Add keyboard-accessible class to <body>
	document.addEventListener("keydown", (e) => {
		if (e.key === "Tab") {
			document.body.classList.add($keyboardClass);
		}
	});

	// Remove class from <body>
	document.addEventListener("mousedown", () => {
		document.body.classList.remove($keyboardClass);
	});
}
