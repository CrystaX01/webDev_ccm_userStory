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
						var userstory = dataset.userstorys[i];
						var last = dataset.userstorys.length-1;
						if(dataset.userstorys.length==1) { // Wenn es nur einen Datensatz gibt, Userstory ohne arrow-keys ausgeben
							userstorys_div.append( ccm.helper.html( self.html.get( 'userstory4' ), { // Trage Userstory mit Werten ein
								id: ccm.helper.val('Userstory ' + (i+1)),
								text: ccm.helper.val( userstory.text ),
								points: ccm.helper.val( userstory.points ),
								bid: ccm.helper.val(i),
								onclick: function () { // Lösch Funktion
									dataset.userstorys.splice(this.getAttribute('class'), 1); // Lösche gewählte Userstory aus dataset
									self.store.set(dataset, function (){ // Update Store und render die ausgabe neu
										self.render();
									});
								}
							}));
						} else if(i==0) { // Ausgabe des ersten Datensatzes mit Arrowkey down
							userstorys_div.append( ccm.helper.html( self.html.get( 'userstory2' ), { // Trage Userstory mit Werten ein
								id: ccm.helper.val('Userstory ' + (i+1)),
								text: ccm.helper.val( userstory.text ),
								points: ccm.helper.val( userstory.points ),
								bid: ccm.helper.val(i),
								down: function() { // Key-Down Funktion
									var sort_id = parseInt(this.getAttribute('class')); //Wähle ID des momentanen Objects
									var value = dataset.userstorys[sort_id].text; //Speichere Text des zu bewegenden Objects
									var value2 = dataset.userstorys[sort_id].points; //Speichere Points des zu bewegenden Objects
									dataset.userstorys.splice(sort_id, 1); //Lösche bewegendes Object
									dataset.userstorys.splice((sort_id+1), 0, {text: value, points: value2}); //Füge zu bewegendes Object an richtiger stelle ein
									self.store.set(dataset, function (){ // Update Store und render die ausgabe neu
										self.render();
									});
								},
								onclick: function () { // Lösch Funktion
									dataset.userstorys.splice(this.getAttribute('class'), 1); // Lösche gewählte Userstory aus dataset
									self.store.set(dataset, function (){ // Update Store und render die ausgabe neu
										self.render();
									});
								}
							}));
						} else if(i==last) { // Ausgabe des letzten Datensatzes mit Arrowkey up
							userstorys_div.append( ccm.helper.html( self.html.get( 'userstory3' ), { // Trage Userstory mit Werten ein
								id: ccm.helper.val('Userstory ' + (i+1)),
								text: ccm.helper.val( userstory.text ),
								points: ccm.helper.val( userstory.points ),
								bid: ccm.helper.val(i),
								up: function() { // Key-Up Funktion
									var sort_id = parseInt(this.getAttribute('class')); //Wähle ID des momentanen Objects
									var value = dataset.userstorys[sort_id].text; //Speichere Text des zu bewegenden Objects
									var value2 = dataset.userstorys[sort_id].points; //Speichere Points des zu bewegenden Objects
									dataset.userstorys.splice(sort_id, 1); //Lösche bewegendes Object
									dataset.userstorys.splice((sort_id-1), 0, {text: value, points: value2}); //Füge zu bewegendes Object an richtiger stelle ein
									self.store.set(dataset, function (){ // Update Store und render die ausgabe neu
										self.render();
									});
								},
								onclick: function () { // Lösch Funktion
									dataset.userstorys.splice(this.getAttribute('class'), 1); // Lösche gewählte Userstory aus dataset
									self.store.set(dataset, function (){ // Update Store und render die ausgabe neu
										self.render();
									});
								}
							}));
						} else { // Standard userstory ausgabe mit beiden Arrowkeys
							userstorys_div.append( ccm.helper.html( self.html.get( 'userstory' ), { // Trage Userstory mit Werten ein
								id: ccm.helper.val('Userstory ' + (i+1)),
								text: ccm.helper.val( userstory.text ),
								points: ccm.helper.val( userstory.points ),
								bid: ccm.helper.val(i),
								up: function() { // Key-Up Funktion
									var sort_id = parseInt(this.getAttribute('class')); //Wähle ID des momentanen Objects
									var value = dataset.userstorys[sort_id].text; //Speichere Text des zu bewegenden Objects
									var value2 = dataset.userstorys[sort_id].points; //Speichere Points des zu bewegenden Objects
									dataset.userstorys.splice(sort_id, 1); //Lösche bewegendes Object
									dataset.userstorys.splice((sort_id-1), 0, {text: value, points: value2}); //Füge zu bewegendes Object an richtiger stelle ein
									self.store.set(dataset, function (){ // Update Store und render die ausgabe neu
										self.render();
									});
								},
								down: function() { // Key-Down Funktion
									var sort_id = parseInt(this.getAttribute('class')); //Wähle ID des momentanen Objects
									var value = dataset.userstorys[sort_id].text; //Speichere Text des zu bewegenden Objects
									var value2 = dataset.userstorys[sort_id].points; //Speichere Points des zu bewegenden Objects
									dataset.userstorys.splice(sort_id, 1); //Lösche bewegendes Object
									dataset.userstorys.splice(sort_id+1, 0, {text: value, points: value2}); //Füge zu bewegendes Object an richtiger stelle ein
									self.store.set(dataset, function (){ // Update Store und render die ausgabe neu
										self.render();
									});
								},
								onclick: function () { // Lösch Funktion
									dataset.userstorys.splice(this.getAttribute('class'), 1); // Lösche gewählte Userstory aus dataset
									self.store.set(dataset, function (){ // Update Store und render die ausgabe neu
										self.render();
									});
								}
							}));
						}
						
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