ccm.component( {
	name: 'userstory',
	config: {                    // Standardkonfiguration für ccm-Instanzen
		html:  [ ccm.store, { local: 'templates.json' } ],  // Einbindung der HTML-Templates
		key: 'myuserstory',  // Standardwert für den Schlüssel des zu visualisierenden Datensatzes
		store: [ ccm.store, 'userstory.json' ],       // Abhängigkeit zum ccm-Datenspeicher
		style: [ ccm.load, 'style.css' ]  // Einbindung einer CSS-Datei
	},
	Instance: function () {
		var self = this;  // Hilfsvariable für einheitlichen Zugriff auf die ccm-Instanz
		self.init = function ( callback ) {
			self.store.onChange = function () { self.render(); };
			callback();
		};
		self.render = function ( callback ) {
			var element = ccm.helper.element( self );
			self.store.get( self.key, function ( dataset ) {
				if ( dataset === null )
					self.store.set( { key: self.key, userstorys: [] }, proceed );
				else
					proceed( dataset );
				function proceed( dataset ) {
					element.html( ccm.helper.html( self.html.get( 'main' ) ) );
					var userstorys_div = ccm.helper.find( self, '.userstorys' );     // neue private Variable
					for ( var i = 0; i < dataset.userstorys.length; i++ ) {		// Iterierung
						var userstory = dataset.userstorys[ i ];
						userstorys_div.append( ccm.helper.html( self.html.get( 'userstory' ), {
							id: ccm.helper.val(i+1),
							text: ccm.helper.val( userstory.text ),
							points: ccm.helper.val( userstory.points ),
							bid: ccm.helper.val(i),
							onclick: function () {
								dataset.userstorys.splice(this.getAttribute('id'),1);
								self.store.set(dataset, function (){
									self.render();
								});
							}
						}));
					}
					userstorys_div.append( ccm.helper.html( self.html.get( 'input' ), {  // Anhängen des input-Templates
						onsubmit: function () {						
							var value = ccm.helper.val( ccm.helper.find( self, '.textinput' ).val().trim() );
							var value2 = ccm.helper.val( ccm.helper.find( self, '.spoints' ).val().trim() );
							if ( value === '' ) return;
							if ( value2 === '' ) return;
							dataset.userstorys.push( { text: value , points: value2} );        // Lokale Aktualisierung
							self.store.set( dataset, function () { self.render(); } );  // Aktualisierung im ccm-Datenspeicher/Datenbank
							return false;                                               
						}                                      
					}));
					if ( callback ) callback();
				}
			});
		}
	}
});
/*
function () {
	dataset.userstorys.splice(i,1);
	self.store.set(dataset, function (){
		self.render();

	});
}
*/