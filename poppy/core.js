// var poppy = poppy || {};

var poppy = (function(){
	function pop(type, title, message, callback) {
		var popup;
		switch (type) {
			case "success":
			popup = popupModule.setSuccess(title, message);
			break;
			case "info":
			popup = popupModule.setInfo(title, message);
			break;
			case "error":
			popup = popupModule.setError(title, message);
			break;
			case "warning":
			popup = popupModule.setWarning(title, message, callback);
			break;
		}

		var view = createPopupView(popup);

		processPopup(view, popup);
	}

	function processPopup(domView, popup) {
		var transitionTime = 1.5,
		displayTime = 5000,
		body = document.getElementsByTagName("body");

		domView.style.opacity = 0.01;
		domView.style.transition = "opacity " + transitionTime + "s linear";
		body[0].appendChild(domView);

		setTimeout(function(){
			displayFaidInDomElement(domView);
		},10);

		if (popup.position === "topLeft" || popup.position === "bottomRight") {
			hideDomElementByClick(domView, popup);
		} else {
			setTimeout(function(){
				fadeOutElementByInterval(domView, transitionTime * 10, POSITIONS[popup.position]);
			}, displayTime);
		}
	}

	function hideDomElementByClick (domView, popup) {
		if (popup.position === "topLeft") {
			domView.addEventListener("click", function(){
				removeDomElement(domView, "poppy-top-left");
			}, false);
		} else if (popup.position === "bottomRight"){
			domView.addEventListener("click", popup.callback, false);
		}
	}

	function displayFaidInDomElement(domView, interval){
		domView.style.opacity = 0.96;
	}

	function fadeOutElementByInterval(domView, interval, identifier){
		domView.style.opacity = 0.01;

		setTimeout(function(){
			removeDomElement(domView, identifier);
		}, interval * 100);
	}

	function removeDomElement (domView, identifier) {
		var child = document.getElementsByClassName(identifier)[0];
		child.parentNode.removeChild(child);
	}

	function executeCallback (){

	}

	return {
		pop : pop
	};
})();

poppy.pop('success', "Super Mario", "Rules ...");
poppy.pop('info', "Get more info", "Here is a nice ...");
poppy.pop('error', "ERROR!!!", "Beware of the errors ...");
poppy.pop('warning',"Warning is a good thing", "Read more about ...", redirect);

function redirect() {
	window.location.href = 'https://www.youtube.com/watch?v=HMUDVMiITOU';
}

