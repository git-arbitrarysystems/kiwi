
function replacePrototypeFunctions(src, target) {

    var keys = Object.getOwnPropertyNames(src.prototype),
    	index, keys, key;
    for( var index in keys ){
    	key = keys[index];
    	
    	if( key !== 'constructor' ){
    		
    		switch( typeof src.prototype[key] ){
    			case 'undefined':
    				
    				if( window.console ) console.log('replacePrototypeFunction(GET/SET):', key);
    				var srcValue = Object.assign({}, Object.getOwnPropertyDescriptor(src.prototype,key) );
    				Object.defineProperty(target.prototype,key,srcValue);
    			break;
    			default:
    				
    				if( target.prototype[key].toString() !== src.prototype[key].toString() ){
    					if( window.console ) console.log('replacePrototypeFunction('+( typeof src.prototype[key] ).toUpperCase() +'):', key);
    					target.prototype[key] = src.prototype[key];
    				}    				
    			break;
    		}
    	}	
    }
}

function HotModule(module, cls){
	
	if( module.hot ){
		module.hot.accept();
	}

	let name = cls.name;
	
	if( !HotModule.registered ){
		HotModule.registered = {};
	}

	if( !HotModule.registered[name] ){
		HotModule.registered[name] = cls;
		if( window.console ) console.log('[HotModule.NEW]',name);
	}

	// COMPARE
	if( HotModule.registered[name] !== cls ){
		if( window.console ) console.log('[HotModule.CHANGED]', name);

		replacePrototypeFunctions(
			cls, 
			HotModule.registered[name]
		);
	}
}

export {HotModule}
