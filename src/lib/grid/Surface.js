import * as PIXI from 'pixi.js';
import {App} from 'App';
import {Tile} from 'grid/Tile';
import {TextureData} from 'interface/Interface';

export class Surface{
	
	constructor(sprite){
		this.sprite = sprite;
		this.enabled = true;
	}

	get enabled(){ return this._enabled }
	set enabled(bool){
		if( bool !== this.enabled ){
			
			this._enabled = bool;
			this.cc = {top:false,right:false,bottom:false,left:false};
			this.overlays = {};

			if( !bool ){
				// CLEAR ALL MASKING
				this.clear();
			}else{
				// PREPARE SPRITES & MASKS
				for( var s in this.cc){
					if( !this.overlays[s] 						) this.overlays[s] = new PIXI.Sprite();
					if( !this.overlays[s].parent				) this.sprite.addChild( this.overlays[s] );
					if( !this.overlays[s].maskGraphics 			) this.overlays[s].maskGraphics = new PIXI.Graphics();
					if( !this.overlays[s].maskGraphics.parent 	) this.overlays[s].addChild( this.overlays[s].maskGraphics );

					// CENTER
					this.overlays[s].anchor.set( 0.5 );

				}
			}
		}
	}
	
	clear(){
		for( var s in this.cc){
			if( this.overlays[s] ){
				this.overlays[s].destroy(true)
			}
		}
	}

	updateConnections(tile, myTextureDataId, updateNeighbours = false){


		//console.log('Surface.updateConnections', myTextureDataId, updateNeighbours);

		let myTextureData = TextureData[myTextureDataId],
			surfaceSize = 3,
			neighbours = {
				left:App.Grid.getTile({x:tile.cx - surfaceSize, y:tile.cy}),
				right:App.Grid.getTile({x:tile.cx + surfaceSize, y:tile.cy}),
				top:App.Grid.getTile({x:tile.cx, y:tile.cy-surfaceSize}),
				bottom:App.Grid.getTile({x:tile.cx, y:tile.cy+surfaceSize})
			}


		// GET APPROPRIATE TEXTURES
		var neighbourDataNode, s;

		// UPDATE NEIGHBOURS ONLY
		if( updateNeighbours ){
			for( s in neighbours ){
				if( neighbours[s] ){
					neighbourDataNode = neighbours[s].content.getDataNodes('surface');
					if( neighbourDataNode.length === 1 ){
						neighbours[s].content.getSprites('surface')[0].surface.updateConnections(neighbours[s],neighbourDataNode[0].id);
					}
				}
			}

			// DONE
			return;
		}


		for( s in neighbours ){
			if( neighbours[s]  ){
				neighbourDataNode = neighbours[s].content.getDataNodes('surface');
				if(
					neighbourDataNode.length === 1 && 
					this.overflows( neighbourDataNode[0].id, myTextureDataId )					
				){
					neighbours[s] = neighbourDataNode[0];
				}else{
					neighbours[s] = false;
					this.overlays[s].visible = false;
				}
			}
		}

		

		for( s in neighbours ){
			if( neighbours[s] ){

				var requiresUpdate = ( this.overlays[s].textureDataId !== neighbours[s].id );
				console.log('Surface.updateConnection',neighbours[s].id, '>>', myTextureDataId, 'update:', requiresUpdate );

				if( requiresUpdate ){
					let textureData = TextureData[ neighbours[s].id ]
					
					// SET SPITE TEXTURE
					this.overlays[s].textureDataId = textureData.id;
					this.overlays[s].visible = true;
					this.overlays[s].texture = PIXI.Texture.from( textureData.url )
					
					this.drawMask(s, this.overlays[s].maskGraphics, this.overlays[s].texture.width, textureData.size[0] )
					this.overlays[s].mask = true ? this.overlays[s].maskGraphics : null;
					this.overlays[s].alpha = 1;
					this.overlays[s].maskGraphics.alpha = 1
				}
			}
		}
	}

	overflows( from, to ){
		from = from.split('/')[1];
		to = to.split('/')[1];
		if( from === to ) return false;
		if( from === 'water' ) return true;
		if( from === 'grass' && to === 'dirt' ) return true;
		return false;
	}


