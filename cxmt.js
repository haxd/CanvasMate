$(function() {
	var cm = null;

	$('.editor').each(function() {
		var text = $(this).html();
		var $et;
		var $cx;
			
		$(this).html('');

		$(this).append(
			$et = $('<div />')
			.addClass('editor-text')
			.append(text)
		);

		$(this).append(
			$cx = $('<canvas />').addClass('cxmt')
		);

		cm = new CanvasMate(initCanvas($cx.get(0)));
		var text = text + '\n';
		text += '\nHow do you do?\n\n';

		text += 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n';
		text += 'Sed sit amet nisi eget odio vehicula gravida eu ut nunc.\n';
		text += 'Curabitur accumsan metus quis nulla dictum vitae fringilla sem iaculis.\n';
		text += 'Aliquam eu massa arcu, mollis tempus lorem. ';
		text += 'Phasellus adipiscing massa sed mauris pellentesque ac ornare est euismod. ';
		text += 'Mauris mattis molestie tortor, ut eleifend dui ornare in.\n';
		text += 'Donec quis dui a ipsum auctor condimentum.\n';
		text += 'Sed eu felis ac mi vulputate posuere.\n';
		text += 'Fusce bibendum enim non ante fringilla tincidunt.\n';
		text += 'Phasellus quis sem at diam rhoncus tempus ac interdum quam.\n';
		text += 'Pellentesque nec tellus ac elit fermentum interdum.\n';
		text += 'Proin sit amet purus mi, sit amet laoreet odio.\n';
		text += 'Curabitur sollicitudin ipsum eu felis gravida fringilla.\n';
		text += 'Praesent aliquam risus id risus volutpat ultricies ut euismod dolor.\n';
		text += 'Sed sit amet leo ut ligula venenatis facilisis viverra et ipsum.\n';
		text += 'Duis vitae tellus vitae nunc luctus fermentum.\n';
		text += 'Nunc id nisi in magna rutrum molestie semper vulputate nisl.\n';
		text += 'Proin porta metus vel metus accumsan ultrices nec sed lacus.\n';
		text += 'Curabitur venenatis ipsum ac lacus dapibus nec varius neque porta.\n';
		text += 'Sed ut lectus eget velit rhoncus vulputate.\n';
		text += 'Maecenas ac est vel eros tristique tristique vitae pretium risus.\n';
		text += 'Sed eu sapien nulla, ac dapibus nisi.\n';
		text += 'Curabitur mattis lobortis lacus, id laoreet eros iaculis nec.\n';
		text += 'Curabitur vel ante placerat tellus facilisis pharetra.\n';
		text += 'Fusce tincidunt elit id erat laoreet tempor.\n';
		text += 'Quisque placerat scelerisque nunc, suscipit ornare odio elementum ut.\n';
		text += 'Phasellus sed eros risus, sed gravida est.\n';
		text += 'Aliquam fermentum urna et nulla consequat ac sollicitudin neque sodales.\n\n';

		text += 'if (this.$lineNumbers == true) {\n';
		text += '  var lnw = this.context.measureText(st.length.toString()+\' \');\n';
		text += '  var last = this.switchStyle(\'#000000\');\n';
		text += '  this.context.fillRect(0, 0, lnw.width, this.canvas.height);\n';
		text += '  this.switchStyle(last);\n';
		text += '  this._margin[0] = lnw.width;\n';
		text += '} else {\n';
		text += '  this._margin[0] = 0;\n';
		text += '}';

		cm.text = text;

		cm.height = "600";
	});

	$('#ln').click(function() {
		cm.lineNumbers = $(this).attr('checked');
	});

	$('.width').click(function() {
		if ($(this).attr('checked')) {
			JSTweener.addTween(cm, {
				width: $(this).val(),
				time: 0.5,
				transition: 'linear'
			});
		}
	});
});

function initCanvas(canvas) {
  if (window.G_vmlCanvasManager && window.attachEvent && !window.opera) {
    canvas = window.G_vmlCanvasManager.initElement(canvas);
  }

  return canvas;
}


