;(function() {
	'use strict';

	var type = function(obj) {
		return Object.prototype.toString.call(obj).replace("[object ", "").replace("]", "");
	}

	if(type(Array.prototype.indexOf) === "Undefined") {
		Array.prototype.indexOf = function(e) {
			for(var i=0, len=this.length; i<len; i++) {
				if(i === e) return i;
			}
			return -1;
		}
	}

	Array.prototype.contains = function(e) {
		return this.indexOf(e) !== -1;
	}

	Array.prototype.nativesortby = function(attr) {
		var dynamicSort = function(attr) {
			 var sortOrder = 1;
			if(attr[0] === "-") {
				sortOrder = -1;
				attr = attr.substr(1, attr.length - 1);
			}
			return function (a,b) {
				var result = (a[attr] < b[attr]) ? -1 : (a[attr] > b[attr]) ? 1 : 0;
				return result * sortOrder;
			}
		}
		return this.sort(dynamicSort(attr)); 
	}

	Array.prototype.bubblesortby = function(attr, func) {
		var len=this.length, i, j, stop, temp;
		for(i=0; i<len; i++) {
			for(j=0, stop=len-i-1; j<stop; j++) {
				if(this[j][attr] > this[j+1][attr]) {
					temp = this[j];
					this[j] = this[j+1];
					this[j+1] = temp;
				}
			}
		}
		return this; 
	}

	Array.prototype.remove = function(e) {
		return this.slice(index, 1); 	
	}

	Array.prototype.unique = function(sorted) {
		var list = [];
		if(sorted) {
			this.each(function(e) {
				if(list.last !== e) { list.push(e); }
			})
		} else {
			this.each(function(e) {
				if(!list.contains(e)) { list.push(e); }
			})
		}

		return list;
	}

	Array.prototype.add = function(e) {
		if(!this.contains(e)) this.push(e);
	}

	Array.prototype.quicksort = function() {
	}

	Array.prototype.bubblesort = function() {
		var len=this.length, i, j, stop, temp;
		for(i=0; i<len; i++) {
			for(j=0, stop=len-i-1; j<stop; j++) {
				if(this[j] > this[j+1]) {
					temp = this[j];
					this[j] = this[j+1];
					this[j+1] = temp;
				}
			}
		}
		return this; 
	}

	Array.prototype.pluck = function(attr) {
		return this.map(function(e) {
			return e[attr];
		});
	}

	Array.prototype.average = function() {
		return this.sum() / this.length;
	}

	Array.prototype.pop = function() {
		return this.splice(this.length-1, 1)[0];
	}

	Array.prototype.drop = function() {
		this.splice(this.length-1, 1);
	}

	Array.prototype.map = function(fn) {
		var list = [];
		this.each(function(e) {
			list.push(fn(e));
		})
		return list;
	}

	Array.prototype.sum = function() {
		var sum = 0;
		this.each(function(e) {
			sum += +e;
		});
		return sum;
	}

	Array.prototype.product = function() {
		var prod = 1;
		this.each(function(e) {
			prod *= +e;
		});
		return prod;
	}

	Array.prototype.foldl = function(fn, memo) {
		this.each(function(e) {
			memo = fn(memo, e);
		})
		return memo;
	}

	Array.prototype.reduce = Array.prototype.foldl;

	Array.prototype.each = function(fn) {
		for(var i=0, len=this.length; i<len; i++) {
			fn(this[i]);
		}
	}

	Array.prototype.eachwithindex = function(fn) {
		for(var i=0, len=this.length; i<len; i++) {
			fn(this[i], i);
		}
	}

	Array.prototype.search = function(fn) {
		var matches = [];
		this.each(function(e) {
			if(fn(e)) {
				matches.push(e);
			}
		})
		return matches;
	}

	Array.prototype.filter = Array.prototype.search;

	Array.prototype.last = function() {
		return this[this.length-1];
	}

	Array.prototype.outnested = function(attr) {
		var obj = {};
		this.pluck(attr).each(function(att) {
			obj[att] = [];
		})
		this.each(function(e) {
			obj[e[attr]].push(e);
		})
		return obj;
	}

	Array.prototype.outternested = Array.prototype.outnested;

	Array.prototype.tail = function() {
		if(this.length === 0) return [];
		if(this.length === 1) return this.slice(1);
		return this.slice(1, this.length);
	}

	Array.prototype.head = function() {
		return this[0];
	}

	Array.prototype.max = function(sorted) {
		if(this.length === 0) return void 0;
		if(this.length === 1) return this.head;

		if(sorted) {
			return this.last();
		} else {
			return this.reduce(function(a, b) { return b > a? b : a }, this.head());
		}
	}


	var Fnc = {};

	Fnc.innernested = function(obj) {
		var list = [];
		for(var key in obj) {
			if(obj.hasOwnProperty(key)) {
				list.push({
					key: key,
					values: obj[key]
				})	
			}
		}
		return list;
	}

	Fnc.innested = Fnc.innernested;

	window.Fnc = Fnc;

})(); 

window.objs = [
	{name: "foo", status:"going"},
	{name: "bar", status:"going"},
	{name: "tuu", status:"going"},
	{name: "baz", status:"waiting"},
	{name: "tor", status:"waiting"}
];
