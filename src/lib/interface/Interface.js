
import {Textures} from '../../assets/img/textures/Textures.js';

if( window.console ) console.log(Textures);

export class Interface{
	constructor(){
		this.root = document.createElement('div');
		this.root.classList.add('interface');
		document.body.appendChild(this.root);

		
		for( var group in Textures ){

			var element = document.createElement('div');
			element.classList.add('group');

			var title = document.createElement('h2');
			title.innerHTML = group;

			var content = document.createElement('div');
			content.classList.add('content');

			for( var image in Textures[group] ){

				var container = document.createElement('div');
				container.classList.add('button');

				var img = document.createElement('img');
				img.src = Textures[group][image];

				container.appendChild( img );
				content.appendChild( container );

			}

			element.appendChild(title);
			element.appendChild(content);

			this.root.appendChild(element);

		}



		//this.root.innerHTML = JSON.stringify(textures);

	}
}