function CanvasMate(canvas) {
	this.canvas = canvas;
	this.context = canvas.getContext('2d');

	for (var prop in this) {
		if (prop.charAt(0) == "$") {
			this.__defineGetter__(prop.substring(1), function(prop, context) {
				return function() {
					return context[prop];
				};
			}(prop, this));

			this.__defineSetter__(prop.substring(1), function(prop, context) {
				return function(val) {
					context[prop] = val;
					context.update();
				};
			}(prop, this));
		}
	}

	this.update();
}

CanvasMate.prototype = {
	canvas: null,
	context: null,

	_margin: [0, 2],

	$width: '700',
	$height: '300',
	$font: 'Liberation Mono, Dejavu Sans Mono',
	$fontSize: '11px',
	$backgroundColor: '#262626',
	$foregroundColor: '#ffffff',
	$text: '',
	$lineNumbers: false,
	$syntax: false,

	switchStyle: function(style) {
		var last = this.context.fillStyle;
		this.context.fillStyle = style;
		return last;
	},

	goingToWrap: function(text) {
		var lineLength = this.context.measureText(text).width;
		return (lineLength + this._margin[0]) > this.canvas.width;
	},

	update: function() {
		var lb = "\n";
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		$(this.canvas).css({
			'background-color': this.$backgroundColor,
		});

		$(this.canvas).attr('width', this.$width);
		$(this.canvas).attr('height', this.$height);

		this.context.fillStyle = this.$foregroundColor;
		this.context.font = this.$fontSize + ' ' + this.$font;

		if (this.$text.length > 0) {
			var st = this.$text.split(lb);

			if (this.$lineNumbers == true) {
				var lnw = this.context.measureText(st.length.toString()+' ');
				var last = this.switchStyle('#000000');		
					this.context.fillRect(0, 0, lnw.width, this.canvas.height);
				this.switchStyle(last);
				this._margin[0] = lnw.width;
			} else {
				this._margin[0] = 0;
			}

			var c = 0;
			var lineHeight = parseInt(this.$fontSize)+this._margin[1];

			for (var i = 0; i < st.length; i++) {
			  c += lineHeight;

				if (this.$lineNumbers == true) {
					var pad = st.length.toString().length - i.toString().length;
					var spc = "";

					for (var j = 0; j < pad; j ++) spc += ' ';

					var last = this.switchStyle('rgba(255,255,255,0.5)');
						this.context.fillText(spc + i.toString(), 0, c);
					this.switchStyle(last);
				}

				var t = this._margin[0];
				var words = st[i].split(' ');

				for (var j = 0; j < words.length; j++) {
					if (j < words.length) words[j] += ' ';
					var wow = this.context.measureText(words[j]).width;

					this.context.fillText(words[j], t, c);

					t += wow;
					
					if (j < words.length-1)
					if (t + this.context.measureText(words[j+1]).width > this.canvas.width) {
						t = this._margin[0];
						c += lineHeight;
					}
				}

				var cursor = {x: 0, y: 0, sel: 0};

				cursor.x = 5;
				cursor.y = 10;
				cursor.sel = 20;

				function getX(context, str, col, len) {
					return context.measureText(str.substring(col, col+len)).width;
				}

				if (i == cursor.y) {
					this.context.globalCompositeOperation = 'xor';

					var last = this.switchStyle('#ffffff');

					var x = this.context.measureText(st[i].substr(0, cursor.x)).width;
					var y = c-(lineHeight);
					var w = this.context.measureText(st[i].substr(cursor.x, cursor.sel)).width;
					var h = lineHeight;
					console.log(st[i].substr(cursor.x, cursor.sel));
					console.log(x,y,w,h);

					console.log(cursor);

					this.context.fillRect(this._margin[0]+x,y+3,w,h);

					this.context.globalCompositeOperation = 'source-over';

					this.switchStyle(last);
				}
			}
		}
	}
};
