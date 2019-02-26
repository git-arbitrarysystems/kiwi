import './css/style.scss';
import {App} from 'App';
import {hot} from 'hot';


new App({
	resizeTo:window
});


if (module.hot) {
   module.hot.accept('./kiwi/hot.js', function() {
     console.log('Accepting the updated Tile module!');
     if( window.console ) console.log(hot());
    
   })
}

