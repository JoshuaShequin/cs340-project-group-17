(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['findtests'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = container.invokePartial(lookupProperty(partials,"findTestColumn"),depth0,{"name":"findTestColumn","data":data,"indent":"\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<script src=\"findTestColumnTemplate.js\" charset=\"utf-8\" defer></script>\r\n<script src=\"findtests.js\" charset=\"utf-8\" defer></script>\r\n<script src=\"https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.runtime.js\"></script>\r\n\r\n<div class=\"page-title\">\r\n	<span>\r\n		Find Tests\r\n	</span>\r\n</div>\r\n\r\n<div class=\"page-content\">\r\n\r\n	<div class=\"find-color-selection\">\r\n\r\n		<span>Test ID: </span><input id=\"test-id-search-input-box\" type=\"text\"></input>\r\n		<span>Summary: </span><input id=\"test-summary-search-input-box\" type=\"text\"></input>\r\n		<span>Number of Questions: </span><input id=\"test-number-of-questions-search-input-box\" type=\"text\"></input>\r\n		<span>Name: </span><input id=\"test-name-search-input-box\" type=\"text\"></input>\r\n		<span>Username: </span><input id=\"test-username-search-input-box\" type=\"text\"></input>\r\n\r\n\r\n		<button type=\"button\" id=\"find-tests-button\">Search</button>\r\n		<button type=\"button\" id=\"find-recent-tests-taken-button\">Recent Tests Taken</button>\r\n		<button type=\"button\" id=\"find-recent-tests-made-button\">Recent Tests Made</button>\r\n\r\n\r\n\r\n	</div>\r\n	<section id=\"find-tests-results\">\r\n		<table id=\"find-test-table\" stype=\"width:100%\">\r\n			<caption>Tests Found</caption>\r\n		<tr>\r\n			<th>Test ID</th>\r\n			<th>Summary</th>\r\n			<th>Number of Questions</th>\r\n			<th>Name</th>\r\n			<th>Username</th>\r\n		</tr>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"findTest") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":44,"column":2},"end":{"line":46,"column":11}}})) != null ? stack1 : "")
    + "		</table>\r\n		\r\n	</section>\r\n\r\n</div>\r\n";
},"usePartial":true,"useData":true});
})();