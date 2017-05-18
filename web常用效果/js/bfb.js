$(window).load(function(){	
	var i=0;
	$(".schedule div").each(function() {
		var pan=$(this);
		$(this).attr("id","#schedule"+i);
		var pans=$(this).attr("id");
		var val=pan.children("span").html();
		pan.children("span").html(val+"<a>%</a>");
		var pannum=parseFloat(pan.css("width"));
        var r = Raphael(pans, pannum, pannum),
        R = 46,
        init = true,
        param = {stroke: "#fff", "stroke-width":7},
        hash = document.location.hash,
        marksAttr = {fill: hash || "#444", stroke: "none"};
		i++;
    	r.customAttributes.arc = function (value, total, R) {
        var alpha = 360 / total * value,
            a = (90 - alpha) * Math.PI / 180,
            x = pannum/2 + R * Math.cos(a),
            y = pannum/2 - R * Math.sin(a),
            color = "#00aacc",
            path;
            path = [["M", pannum/2, pannum/2 - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
        return {path: path, stroke: color};
    };

    var sec = r.path().attr(param).attr({arc: [0, 50, R]});
    function updateVal(value, total, R, hand) {
            hand.animate({arc: [value, total, R]}, 900, ">");
    }
	
    (function () {
        updateVal(val, 100, R, sec);
    })();
    });	
});
