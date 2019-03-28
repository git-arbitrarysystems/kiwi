import {H} from 'interface/H';
import './DataSheet.scss';
import {Transform} from 'grid/Transform'
import {App} from 'App'
import {TextureData} from 'interface/Interface';


class DataSheetNode{
	constructor(target){

		// STRING
		this.title = 'Title';
		
		this.root = H.ce({class:'node', target:target});
		this.img = H.ce({class:'img', target:this.root});
		this.p = H.ce({tag:'p', innerHTML:'info', target:this.root});
	}


	getTransform(trim, orig){

		var sx = trim.width * 100  / orig.width,
			sy = trim.height * 100 / orig.height;

		var px = trim.left * 100 / orig.width,// + (rx*100),
			py = trim.top * 100  / orig.height// + (ry*100);

		var spx = (orig.width - trim.width) / orig.width;
		if( spx !== 0 ) px /= spx;

		var spy = (orig.height - trim.height) / orig.height;
		if( spy !== 0 ) py /= spy;


		let size = Math.round(sx) + '% ' + Math.round(sy) + '%';
		let position = Math.round(px) + '% ' + Math.round(py) + '%';

		return {
			size:size,
			position:position
		}
	}

	feed(content, backgroundUrl){
		

		var data =TextureData[content.id];
		//console.log('DataSheetNode.feed', data );

		this.title = data.id;
		this.p.innerHTML = data.description;
		this.p.scrollTop = 0;
		
		let skew = ['road/', 'surface/'].some( (type) => { return content.id.indexOf(type) !== -1 }),
			backgroundImage = '',
			backgroundSize = '',
			backgroundPosition = '',
			img;

		['main', 'surface'].forEach((s)=>{
			img = data.images[s];
			if( img ){
				if( backgroundImage.length > 0 ){
					backgroundImage  += ', ';
					backgroundSize += ', ';
					backgroundPosition  += ', ';
				}

				var transform = this.getTransform(img.trim, data.orig);


				backgroundImage += 'url('+img.url+')';
				backgroundSize += transform.size;
				backgroundPosition += transform.position;

			} 
		})
		
		
		if( TextureData[content.id].images.build ){
			backgroundImage = 'url('+TextureData[content.id].images.build.url+')';
			backgroundSize = 'contain'
			backgroundPosition = 'center'
		}

		backgroundImage += ', url('+backgroundUrl+')';
		backgroundSize += ', auto 100%';
		backgroundPosition += ', center';

		

		

		this.img.style.backgroundImage = backgroundImage;
		this.img.style.backgroundSize = backgroundSize;
		this.img.style.backgroundPosition = backgroundPosition;
		this.img.style.paddingBottom =  Math.round( (1-data.orig.width/data.orig.height ) * 50 ) + '%'


		//console.log('//', backgroundImage,'//', backgroundSize,'//', backgroundPosition, data.orig.height/data.orig.width );
		//this.img.classList[skew?'add':'remove']('skew');
	


	}
	destroy(){
		this.root.remove();
	}
}


class DataSheet{
	constructor(){
		this.root = H.ce({class:'datasheet'});
		this.hide();
		
		// TITLE
		this.title = H.ce({target:this.root, class:'title', innerHTML:'datasheet', tag:'h2'});

		this.btn_close = H.ce({target:this.root, class:'button', innerHTML:'X', tag:'button'});
		this.btn_close.addEventListener('click', (e) => { this.hide() });

		let dataHolderParent = H.ce({class:'menu', target:this.root})

		this.content = H.ce({class:'content', target:dataHolderParent});



		this.btn_prev = H.ce({target:dataHolderParent, class:'button', innerHTML:'<', tag:'button'});
		this.btn_prev.addEventListener('click', (e) => { this.prev() });
		let info = H.ce({class:'info', target:dataHolderParent})
		this.btn_next = H.ce({target:dataHolderParent, class:'button', innerHTML:'>', tag:'button'});
		this.btn_next.addEventListener('click', (e) => { this.next() });

		this.n =  H.ce({target:info, innerHTML:'0', tag:'span'});
		this.c =  H.ce({target:info, innerHTML:'0', tag:'span'})

		this.count = 0;
		this.nodes = [];

	}

	hide(){ this.root.classList.add('hidden');}
	show(){	this.root.classList.remove('hidden');}

	get tile(){ return this._tile }
	set tile(tile){
		if( tile !== this._tile ){
			this._tile = tile;
			if( tile ){
				//console.log('DataSheet.showTileData', tile.toString(), tile.content.keys );

				// POSITION
				/*var p = Transform.c2p(tile.cx, tile.cy);
				p.x += App.Grid.x;
				p.y += App.Grid.y;
				console.log(p);

				this.root.style.left = p.x + 'px';
				this.root.style.top  = p.y + 'px';*/

				// CONTENT

				let surface = tile.content.getDataNodes('surface/');
				//console.log(surface, TextureData, TextureData[surface[0].id]);


				let nodes = tile.content.getDataNodes('^((?!surface/).)*$')
				nodes.forEach( (node, index, array) => {
					if( !this.nodes[index] ) this.nodes[index] = new DataSheetNode(this.content);
					this.nodes[index].feed(node, TextureData[surface[0].id].images.main.url);
				});

				

				this.updateDisplay(nodes.length-1, nodes.length);



			}else{
				this.hide()
			}
		}else if(tile){
			this.updateDisplay();
		}
	}

	updateDisplay(count = this.count, length = this.length){

		this.count = count;
		this.length = length;

		for(var i=this.nodes.length-1; i>=length;i--){
			this.nodes.splice(i,1)[0].destroy();
		}

		if( this.nodes.length > 0 ){
			this.show();
		}else{
			this.hide();
			return;
		}

		this.n.innerHTML = count+1;
		this.c.innerHTML = length;

		/*this.btn_next.style.display = (count < length-1 ) ? 'block' : 'none';
		this.btn_prev.style.display = (count > 0 ) ? 'block' : 'none';*/
		this.title.innerHTML = this.nodes[count].title;

		this.nodes.forEach( (node,index) => {
			node.root.style.left = ((index-count)*100) + '%';
		});
	}

	next(){
		this.count = (this.count+1) % this.length;
		this.updateDisplay()
	}

	prev(){
		this.count = (this.count-1+this.length) % this.length;
		this.updateDisplay()
	}
	

}


export {DataSheet, DataSheetNode}


import {HotModule} from 'HotModule'
HotModule(module, DataSheet, DataSheetNode);