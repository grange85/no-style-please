var this_script = document.getElementById("comment-script");
var sectionid = this_script.getAttribute('data-sectionid');
var sitename = this_script.getAttribute('data-sitename');

document.getElementById("comment-section").innerHTML = sectionid;

initComments({
    node: document.getElementById("comment-section"),
    defaultHomeserverUrl: "https://matrix.cactus.chat:8448",
    serverName: "cactus.chat",
    siteName: sitename,
    commentSectionId: sitename + "-" + sectionid
  })
