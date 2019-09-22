import riot from 'riot';

import './tags/homepage.tag';
import './tags/signin.tag';
import route from 'riot-route';

route.base("/")
route("/home", () => {
const homePage = riot.mount("div#root", "homepage");

});

route("/signin", () => {
const signin = riot.mount("div#root", "signin"); 
    
})

route.start(true)

