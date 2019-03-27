export const H = {
	
	// CREATE ELEMENT
	ce: function(props = {}){
		var d = document.createElement( props.tag || 'div' );
		for( var s in props ){
			if( ['target','tag'].indexOf(s) !== 0 ){
				if( typeof d[s] !== 'undefined' ){
					d[s] = props[s]
				}else{
					d.setAttribute(s, props[s] );
				}
			}
		}
		(props.target ? props.target : document.body ).appendChild(d);
		return d;
	}
}

import {HotModule} from 'HotModule'
HotModule(module, H);