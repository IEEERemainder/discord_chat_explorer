let history_ = [];
let edited=[{}];
let alpha="abcdefghijklmnopqrstuvwxyz";
let autoincrementId = 1;

init();

function init() {
	registerEventListeners();
	adjustMainAreaHeigth();
}

function registerEventListeners() {
	document.addEventListener('keydown', function(event) {
		if (event.code == 'Delete') {
			let col = qsa('#select').item(0).selectedOptions;
			history_.push(Array.from(col, x => x.id));
			let editedThisAct = {}
			for (el of col) {
				editedThisAct[el.id] = el.innerText;
				el.innerText = "[deleted]";
			}
			edited.push(editedThisAct);
			event.preventDefault();
		}
		else if (event.ctrlKey || event.metaKey) {
			switch (event.code) {
				case 'KeyZ': {
					if (history_.length == 0) 
						return;
					let editedThisAct = edited.pop();
					for (id of history_.pop()) {
						let el = document.getElementById(id); 
						el.innerText = editedThisAct[id]; 
					}
					break;
				}
				case 'KeyC': {
					let col = qsa('#select').item(0).selectedOptions;
					copyToClipboard(Array.from(col, x => x.innerText).join('\n'));
					break;
				}
				case 'KeyE': {
					let col = qsa('#select').item(0).selectedOptions;
					let el = col[0];
					let oldText = el.innerText;
					let newText = window.prompt("Change option text:", oldText);
					if (newText != oldText) {
						history_.push([el.id]);
						edited.push({[el.id] : oldText});
						el.innerText = newText;
					}
					break;
				}
				default:
					return;
			}
			event.preventDefault();
		}
	});

	qs("#debugAppend100Btn").addEventListener('click', function() {
		let el = qs('#s1');
		el.innerText += randomstring(100);
	});

	qs("#debugNew100Btn").addEventListener('click', function() {
		let el = qs('#select');
		for (let i = 0; i < 100; i++) {
			let el2 = document.createElement('option');
			el2.innerText = randomstring(20);
			el2.id = "s" + autoincrementId;
			autoincrementId++;
			el.appendChild(el2);
		}
	});

	qs("#sizePlusBtn").addEventListener('click', function() {
		let el = qs('#select');
		el.size=el.size+1;
	});

	qs("#sizeMinusBtn").addEventListener('click', function() {
		let el = qs('#select');
		el.size=el.size-1;
	});

	qs("#searchBtn").addEventListener('click', function() {
		let el = qs('#select').children;
		let rgx = new RegExp(qs("#searchInput").value, qs("#flagsInput").value);
		for (let i = 0; i < el.length; i++) 
			el[i].selected = !!rgx.exec(el[i].value);
	});

	qs("#replaceBtn").addEventListener('click', function() {
		let els = qs('#select').children;
		let rgx = new RegExp(qs("#searchInput").value, qs("#flagsInput").value);
		let replace=qs("#replacementInput").value;
		let ids=[];
		let values=[];
		for (let i = 0; i < els.length; i++) {
			let el = els[i];
			let m = !!rgx.exec(el.value);
			el.selected = m;
			if (m) {
				ids.push(el.id);
				values.push(el.innerText);
				el.innerText = el.innerText.replace(rgx, replace);
			}
		}
		if (ids) {
			history_.push(ids);
			let editedThisAct = {}
			for (let i = 0; i < ids.length; i++)
				editedThisAct[ids[i]] = values[i]; 
			edited.push(editedThisAct);
		}
	});

	qs("#clearHistoryBtn").addEventListener('click', function() {
		history_ = [];
		edited = [{}];
	});

	qs("#loadBtn").addEventListener('click', function() {
		oldScr=qs("#dataScript");
		if (oldScr) 
			document.body.removeChild(oldScr);
		scr = document.createElement("script");
		scr.src = qs("#dataScriptInput").value + ".data.js";
		scr.id = "dataScript";
		scr.onload = processData;
		document.body.appendChild(scr);
	});

	qs("#hideBtn").addEventListener('click', function() {
		let els = qs('#select').children;
		for (let i = 0; i < els.length; i++) {
			let el = els[i];
			if (el.selected)
				el.classList.add("h");
		}
	});

	qs("#unhideAllBtn").addEventListener('click', function() {
		let els = qs('#select').children;
		for (let i = 0; i < els.length; i++) {
			let el = els[i];
			el.classList.remove("h");
		}
	});

	qs("#invertSelectionBtn").addEventListener('click', function() {
		let els = qs('#select').children;
		for (let i = 0; i < els.length; i++) {
			let el = els[i];
			el.selected = !el.selected;
		}
	});

	qs("#saveBtn").addEventListener('click', function() {
		let fileName = qs("#dataScriptInput").value + ".data.js";
		let newData = [];
		let els = qs('#select').children;
		for (let i = 0; i < els.length; i++) {
			let el = els[i];
			if (el.selected)
				newData.push(el.value);
		}
		save(fileName, "DATA = " + JSON.stringify(newData) + ";");
	});
}

