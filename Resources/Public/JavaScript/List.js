/**
 * @fileOverview Annotation List View
 * @name List.js
 * @author Johannes Goslar
 */
define('TYPO3/CMS/Annotate/List', [
    'TYPO3/CMS/Annotate/react',
    'TYPO3/CMS/Annotate/ListEntry',
    'TYPO3/CMS/Annotate/Observe',
    'TYPO3/CMS/Annotate/LoadingIndicator'
], function (
    React,
    ListEntry,
    Observe,
    LoadingIndicator
) {
    return React.createClass({
        displayName: 'List',
        mixins: [Observe.Mixin('store')],
        getInitialState: function() {
            return {
                expanded: null,
                busy: false
            };
        },
        updateListHeight: function() {
            this.setState({entitiesHeigth: this.props.editor.getWishedListHeigth()});
        },
        componentWillMount: function() {
            this.updateListHeight();
        },
        /**
         * Create new annotation
         */
        onCreateAnnotation: function() {
            this.props.editor.createAnnotationAroundSelection.call(this.props.editor);
            this.props.editor.aggregate("ANNOTATE_CREATE");
        },
        /**
         * Automatically annotate the whole onAuto
         */
        onAuto: function() {
            this.setState({busy: true});
            this.props.editor.autoAnnotate.call(this.props.editor, (function() {
                this.props.editor.aggregate("ANNOTATE_AUTO");
                this.setState({busy: false});
            }).bind(this));
        },
        /**
         * Index the Document
         */
        onIndex: function() {
            if (this.props.editor.getContentId().substring(0, 3) == "NEW")
                TYPO3.Flashmessage.display(3, "ERROR", "You need to save at least once before you can index content.");
            else
            {
                this.setState({busy: true});
                this.props.editor.autoIndex.call(this.props.editor, (function() {
                    this.setState({busy: false});
                }).bind(this));
            }
        },
        /**
         * Expand one annotation
         * @param {string} aid
         */
        expand: function(aid) {
            if (this.state.expanded)
                this.state.store.forAid(this.state.expanded).toggleBlink();
            if (aid && this.state.expanded != aid)
                this.state.store.forAid(aid).toggleBlink();
            this.setState({expanded: this.state.expanded != aid ? aid : null});
        },
        render: function() {
            return React.createElement("div", {className: "annotate"},
                React.createElement("div", {className: "wrapper"},
                  React.createElement("div", {className: "header"},
                    React.createElement("div", {className: "moduleTitle"}, React.createElement("h1", null, "Annotations")),
                    this.state.busy ? React.createElement(LoadingIndicator, null) :
                    React.createElement("div", null,
                      React.createElement("section", null,
                        React.createElement("button", {onClick: this.onAuto, type:"button", className: "all"}, "Annotate!"),
                        React.createElement("button", {onClick: this.onCreateAnnotation, type:"button", className: "new"}, "Around Selection!"),
                        React.createElement("button", {onClick: this.onIndex, type:"button", className: "index"}, "Index!")
                       )
                     )
                   ),
                  this.state.busy ? null :
                  React.createElement("div", {className: "entities", style: {maxHeight: this.state.entitiesHeigth}},
                    this.state.store.annotations.map(function(annotation, index) {
                        return React.createElement(ListEntry, {
                            key: annotation.get('aid'),
                            editor: this.props.editor,
                            expand: this.expand,
                            expanded: this.state.expanded == annotation.get('aid'),
                            annotation: annotation});
                    }, this)
                   )
                 )
               );
        }
    });
});
