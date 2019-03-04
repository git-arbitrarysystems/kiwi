
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

function HotModule(module, ...cls){
	
	if( module.hot ){
		module.hot.accept();
	}

    if( !HotModule.registered ){
        HotModule.registered = {};
    }

    Array(...cls).forEach( (value)=>{
        
        let name = value.name;
    
        

        if( !HotModule.registered[name] ){
            HotModule.registered[name] = value;
            if( window.console ) console.log('[HotModule.NEW]',name);
        }

        // COMPARE & REPLACE
        if( HotModule.registered[name] !== value ){
            if( window.console ) console.log('[HotModule.CHANGED]', name);
            replacePrototypeFunctions(
                value, 
                HotModule.registered[name]
            );
        }
    })

	
}

export {HotModule}