function adjustMainAreaHeigth(padding=0) {
	var body = document.body,
		html = document.documentElement;
	var height = Math.max( body.scrollHeight, body.offsetHeight,
                       html.clientHeight, html.scrollHeight, html.offsetHeight );
	qs("#select").size = Math.floor((height - 40) / (16+padding)) - 1;
}

// utils

function copyToClipboard(text) {
	window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function qs(s) { 
	return document.querySelector(s); 
}

function qsa(s) {
	return document.querySelectorAll(s); 
}

function wrapText(text, maxlength) {    
	var resultText = [];
	var len = text.length;    
	if (maxlength >= len) {
		return [text];
	}
	else {
		var totalStrCount = parseInt(len / maxlength);
		if (len % maxlength != 0) {
			totalStrCount++
		}

		for (var i = 0; i < totalStrCount; i++) {
			if (i == totalStrCount - 1) {
				resultText.push(text);
			}
			else {
				var strPiece = text.substring(0, maxlength - 1);
				resultText.push(strPiece);
				text = text.substring(maxlength - 1, text.length);
			}
		}
	}
	return resultText;
}

function processData() {
	autoincrementId = 1;
	let el = qs("#select");
	el.innerHTML = "";
	let mainAreaWidth=qs("#select").clientWidth;
	//let px = Math.floor(window.innerWidth * 0.85 - 8*2 - 4); // CSS don't allow to worc with option cuz it's OS-dependant
	//console.log(px);
	let wrap = Math.floor(window.innerWidth * 0.85 / 7.2);
	for (let msg of DATA) {
		let msgParts = wrapText(msg, wrap); // TODO: Add visualLength support
		let el2 = document.createElement('option');
		el2.innerText = msgParts[0];
		el2.id = "s" + autoincrementId;
		autoincrementId++;
		el.appendChild(el2);
		for (var i = 1; i < msgParts.length; i++)
		{
			let el3 = document.createElement('option');
			el3.innerText = "<...> " + msgParts[i];
			el3.id = "s" + autoincrementId;
			autoincrementId++;
			el.appendChild(el3);
		}
		/*let processedLen = msgParts[0].length;
		while (msgParts[1] > 0) {
			msgParts = trimToPx(msg.substring(processedLen), px);
			processedLen += msgParts[0].length;
			let el3 = document.createElement('option');
			el3.innerText = " " + msgParts[0];
			el3.id = "s" + autoincrementId;
			autoincrementId++;
			el.appendChild(el3);
		}*/
	}
	adjustMainAreaHeigth(1);
	history_ = [];
	edited = [{}];
}

function save(filename, data) {
	const blob = new Blob([data], {type: 'text/csv'});
	if (window.navigator.msSaveOrOpenBlob) {
		window.navigator.msSaveBlob(blob, filename);
	}
	else {
		const elem = window.document.createElement('a');
		elem.href = window.URL.createObjectURL(blob);
		elem.download = filename;        
		document.body.appendChild(elem);
		elem.click();        
		document.body.removeChild(elem);
	}
}

function randomstring(l) {
	return Array.from(Array(l).keys(), x => alpha[getRandomInt(0, 27)]).join(''); 
}

function visualLength(s)
{
    var ruler = qs("#ruler");
    ruler.innerHTML = s;
    return ruler.offsetWidth;
}

lengths={};

function trimToPx(s, length) {
    var tmp = s;
    var trimmed = s;
	for (ch of [... new Set(s)])
		lengths[ch] = visualLength(ch);
	let minus = 0;
    if (visualLength(tmp) > length) {
        trimmed += " ";
		visualLen=visualLength(trimmed);
		for (let i = s.length - 1; i > 0 && visualLen > length; i++, minus++)
			visualLen -= lengths[s[i]];
        tmp = tmp.substring(0, tmp.length-minus);
        trimmed = tmp + " ";
    }
    return [trimmed, minus];
}
