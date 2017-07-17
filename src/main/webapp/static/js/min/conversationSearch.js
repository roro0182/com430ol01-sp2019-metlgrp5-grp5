var Conversations=function(){var b="",l=[],q=void 0,r=void 0,f="",m=[],d=[],p={},g=void 0,w=!1,x=!1,n=[],t=!1;$(function(){var a=function(a){jsGrid.Field.call(this,a)},k=function(a){jsGrid.Field.call(this,a)},c=function(a){jsGrid.Field.call(this,a)};a.prototype=new jsGrid.Field({sorter:function(a,c){return new Date(a)-new Date(c)},itemTemplate:function(a){return moment(a).format("MMM Do YYYY, h:mm a")},insertTemplate:function(a){return""},editTemplate:function(a){return""},insertValue:function(){return""},
editValue:function(){return""}});$("#onlyMyConversations").click(function(){w=$(this).is(":checked");e()});$("#includeDeleted").click(function(){x=$(this).is(":checked");e()});k.prototype=new jsGrid.Field({sorter:function(a,c){return 0},itemTemplate:function(a,c){if("importing"in c){var b=c.stageProgress.numerator,h=c.stageProgress.denominator,k=c.stageProgress.name;return $("<div/>").append($("<progress/>",{value:b,max:h,text:sprintf("%s out of %s",b,h)})).append($("<div/>",{text:k}))}return z(c)?
$("<a/>",{href:sprintf("/editConversation?conversationJid=%s&unique=true",c.jid),text:"Edit"}):""},insertTemplate:function(a){return""},editTemplate:function(a){return""},insertValue:function(){return""},editValue:function(){return""}});c.prototype=new jsGrid.Field({sorter:function(a,c){return 0},itemTemplate:function(a,c){if("importing"in c){var b=c.overallProgress.numerator,h=c.overallProgress.denominator,k=c.overallProgress.name;return $("<div/>").append($("<progress/>",{value:b,max:h,text:sprintf("%s out of %s",
b,h)})).append($("<div/>",{text:k}))}return a},insertTemplate:function(a){return""},editTemplate:function(a){return""},insertValue:function(){return""},editValue:function(){return""}});jsGrid.fields.dateField=a;jsGrid.fields.editConversationField=k;jsGrid.fields.joinConversationField=function(a){jsGrid.Field.call(this,a)};jsGrid.fields.conversationSharingField=c;g=$("#conversationsDataGrid");g.jsGrid({width:"100%",height:"auto",inserting:!1,editing:!1,sorting:!0,paging:!0,noDataContent:"No conversations match your query",
rowClick:function(a){"jid"in a.item&&!("importing"in a.item)&&(window.location.href=sprintf("/board?conversationJid=%s&unique=true",a.item.jid))},controller:{loadData:function(a){if("sortField"in a){var c=_.sortBy(n,function(c){return c[a.sortField]});w&&(c=_.filter(c,function(a){return a.author==b}));"sortOrder"in a&&"desc"==a.sortOrder&&(c=_.reverse(c));return c}return n}},pageLoading:!1,fields:[{name:"lifecycle",type:"text",title:"Lifecycle",readOnly:!0,itemTemplate:function(a,c){var b=$("<span/>");
switch(a){case "deleted":b.addClass("deletedConversationTag").text("archived");break;case "new":b.addClass("newConversationTag").text("new");break;default:b.text("")}return b}},{name:"title",type:"text",title:"Title",readOnly:!0},{name:"creation",type:"dateField",title:"Created"},{name:"author",type:"text",title:"Author",readOnly:!0},{name:"subject",type:"conversationSharingField",title:"Sharing",readOnly:!0,itemTemplate:function(a,c){var b=$("<span/>"),h=_.find(l,function(a){a=a.foreignRelationship;
return"foreignRelationship"in c&&"key"in c.foreignRelationship&&void 0!=a&&"key"in a&&"system"in a&&c.foreignRelationship.key==a.key&&c.foreignRelationship.system==a.system});"foreignRelationship"in c&&"displayName"in c.foreignRelationship?b.text(c.foreignRelationship.displayName):void 0!==h&&"foreignRelationship"in h&&"displayName"in h.foreignRelationship?b.text(h.foreignRelationship.displayName):b.text(a);return b}},{name:"edit",type:"editConversationField",title:"Edit",sorting:!1,width:30,css:"gridAction"}]});
g.jsGrid("sort",{field:"creation",order:"desc"});$("#activeImportsListing").hide();$("#importConversationInputElementContainer").hide();$("#showImportConversationWorkflow").click(function(){$("#importConversationInputElement").click()});$("#importConversationInputElement").fileupload({dataType:"json",add:function(a,c){$("#importConversationProgress").css("width","0%");$("#importConversationProgressBar").show();$("#activeImportsListing").show();c.submit()},progressall:function(a,c){var b=parseInt(c.loaded/
c.total*100,10)+"%";$("#importConversationProgressBar").css("width",b)},done:function(a,c){$.each(c.files,function(a,c){$("<p/>").text(c.name).appendTo(document.body)});$("#importConversationProgress").fadeOut()}});q=$("#conversationContainerListing");q.find(".conversationContainer").clone();q.empty();r=$("#activeImportsListing");r.find(".importContainer").clone();r.empty();a=$("#conversationSearchBox");p=$("<input/>",{type:"text",val:f});a.append(p);p.on("keyup",function(a){f=$(this).val().toLowerCase().trim();
13==a.keyCode&&t&&u(f)});$("#createConversationButton").on("click",function(){var a=sprintf("%s at %s",b,(new Date).toString());createConversation(a)});y()});var y=function(){t=!0;$("#searchButton").off("click").attr("disabled",!1).on("click",function(){u(f)})},z=function(a){return a.author==b||_.some(l,function(a){var c=a.name?a.name:a.value;return"special"==(a.key?a.key:a.ouType)&&"superuser"==c})},A=function(a){var k=a.subject.toLowerCase().trim(),c=a.title.toLowerCase().trim(),e=a.author,g=f,
d=a.foreignRelationship;return(g==e||-1<c.indexOf(g))&&("deleted"!=k||x&&e==b)&&(e==b||_.some(l,function(a){var c=a.foreignRelationship,b=a.name?a.name:a.value;(a="special"==(a.key?a.key:a.ouType)&&"superuser"==b)||void 0!==d&&"key"in d&&"system"in d&&void 0!==c&&(a=d.key==c.key&&d.system==c.system);a||(a=b.toLowerCase().trim()==k);return a}))},e=function(){var a=_.filter(_.map(d,function(a){return"result"in a&&"a"in a.result?{importing:!0,title:sprintf("%s - %s - %s","import failure",a.name,a.a),
author:a.author,jid:a.id,newConversation:!0,creation:(new Date).getTime(),overallProgress:a.overallProgress,stageProgress:a.stageProgress}:"result"in a&&"b"in a.result?(a=a.result.b,!("creation"in a)&&"created"in a&&_.isNumber(a.created)&&(a.creation=a.created,a.created=new Date(a.creation)),a.newConversation=!0,a):{lifecycle:"new",importing:!0,title:a.name,author:a.author,jid:a.id,newConversation:!0,creation:(new Date).getTime(),overallProgress:a.overallProgress,stageProgress:a.stageProgress}}),
function(a){return"importing"in a&&1==a.importing||!_.some(m,function(b){return b.jid==a.jid})}),b=(new Date).getTime()-18E5,a=_.clone(_.concat(a,_.filter(_.uniqBy(_.reverse(_.orderBy(m,"lastAccessed")),"jid"),A)));n=_.uniqBy(_.reverse(_.orderBy(_.map(a,function(a){a.lifecycle="deleted"==a.subject?"deleted":a.creation>b?"new":"available";return a}),"lastAccessed")),"jid");void 0!=g&&(g.jsGrid("loadData"),a=g.jsGrid("getSorting"),"field"in a&&g.jsGrid("sort",a));a=n;a=sprintf("%s result%s",a.length,
1==a.length?"":"s");$("#conversationListing").find(".aggregateContainer").find(".count").text(a)},u=function(a){$("#searchButton").attr("disabled",!0).off("click");t=!1;f=a.toLowerCase().trim();v();getSearchResult(f)},v=function(){if(void 0!=window&&"history"in window&&"pushState"in window.history){var a=window.location,b=f,a=sprintf("%s//%s%s",a.protocol,a.host,a.pathname);void 0!=b&&(a=sprintf("%s?query=%s",a,b));window.history.replaceState({path:a,url:a},a,a)}};return{receiveUsername:function(a){b=
a},receiveUserGroups:function(a){l=a},receiveConversationDetails:function(a){m.push(a);e()},receiveSearchResults:function(a){m=a;y();v();e()},receiveNewConversationDetails:function(a){a.newConversation=!0;m.push(a);e()},receiveImportDescription:function(a){d=_.filter(d,function(b){return b.id!=a.id});d.push(a);e()},receiveImportDescriptions:function(a){d=a;e()},receiveQuery:function(a){f=a.toLowerCase().trim();v();p.val(f);e()},getConversationListing:function(){return n},getImportListing:function(){return d},
getQuery:function(){return f},getUsername:function(){return b},getUserGroups:function(){return l},search:u,create:function(a){createConversation(a)},getUserGroups:function(){return l},getUsername:function(){return b}}}();function augmentArguments(b){b[_.size(b)]=(new Date).getTime();return b}function serverResponse(b){}function receiveUsername(b){Conversations.receiveUsername(b)}function receiveUserGroups(b){Conversations.receiveUserGroups(b)}
function receiveConversationDetails(b){Conversations.receiveConversationDetails(b)}function receiveConversations(b){Conversations.receiveSearchResults(b)}function receiveNewConversationDetails(b){Conversations.receiveNewConversationDetails(b)}function receiveImportDescription(b){Conversations.receiveImportDescription(b)}function receiveImportDescriptions(b){Conversations.receiveImportDescriptions(b)}function receiveQuery(b){Conversations.receiveQuery(b)};