	drawMask(side, graphics, size, span){

		var i,
			offset = size * -0.5,
			minimumIndent = size * 0.50 / span,
			maximumIndent = size * 1.10 / span,
			segments = Math.floor(3 + Math.random() * 5),
			x = [offset,offset+minimumIndent], y = [offset,offset];
		
		for(i=0;i<segments;i++){
			x.push( minimumIndent + Math.random() * (maximumIndent-minimumIndent ) + offset )
			y.push( minimumIndent + (size-minimumIndent*2) * (i+1) / (segments+1) + offset )
		}
		
		// CLOSING THE POINTS
		x.push(minimumIndent+offset);
		y.push(size+offset);
		x.push(offset);
		y.push(size+offset);

		// CHANGE FOR SIDES
		for(i=0;i<x.length;i++){
			
			if( side === 'right' ){
				x[i] = -x[i];
			}

			if( side === 'top' || side === 'bottom' ){
				var _x = x[i];
				x[i] = y[i];
				y[i] = _x;

				if( side === 'bottom' ) y[i] = -y[i];

			}
		}

		// CALCULATE CONTROL POINTS
		var cpx = this.computeControlPoints(x),
			cpy = this.computeControlPoints(y);

		// DRAW WOBBLY SHAPE
		graphics.clear();
		graphics.beginFill(0xff0000,1);
		graphics.moveTo(x[0],y[0]);
		for(i=0;i<x.length-1;i++){
			if( i === 0 || i === x.length-2 ){
				graphics.lineTo(x[i+1], y[i+1])
			}else{
				graphics.bezierCurveTo( cpx.p1[i], cpy.p1[i], cpx.p2[i], cpy.p2[i], x[i+1], y[i+1] );
			}
		}
		graphics.lineTo(x[0],y[0]);
		graphics.endFill();

	}


	/* ADAPTED FROM bezier-spline.js
	 *
	 * computes cubic bezier coefficients to generate a smooth
	 * line through specified points. couples with SVG graphics 
	 * for interactive processing.
	 *
	 * For more info see:
	 * http://www.particleincell.com/2012/bezier-splines/ 
	 *
	 * Lubos Brieda, Particle In Cell Consulting LLC, 2012
	 * you may freely use this algorithm in your codes however where feasible
	 * please include a link/reference to the source article
	 */ 

	/*computes control points given knots K, this is the brain of the operation*/
	computeControlPoints(K){

		var p1=new Array(),
			p2=new Array(),
			n = K.length-1,
			i,m,
		
			/*rhs vector*/
			a=new Array(),
			b=new Array(),
			c=new Array(),
			r=new Array();
		
		/*left most segment*/
		a[0]=0;
		b[0]=2;
		c[0]=1;
		r[0] = K[0]+2*K[1];
		
		/*internal segments*/
		for (i = 1; i < n - 1; i++)
		{
			a[i]=1;
			b[i]=4;
			c[i]=1;
			r[i] = 4 * K[i] + 2 * K[i+1];
		}
				
		/*right segment*/
		a[n-1]=2;
		b[n-1]=7;
		c[n-1]=0;
		r[n-1] = 8*K[n-1]+K[n];
		
		/*solves Ax=b with the Thomas algorithm (from Wikipedia)*/
		for (i = 1; i < n; i++)
		{
			m = a[i]/b[i-1];
			b[i] = b[i] - m * c[i - 1];
			r[i] = r[i] - m*r[i-1];
		}
	 
		p1[n-1] = r[n-1]/b[n-1];
		for (i = n - 2; i >= 0; --i)
			p1[i] = (r[i] - c[i] * p1[i+1]) / b[i];
			
		/*we have p1, now compute p2*/
		for (i=0;i<n-1;i++)
			p2[i]=2*K[i+1]-p1[i+1];
		
		p2[n-1]=0.5*(K[n]+p1[n-1]);
		
		return {p1:p1, p2:p2};
	}

	
	static mixin(sprite){
		sprite.surface = new Surface(sprite);
		return sprite;
	}

	static neighboursConnect(tile){
		var node = tile.content.getDataNodes('surface')[0],
			sprite = tile.content.getSprites('surface')[0];
		sprite.surface.updateConnections(tile, node.id, true)
	}

	
}


import {HotModule} from 'HotModule.js'
HotModule(module, Surface );