define('TYPO3/CMS/Annotate/Editor', [
], function (
) {
    function Abs(){
        this.applyHooks();
    }
    Abs.prototype = {
        constructor: Abs,
        createAnnotationAroundSelection: function() {
            var range = this.getSelectedRange(),
                doc = this.getDocument(),
                ele = doc.createElement("span");
            ele.setAttribute('vocab',"New Annotation");
            ele.setAttribute('resource',"New Annotation");
            ele.setAttribute('typeof',"New Annotation");
            range.surroundContents(ele);
        },
        getSelectedRange: function() {
            return null;
        },
        getDocument: function() {
            return null;
        },
        applyHooks: function() {
        },
        getAnnotationList: function() {
            var lists = document.getElementsByClassName("annotate-list");
            if (lists.length > 0)
                return lists[0];
            return null;
        },
        getContent: function() {
            return null;
        },
        setContent: function() {
        }
    };
    function Htmlarea(api, htmlarea) {
        this.htmlarea = htmlarea;
        this.api = api;
        Abs.call(this);
    }
    Htmlarea.prototype = Object.create(Abs.prototype);
    Htmlarea.prototype.constructor = Htmlarea;
    Htmlarea.prototype.getSelectedRange = function() {
        return this.htmlarea.getSelectionRanges()[0];
    };

    Htmlarea.prototype.unwrapElement = function(element) {
        this.htmlarea.getDomNode().removeMarkup(element);
    };

    Htmlarea.prototype.getDocument = function() {
        return this.htmlarea.document;
    };

    Htmlarea.prototype.setContent = function(content) {
        this.htmlarea.setHTML(content);
    };

    Htmlarea.prototype.getContent = function() {
        return this.htmlarea.getInnerHTML();
    };


    Htmlarea.prototype.applyHooks = function() {
        var focus_ = this.htmlarea.focus.bind(this.htmlarea),
            setHTML_ = this.htmlarea.setHTML.bind(this.htmlarea),
            setMode_ = this.htmlarea.setMode.bind(this.htmlarea),
            editor =  this;
        this.htmlarea.focus = function() {
            // the htmlarea undo functionality will refocus on the editor if we change an annotation attribute
            if (editor.getAnnotationList() && !editor.getAnnotationList().contains(document.activeElement))
                focus_();
        };
        this.htmlarea.setHTML = function() {
            setHTML_.apply(editor, arguments);
            if (editor.store)
                editor.store.reset();
        };
        var previous = false;
        this.htmlarea.setMode = function(mode) {
            if (mode != 'wysiwyg')
            {
                previous = editor.getAnnotationList() != null;
                editor.api.hide();
            }
            else if (previous)
                editor.api.show();
            setMode_(mode);
            if (editor.store)
                editor.store.reset();
        };
    };
    return {
        Htmlarea: Htmlarea
    };
});
