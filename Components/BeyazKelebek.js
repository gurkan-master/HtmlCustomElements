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
		var that = this.parentElement;
		
	  	if(this.isClicked) return;
		
		//kelebek tekrar başlangıç noktasına kadar dönmeli.Sonra dala basarsan gelecektir.
	  	if(that._beyazKelebekElement.isClicked) return;
	  	
		//konduğu dalın kırılmasından korkmayan kelebek özgüvenle uçar :)
	  	if (that._pos == that._screenHyp) {
	  		this.src = "./images/kirik_dal.png";
			that._beyazKelebekElement.onclick();
	  	} else if(that._pos == 0){
	  		this.src = "./images/dal.png";
	  	}
		
		//eğer başlangıç noktasında değilse ve animasyon id varsa çıksın ki aşağıda 2. bir animasyon başlamasın.
		//Çünkü kelebek havada uçmaya devam ediyordur.
		if(that._pos != 0 && that._animationId != null) return;
	  	
	  	//dala konmak için uçuyor.
	  	that._animationId = setInterval(()=> {
	  		if (that._pos == that._screenHyp) {
	  			clearInterval(that._animationId);
	  			that._dalElement.isClicked = false;
	  		
	  			//dala kondu artık kanat çırpmasın :)
	  			that.setAttribute('is-live','0');
	  		
	  			that._beyazKelebekElement.isClicked = false;
	  		
	  		} else {
	  			that._pos = that._pos + 1; 
	  			that._beyazKelebekElement.style.top = `${that._pos}px`;
	  			that._beyazKelebekElement.style.left = `${that._pos}px`;
	  			that._flyDirection = 'right'
	  		}
	  	}, 10);
		
		this.isClicked = true;
	  	
	  };
	  
	  //dala konduktan sonra geri dönmesi için
	   this._beyazKelebekElement.onclick= function(){
	  	 if(this.isClicked) return;
	  				
	  	 var that = this.parentElement;
		 
		 if(that.getAttribute('is-live') == '0' || 
				that.getAttribute('is-live') == 'false') {
				that.setAttribute('is-live','1');
		 }
	  	 
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
