const drop = () => {
	// 1 drag *
	// 2 dragend *
	// 3 dragenter - объект над dropArea
	// 4 dragexit *
	// 5 dragleave - объект за пределами dropArea
	// 6 dragover - объект двигаеться и зависает над dropArea
	// 7 dragstart *
	// 8 drop - наш объект отправлен в dropArea

	const fileInputs = document.querySelectorAll('[name="upload"]');

	["dragenter", "dragleave", "dragover", "drop"].forEach((eventName) => {
		fileInputs.forEach((input) => {
			input.addEventListener(eventName, preventDefaults, false);
		});
	});
	function preventDefaults(e) {
		e.preventDefault();
		e.stopPropagation();

		function hightLight(item) {
			item.closest(".file_upload").style.border = "5px solid yellow";
			item.closest(".file_upload").style.backgroundColor = "rgba(0,0,0, .7)";
		}
		function unHightLight(item) {
			item.closest(".file_upload").style.border = "none";

			if (item.closest(".calc_form")) {
				item.closest(".file_upload").style.backgroundColor = "#fff";
			} else {
				item.closest(".file_upload").style.backgroundColor = "#ededed";
			}
		}
		["dragenter", "dragover"].forEach((eventName) => {
			fileInputs.forEach((input) => {
				input.addEventListener(eventName, () => hightLight(input), false);
			});
		});
		["dragleave", "drop"].forEach((eventName) => {
			fileInputs.forEach((input) => {
				input.addEventListener(eventName, () => unHightLight(input), false);
			});
		});
	}

	fileInputs.forEach((input) => {
		input.addEventListener("drop", (e) => {
			input.files = e.dataTransfer.files;
			let dots;
			const arr = input.files[0].name.split(".");
			arr[0].length > 5 ? (dots = "...") : (dots = ".");
			const name = arr[0].substring(0, 6) + dots + arr[1];
			input.previousElementSibling.textContent = name;
		});
	});
};

export default drop;
