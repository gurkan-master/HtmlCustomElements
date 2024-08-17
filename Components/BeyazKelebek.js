class BeyazKelebek extends HTMLElement {

	constructor() {		
		super();
		this._beyazKelebekElement = new Image();
		this._beyazKelebekElement.src = "./images/kelebek11.png";
		this._beyazKelebekElement.alt = "alt";
		this._beyazKelebekElement.style.position='absolute';
		this._beyazKelebekElement.style.width='20px';
		this._beyazKelebekElement.style.height='auto';
		
		this._dalElement = new Image();
		this._dalElement.src = "./images/dal.png";
		this._dalElement.alt = "dal";
		this._dalElement.style.position='absolute';
		this._dalElement.style.width='20px';
		this._dalElement.style.height='9px';
		this._dalElement.style.top='370px';
		this._dalElement.style.left='353px';
		
		this._count = 1;
		this._pos = 0;
		this._screenHyp = 350;
		this._flyDirection = 'right';
	}
	
    static get observedAttributes() {
		return ['is-live'];
    }
	
	connectedCallback(){
	  if(this.id != '' ){
		  this._beyazKelebekElement.id = this.id + '_Image';
		  this._dalElement.id = this.id + '_Dal';
	  } else {
		  throw new Error("id attribute is required for beyaz-kelebek element!");
	  }
	  
	  this.appendChild(this._beyazKelebekElement);
	  this.appendChild(this._dalElement);

	  this._dalElement = this.children[this.id+'_Dal'];
	  this._dalElement.isClicked = false;

			this._dalElement.onclick = function(){
				if(this.isClicked) return;
				
				var that = this.parentElement;
				//dala konmak için uçuyor.
				that._animationId = setInterval(()=>{
				if (that._pos == that._screenHyp) {
					clearInterval(that._animationId);
					this.isClicked = false;
					
					//dala kondu artık kanat çırpmasın :)
					that.attributeChangedCallback('is-live','1','0');
					
					that._beyazKelebekElement.isClicked = false;
					
					//dala konduktan sonra geri dönmesi için
					that._beyazKelebekElement.onclick= function(){
						if(this.isClicked) return;
						
						var that = this.parentElement;
						that.attributeChangedCallback('is-live','0','1');
						that._animationId = setInterval(()=>{
						if (that._pos == 0) {
							clearInterval(that._animationId);
							this.isClicked = false;
						} else {
							that._pos = that._pos - 1; 
							that._beyazKelebekElement.style.top = `${that._pos}px`;
							that._beyazKelebekElement.style.left = `${that._pos}px`;
							that._flyDirection = 'left'
						}
					}, 10);
						
					this.isClicked = true;
					};
					
				} else {
					that._pos = that._pos + 1; 
					that._beyazKelebekElement.style.top = `${that._pos}px`;
					that._beyazKelebekElement.style.left = `${that._pos}px`;
					that._flyDirection = 'right'
				}
			 }, 10);
			 
			 this.isClicked = true;
				
			};
	  
	  
   }

    attributeChangedCallback(name, oldValue, newValue) {
	 
	  if(name == "is-live" ){
		  
		  if(this._timeStampIntervId != null && (newValue == "false" || newValue == "0")) {
			  this._beyazKelebekElement.src = "./images/kelebek11.png";
			  clearInterval(this._timeStampIntervId);
		      this._timeStampIntervId = null;
		  }
		  
		  if(this._animationId != null && (newValue == "false" || newValue == "0")){
			clearInterval(this._animationId);
			this._animationId = null;
		  }   
		  
		  if(newValue == "true" || newValue == "1") {
			  
			 this._timeStampIntervId = setInterval(() => {
				 if(this._count==4) {this._count=1;}
				 
				 if(this._flyDirection == 'right'){
				  this._beyazKelebekElement.src = `./images/kelebek${this._count}${this._count}.png`;
				 }
				 
				 if(this._flyDirection == 'left'){
				  this._beyazKelebekElement.src = `./images/kelebek${this._count}.png`;
				 }
				
				this._count = this._count + 1;
			 }, 150);
			
			
		  }
		
	   }
    }
  
}

customElements.define("beyaz-kelebek", BeyazKelebek);
