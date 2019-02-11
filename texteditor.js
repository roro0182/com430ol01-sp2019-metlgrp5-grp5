//visual change of text styles
		var fonts = document.querySelectorAll("select#fontChanger > option");
			for(var i=0; i<fonts.length; i++){
			fonts[i].style.fontFamily = fonts[i].value;	
}

window.addEventListener("load", function(){
 var editor = theWYSIWYG.document;
 editor.designMode = "on"; //gives the ability to write text

//action: click to make bold
 boldButton.addEventListener("click", function() {
 	editor.execCommand("Bold", false, null);
 },false);

 //action: click to make italic
 italicButton.addEventListener("click", function() {
 	editor.execCommand("Italic", false, null);
 },false);

 //action: click to make superScript
 supButton.addEventListener("click", function() {
 	editor.execCommand("Superscript", false, null);
 },false);

//action: click to make subScript
 subButton.addEventListener("click", function() {
 	editor.execCommand("Subscript", false, null);
 },false);

 //action: click to make strikethrough
 strikeButton.addEventListener("click", function() {
 	editor.execCommand("Strikethrough", false, null);
 },false);

 //action: click to make ordered list
 //change null to and id that will have a unique numer 1-1000
 // list styly: 1.  2. etc.
	orderedListButton.addEventListener("click", function() {
 	editor.execCommand("InsertOrderedList", false, "newOL" + Math.round(Math.random() *1000));
 },false);

 //action: click to make ordered list
 //change null to and id that will have a unique numer 1-1000
 //list look bullets:
	unorderedListButton.addEventListener("click", function() {
 	editor.execCommand("InsertunOrderedList", false, "newOL" + Math.round(Math.random() *1000));
 },false);

//action: change font color (ForeColor)
//color will remain in its last change/"event"
	fontColorButton.addEventListener("change", function(event){
		editor.execCommand("ForeColor", false, event.target.value);
	}, false);

//action: change highlight color (BackColor)
//color will remain in its last change/"event"
	highlightButton.addEventListener("change", function(event){
		editor.execCommand("BackColor", false, event.target.value);
	}, false);

//action: change the font style in dropdown
//font will remain in it last style/"event"
	fontChanger.addEventListener("change", function(event){
		editor.execCommand("FontName", false, event.target.value);
	},false);

//action: change the font siz in dropdown
//font will remain in it last size/"event"
	fontSizeChanger.addEventListener("change", function(event){
		editor.execCommand("FontSize", false, event.target.value);
	},false);

//action: click to make font a link
	linkButton.addEventListener("click", function(){
		//prompts the user to give a URL
		var url = prompt("Enter a URL", "http://");
		editor.execCommand("CreateLink", false, url);
	}, false);

//action: click remove link; unlink
 	unlinkButton.addEventListener("click", function() {
 		editor.execCommand("UnLink", false, null);
 	},false);

 //action: click undo previous action
 	undoButton.addEventListener("click", function() {
 		editor.execCommand("undo", false, null);
 	},false);

 	//action: click redo previous action
 	redoButton.addEventListener("click", function() {
 		editor.execCommand("redo", false, null);
 	},false);

}, false);
