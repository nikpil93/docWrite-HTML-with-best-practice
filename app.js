// test html code to perform the document.write() method
var html = "<script async> console.log(\"the current document's compatibility mode is:\", document.compatMode); <\/script> <div id=\"test-test\"><\/div>";

// create the virtual document
function getVirtualDocument(html) {
    var parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
}

function getDecodedBodyTagElements(doc) {
    return decodeURI(doc.getElementsByTagName('body')[0].outerHTML);
}

function getDecodedHeadTagElements(doc) {
    return decodeURI(doc.getElementsByTagName('head')[0].outerHTML);
}

// the best practice for HTML documents
function templateHTML(title, headHTMLpart, bodyHTMLpart) {
    title = title || "title";
    headHTMLpart = headHTMLpart || null;
    bodyHTMLpart = bodyHTMLpart || null;

    var template = "<!doctype html>" +
        "<html lang=\"en\">" +
        "<head>" +
        "<meta charset=\"utf-8\">" +
        "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, shrink-to-fit=no\">" +
        "<title>" + title + "</title>" +
        headHTMLpart +
        "</head>" +
        "<body>" +
        bodyHTMLpart +
        "</body>" +
        "</html>";

    return template;
}

// perform docWrite on an iframe
function writeHTMLInIframe(iframe) {
    var doc = iframe.contentWindow.document;
    var virtualDoc = getVirtualDocument(html);

    try {
        doc.open();
        doc.write(templateHTML("test_container", getDecodedHeadTagElements(virtualDoc), getDecodedBodyTagElements(virtualDoc)));
        doc.close();
    } catch (err) {
        console.log("error:", err);
    }
}

// write the iframe in DOM
function writeOnDOM(doc, element) {
    doc.body.appendChild(element);
}

// the iframe where we perform docWrite 
function createIframeElement(id) {
    var iframe = document.createElement('iframe');
    iframe.id = id;
    iframe.style.border = 'none';
    iframe.style.display = 'none';
    return iframe;
}

var ifr = createIframeElement("test_iframe");
writeOnDOM(document, ifr);
writeHTMLInIframe(ifr);
