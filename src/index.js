import './css/style.scss';
import {App} from 'App';
import {hot} from 'hot';


new App({
	resizeTo:window
});


if (module.hot) {
   module.hot.accept()
}

