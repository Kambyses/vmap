define(["require","jquery","Class","baseLayers"],function(e){"use strict";function t(){n.apply(this),this.element=s(".sidebar"),s("[name='toggle-sidebar']").click(this.toggle.bind(this)),this.element.append(i.element)}var s=e("jquery"),n=e("Class"),i=e("baseLayers");return t.prototype={toggle:function(){this.element.toggleClass("hidden")}},new(n.extend(t))});