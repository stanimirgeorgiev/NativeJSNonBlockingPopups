// TODO: Implement popup function constructors

var popupModule = (function(){
	function Popup (title, message, type, position) {
		if (this.constructor === Popup) {
			throw new Error("Can't instantiate an abstract class");
		}

		this.position = position;
		this.type = type;
		this.autoHide = false;
		this.timeout = 0;
		this.closeButton = false;
		this.title = title;
		this.message = message;

		return Popup;
	}

	Object.prototype.extends = function (parent) {
		this.prototype = Object.create(parent.prototype);
		this.prototype.constructor = this;
	};

	function SuccessPopup (title,message) {
		SuccessPopup.extends(Popup);
		Popup.call(this, title, message, "success", "bottomLeft");
	}

	function InfoPopup (title,message) {
		InfoPopup.extends(Popup);
		Popup.call(this, title, message, "info", "topLeft");
		this.closeButton = true;
	}

	function ErrorPopup (title, message) {
		ErrorPopup.extends(Popup);
		Popup.call(this, title, message, "error", "topRight");
	}

	function WarningPopup (title, message, callback) {
		WarningPopup.extends(Popup);
		Popup.call(this, title, message, "warning", "bottomRight");

		this.callback = callback;
	}

	return {
		setSuccess : function(title, message){
			var dataPopup = new	SuccessPopup(title, message);
			return dataPopup;
		},

		setInfo : function(title, message){
			var dataPopup = new	InfoPopup(title, message);
			return dataPopup;
		},

		setError : function(title, message){
			var dataPopup = new	ErrorPopup(title, message);
			return dataPopup;
		},

		setWarning : function(title, message, callback){
			var dataPopup = new	WarningPopup(title, message, callback);
			return dataPopup;
		}
	};
})();