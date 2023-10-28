let h = 70;

let data;

fetch("./data.json")
	.then((res) => res.json())
	.then((json) => {
		data = json;
		dataEntry();
	});

function dataEntry() {
	let days = data.map((d) => d.day);
	let now =
		days[
			new Date().getDay() - 1 < 0 ? days.length - 1 : new Date().getDay() - 1
		];
	console.log(now);
	let svg = d3
		.select(".contain")
		.append("svg")
		.attr("viewBox", `0 0 100 ${h}`)
		.attr("preserveAspectRatio", "xMinYMin");
	svg
		.selectAll("rect")
		.data(data)
		.enter()
		.append("rect")
		.attr("width", "12px")
		.attr("height", (d) => Math.ceil(d.amount))
		.attr("x", (d, i) => i * 14)
		.attr("y", (d) => h - Math.ceil(d.amount) - 10)
		.attr("class", (d) => d.day)
		.attr("fill", "hsl(10, 79%, 65%)")
		.attr("rx", 3)
		.attr("ry", 3)
		.attr("onmouseover", (d, i) => `mouseOver('text${i}')`)
		.attr("onmouseout", (d, i) => `mouseOut('text${i}')`)
		.text((d) => "$ " + d.amount);
	svg.select(`.${now}`).attr("fill", "hsl(186, 34%, 60%)");
	svg
		.selectAll("text")
		.data(data)
		.enter()
		.append("text")
		.attr("x", (d, i) => i * 14.5)
		.attr("font-size", "5px")
		.attr("y", (d) => h - 5)
		.text((d) => d.day)
		.attr("fill", "hsl(28, 10%, 53%)");
	let g = svg.append("g");
	g.selectAll("text")
		.data(data)
		.enter()
		.append("text")
		.attr("x", (d, i) => i * 14)
		.attr("font-size", "3.3px")
		.attr("y", (d) => h - Math.ceil(d.amount) - 12)
		.text((d) => "$ " + d.amount)
		.attr("fill", "hsl(28, 10%, 53%)")
		.attr("class", (d, i) => `text${i}`)
		.style("display", "none");
}

function mouseOver(val) {
	document.getElementsByClassName(val)[0].style.display = "block";
}

function mouseOut(val) {
	document.getElementsByClassName(val)[0].style.display = "none";
}
