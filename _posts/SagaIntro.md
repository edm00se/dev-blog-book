# Intro

This is a demo application I created as the result of an interesting set of circumstances surrounding my 2015 IBM ConnectED session/chalk talk. It's purpose is to provide a place to illustrate the many topics related in application layering, design, and development practices that I've blogged about. This app, my App of Ice and Fire, so named after [George R. R. Martin's A Song of Ice and Fire](http://www.amazon.com/s/ref=nb_sb_ss_c_0_10?url=search-alias%3Dstripbooks&field-keywords=a+song+of+ice+and+fire&sprefix=a+song+of+ice+and+fire%2Caps%2C188), contains a couple different data sets which are topically pulled from public sources regarding subjects from the book series.

### Structure
The application is in two layers, which has numerous advantages.

#### Back-End
The back-end to the applicaiton is a Domino/XPages NSF, which has traditional Notes documents with Forms and Views. These are exposed via some Java HTTPServlets (specifically *DesignerFacesServlet*s which gives us _FacesContext_, ergo authenticated Notes Session, access), which interact with a proper Java data model for each resource type. The servlets provide a RESTful API with _application/json_ content, using Google's GSON library to both generate the JSON and reflect the received data from the client app (via POST and PUT requests) into their respective data model instances.

#### Front-End
The front-end to this application is an AngularJS application, using ui-router. The layout is a fairly standard Bootstrap 3 layout with Font Awesome added. In nearly every way, the front-end application has no direct Domino dependencies, other than the RESTful APIs, which can be easily mocked for front-end development purposes via freely available (and open source) tools, such as [json-server](https://github.com/typicode/json-server); covered in a blog post called ["alternative front-end development"](https://edm00se.io/front-end/alternate-front-end-development).