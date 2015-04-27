console.log("loaded");
HTMLArea.AnnotateButton = Ext.extend(HTMLArea.Plugin, {
	configurePlugin: function (editor) {
		var pluginInformation = {
			version		: '0.1',
			developer	: 'Johannes Goslar',
			developerUrl	: 'http://www.dkd.de/',
			copyrightOwner	: 'dkd Internet Service GmbH',
			sponsor		: 'dkd Internet Service GmbH',
			sponsorUrl	: 'http://www.dkd.de/',
			license		: 'GPL'
		};
		this.registerPluginInformation(pluginInformation);
        var buttonId = "AnnotateButton";
        var buttonConfiguration = {
            id: buttonId,
            tooltip: "annotate",
            action: "onButtonPress",
            textMode: true,
            dialog: true
        };
        this.registerButton(buttonConfiguration);
        return true;
	},
	onButtonPress: function (editor, id, target) {
        debugger;
        var input = editor.getInnerHTML(),
            table = this.editorConfiguration.buttonsConfig.AnnotateButton.table,
            uid = this.editorConfiguration.buttonsConfig.AnnotateButton.uid;
        
        TYPO3.GATE.Server.someFunction(input,table,uid,function(result){
            editor.setHTML(result);
        });
	    return false;
    },
	onUpdateToolbar: function (button, mode, selectionEmpty, ancestors) {
	}
});
