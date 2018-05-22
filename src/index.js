import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

function DataOfNode(name, id, type, configOpt) {
	this.name = name;
	this.id = id;
	this.type = type;
	this.configOpt = configOpt;
}

function Node(data) {
	this.data = data;
	this.parent = null;
	this.children = [];
}

function Tree(data) {
	var node = new Node(data);
	this._root = node;
}

Tree.prototype.add = function(name, id, type, configOpt, parent) {
	var data = new DataOfNode(name, id, type, configOpt);
    var newNode = new Node(data);
    newNode.parent = parent;
    newNode.parent.children.push(newNode);
};

Tree.prototype.addNode = function(data, parent) {
	for (var i=0; i<data.length; i++) {
		if (data[i].config != null) {
			this.add(data[i].name, data[i].id, data[i].type, data[i].config.options.url, parent);
		} else {
			this.add(data[i].name, data[i].id, data[i].type, data[i].config, parent);
		}
		if (data[i].layers != null) {
			this.addNode(data[i].layers, parent.children[i]);
		}
	}
}

Tree.prototype.changeRoot = function(name, id, type, configOpt) {
	this._root.data.name = name;
	this._root.data.id = id;
	this._root.data.type = type;
	this._root.data.configOpt = configOpt;
}

var tree = new Tree(new DataOfNode("root", 1, null, null));
var req = new XMLHttpRequest();
req.open('GET', 'http://gptl.ru/api/map/public/maps.json');
req.onload = function() {
	var data = JSON.parse(req.responseText);
	var start = data[0].templates[0];
	tree.changeRoot(start.name, start.id, start.type, start.config);
	start = data[0].templates[0].layers;
	tree.addNode(start, tree._root);
	ReactDOM.render(<App data={tree._root}/>, document.getElementById('root'));
	registerServiceWorker();
};
req.send();