class TimeStamp extends HTMLElement {

	constructor() {
		super();
		this._culture="tr-TR";
		this._timeStampIntervId = null;
		
	}
	
    static get observedAttributes() {
		return ['culture', 'is-live'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if(name == "culture"){
		this._culture = newValue;
		this.innerHTML = (new Date()).toLocaleString(newValue);
	  }
	 
	  if(name == "is-live" ){
		  if(this._timeStampIntervId != null && (newValue == "false" || newValue == "0")) {
			  clearInterval(this._timeStampIntervId);
		      this._timeStampIntervId = null;
		  }
		  if(newValue == "true" || newValue == "1") {
			 this._timeStampIntervId = setInterval(() => {
				  this.innerHTML = (new Date()).toLocaleString(this._culture);
			}, 1000);
		  }
	   }
    }
  
}

customElements.define("time-stamp", TimeStamp);
