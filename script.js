$(document).ready(function()
{
	var delay = 500;
	var dataDelay = 0;
	var horizontal = 59;
	var vertical = 86;

	var panes = $('.pane');
	var paneCount = 6;
	var paneActive = 0;

	panes.hide();
	$(panes.get(paneActive)).fadeIn('slow');
	checkWhichPane(paneActive, horizontal, vertical, delay, dataDelay);

	$('.go-left').click(function()
	{
		if(paneActive - 1 < 0)
			paneActive = paneCount;
		else paneActive--;

		panes.fadeOut('slow');
		$(panes.get(paneActive)).fadeIn('slow');

		checkWhichPane(paneActive, horizontal, vertical, delay, dataDelay);
	})

	$('.go-right').click(function()
	{
		if(paneActive + 1 > paneCount)
			paneActive = 0;
		else paneActive++;

		panes.fadeOut('slow');
		$(panes.get(paneActive)).fadeIn('slow');

		checkWhichPane(paneActive, horizontal, vertical, delay, dataDelay);
	})

	$('.reset').click(function()
	{
		location.reload();
	})
})

function checkWhichPane(paneActive, horizontal, vertical, delay, dataDelay)
{
	if(paneActive == 0)
		raid_0(horizontal, vertical, delay, dataDelay);
	if(paneActive == 1)
		raid_1(horizontal, vertical, delay, dataDelay);
	if(paneActive == 2)
		raid_2(horizontal, vertical, delay, dataDelay);
	if(paneActive == 3)
		raid_3(horizontal, vertical, delay, dataDelay);
	if(paneActive == 4)
		raid_4(horizontal, vertical, delay, dataDelay);
	if(paneActive == 5)
		raid_5(horizontal, vertical, delay, dataDelay);
	if(paneActive == 6)
		raid_6(horizontal, vertical, delay, dataDelay);
}

function slideRight(node, distance, delay)
{
	setTimeout(function()
	{
		$(node).css('margin-left', distance + 'px');
	}, delay);
}

function slideDown(node, distance, delay)
{
	setTimeout(function()
	{
		$(node).css('margin-top', distance + 'px');
	}, delay);
}

function shrinkNode(node, delay)
{
	setTimeout(function()
	{
		$(node).css('width', '10px');
	}, delay);
}

function expandNode(node, delay)
{
	setTimeout(function()
	{
		$(node).css('width', '60px');
	}, delay);
}

function runDataNode(node, distance, delay)
{
	setTimeout(function()
	{
		slideRight(node, distance, 0);
		shrinkNode(node, 500);
	}, delay);
}

function runReadDataNode(node, distance, delay)
{
	setTimeout(function()
	{
		$(node).css('width', '80px');
	}, delay - 500);
	setTimeout(function()
	{
		slideRight(node, distance, 0);
	}, delay);
}

function runNode(node, delay, horizontal, vertical)
{
	setTimeout(function()
	{
		expandNode(node, 0);
		slideRight(node, horizontal, 0);
		slideDown(node, vertical, 1000);
	}, delay);
}

function runReadNode(node, horizontal, vertical, delay)
{
	setTimeout(function()
	{
		slideDown(node, vertical, 0);
		slideRight(node, horizontal, 1000);
		shrinkNode(node, 2000);
	}, delay);
}

function placeNode(node, horizontal, vertical)
{
	slideRight(node, horizontal, 0);
	slideDown(node, vertical, 0);
	expandNode(node, 0);
}

function runRAID2Node1(node, delay, endCoord)
{
	setTimeout(function()
	{
		expandNode(node, 0);
		slideRight(node, 240, 0);
		slideDown(node, -50, 1000);
		slideRight(node, 695, 2000);
		slideDown(node, 0, 3000);
		slideRight(node, 577, 4000);
		slideDown(node, endCoord, 5000);
	}, delay);
}

function runRAID2Node2(node, delay, endCoord)
{
	setTimeout(function()
	{
		expandNode(node, 0);
		slideRight(node, 240, 0);
		slideDown(node, -50, 1000);
		slideRight(node, 695, 2000);
		slideDown(node, endCoord, 3000);
	}, delay);
}

function runRAID2Node3(node, delay, endCoord)
{
	setTimeout(function()
	{
		expandNode(node, 0);
		slideRight(node, 240, 0);
		slideDown(node, -50, 1000);
		slideRight(node, 695, 2000);
		slideDown(node, 0, 3000);
		slideRight(node, 812, 4000);
		slideDown(node, endCoord, 5000);
	}, delay);
}

function runRAID3Nodes(node, delay, endCoord)
{
	setTimeout(function()
	{
		expandNode(node, 0);
		slideRight(node, 245, 0);
		slideDown(node, -50, 1000);
		slideRight(node, 577, 2000);
		slideDown(node, endCoord, 3000);
	}, delay);
}

function raid_0(h, v, d, dd)
{
	var nodes = $('.node', '#raid-0');
	var dataNodes = $('.data-node', '#raid-0');

	var write = function ()
	{
		var horizontal = h;
		var vertical = v;
		var delay = d;
		var dataDelay = dd;
		$.each(dataNodes, function( index, value )
		{
			runDataNode(value, 145, dataDelay);
			dataDelay+= 1000;
		});

		$.each(nodes, function( index, value )
		{
			runNode(value, delay, horizontal, vertical);

			delay += 500;

			if((index+1) % 4 == 0 && index != 0)
			{
				horizontal = 59;
				vertical += 26;
			}
			else horizontal += 117;
		});
	};

	var read = function()
	{
		var horizontal = h;
		var vertical = v;
		var delay = dd;
		var dataDelay = d*4;
		$.each(nodes, function( index, value )
		{
			runReadNode(value, 0, 0, delay);

			delay += 500;
		});
		
		$.each(dataNodes, function( index, value )
		{
			runReadDataNode(value, 0, dataDelay);
			dataDelay += 1000;
		});
	};

	$('#start', '#raid-0').click(function()
	{
		if($(this).text() == 'READ')
		{
			read();
			$(this).text('WRITE');
		} else if($(this).text() == 'WRITE')
		{
			write();
			$(this).text('READ');
		}
	})
}

function raid_1(h, v, d, dd)
{
	var nodes = $('.node', '#raid-1');
	var dataNodes = $('.data-node', '#raid-1');

	var write = function()
	{
		var horizontal = h;
		var vertical = v;
		var delay = d;
		var dataDelay = dd;
		$.each(dataNodes, function( index, value )
		{
			runDataNode(value, 145, dataDelay);
			dataDelay += 1000;
		});

		$.each(nodes, function( index, value )
		{
			runNode(value, delay, horizontal, vertical);

			delay += 500;

			if(index < 7)
			{
				if((index+1) % 2 == 0 && index != 0)
				{
					horizontal = 59;
					vertical += 26;
				}
				else horizontal += 117;
			}
			else
			{
				if(index == 7)
				{
					vertical = 60;
				}

				if((index+1) % 2 == 0)
				{
					horizontal = 293;
					vertical += 26;
				}
				else horizontal += 117;
			}
		});
	};

	var read = function() {
		var horizontal = h;
		var vertical = v;
		var delay = dd;
		var dataDelay = d+1000;

		$.each(nodes, function( index, value )
		{
			runReadNode(value, 0, 0, delay);
			delay += 500;
		});

		$.each(dataNodes, function( index, value )
		{
			runReadDataNode(value, 0, dataDelay);
			dataDelay += 1150;
		});
	};

	$('#start', '#raid-1').click(function()
	{
		if($(this).text() == 'READ')
		{
			read();
			$(this).text('WRITE');
		} else if($(this).text() == 'WRITE')
		{
			write();
			$(this).text('READ');
		}
	})

	$('#dataloss', '#raid-1').click(function()
	{
		if($('#start', '#raid-1').text() == 'READ')
		{
			var horizontal = h;
			var vertical = v;
			var delay = d;
			var dataDelay = dd+50;
			var lostData = $('.node:nth-child(2n+1)', '#raid-1').slice(0, 4);
			var lostDisk = $('.HDD:first', '#raid-1');
			var diskTitle = $('.HDD-title:first', '#raid-1');
			var healthyNodes = $('.node:nth-child(2n+2)', '#raid-1').slice(0, 4).clone().addClass('clone').appendTo($('.nodes', '#raid-1'));
			
			lostData.css('opacity', '0.0');
			lostDisk.css('opacity', '0.0');
			diskTitle.text('Lost');
			setTimeout(function()
			{
				lostDisk.hide();
				lostDisk.css('opacity', '1.0');
				lostDisk.slideDown(1000, function()
 				{
					$(diskTitle).text('New disk');
				});
			}, 1000);
			setTimeout(function(){
				$(lostData[0]).css('opacity', '1.0');
			}, 4000);
			setTimeout(function(){
				$(lostData[1]).css('opacity', '1.0');
			}, 7000);
			setTimeout(function(){
				$(lostData[2]).css('opacity', '1.0');
			}, 10000);
			setTimeout(function(){
				$(lostData[3]).css('opacity', '1.0');
			}, 13000);
			for(var ii=0; ii<4; ii+=1)
			{
				currentNodes = $.merge([lostData[ii]], [healthyNodes[ii]]);
				$.each(currentNodes, function( index, value )
				{
					runReadNode(value, 0, 0, delay);
					delay += 500;
					if($(value).hasClass('clone'))
					{
						setTimeout(function() {value.remove()}, delay*2);
					};
				});
				delay += 2000;
				var lostElement = $(lostData[ii]);
				runNode(lostElement, delay, horizontal, vertical);
				vertical += 26;
				delay += 500;
			}
			setTimeout(function()
			{
				diskTitle.text('Disk 1');
			}, 16000);
		}
	})
}

function raid_2(h, v, d, dd)
{
	var nodes = $('.node', '#raid-2');
	var dataNodes = $('.data-node', '#raid-2');

	var write = function()
	{
		var horizontal = h;
		var vertical = v;
		var delay = d;
		var dataDelay = dd;
		$.each(dataNodes, function( index, value )
		{
			runDataNode(value, 145, dataDelay);
			dataDelay += 3600;
		});

		$.each(nodes, function( index, value )
		{
			delay += 500;

			if(index == 4)
			{
				runRAID2Node1(value, delay, 86);
			}
			else if(index == 5)
			{
				runRAID2Node2(value, delay, 86);
			}
			else if(index == 6)
			{
				runRAID2Node3(value, delay, 86);

				horizontal = 59;
				vertical = 112;
			}
			else if(index == 11)
			{
				runRAID2Node1(value, delay, 112);
			}
			else if(index == 12)
			{
				runRAID2Node2(value, delay, 112);
			}
			else if(index == 13)
			{
				runRAID2Node3(value, delay, 112);

				horizontal = 59;
				vertical = 138;
			}
			else if(index == 18)
			{
				runRAID2Node1(value, delay, 138);
			}
			else if(index == 19)
			{
				runRAID2Node2(value, delay, 138);
			}
			else if(index == 20)
			{
				runRAID2Node3(value, delay, 138);

				horizontal = 59;
				vertical = 164;
			}
			else if(index == 25)
			{
				runRAID2Node1(value, delay, 164);
			}
			else if(index == 26)
			{
				runRAID2Node2(value, delay, 164);
			}
			else if(index == 27)
			{
				runRAID2Node3(value, delay, 164);

				horizontal = 59;
			}
			else if(index < 4 || index < 11 || index < 18 || index < 25)
			{
				runNode(value, delay, horizontal, vertical);
				horizontal += 117;
			}
		});
	};

	var read = function()
	{
		var horizontal = h;
		var vertical = v;
		var delay = dd;
		var dataDelay = d+1000;

		var noparityNodes = $(nodes).not('.parity');

		$.each(noparityNodes, function( index, value )
		{
			runReadNode(value, 0, 0, delay);
			delay += 500;
		});

		$.each(dataNodes, function( index, value )
		{
			runReadDataNode(value, 0, dataDelay);
			dataDelay += 2200;
		});
	};

	$('#start', '#raid-2').click(function()
	{
		if($(this).text() == 'READ')
		{
			read();
			$(this).text('WRITE');
		} else if($(this).text() == 'WRITE')
		{
			write();
			$(this).text('READ');
		}
	})
}

function raid_3(h, v, d, dd)
{
	var nodes = $('.node', '#raid-3');
	var dataNodes = $('.data-node', '#raid-3');

	var write = function()
	{
		var horizontal = h;
		var vertical = v;
		var delay = d;
		var dataDelay = dd;
		$.each(dataNodes, function( index, value )
		{
			runDataNode(value, 145, dataDelay);
			dataDelay += 2600;
		});

		$.each(nodes, function( index, value )
		{
			delay += 500;

			if(index == 4)
			{
				runRAID3Nodes(value, delay, 86)

				horizontal = 59;
				vertical = 112;
			}
			else if(index == 9)
			{
				runRAID3Nodes(value, delay, 112);

				horizontal = 59;
				vertical = 138;
			}
			else if(index == 14)
			{
				runRAID3Nodes(value, delay, 138);

				horizontal = 59;
				vertical = 164;
			}
			else if(index == 19)
			{
				runRAID3Nodes(value, delay, 164);

				horizontal = 59;
			}
			else if(index < 4 || index < 9 || index < 14 || index < 19)
			{
				runNode(value, delay, horizontal, vertical);
				horizontal += 117;
			}
		});
	};

	var read = function()
	{
		var horizontal = h;
		var vertical = v;
		var delay = dd;
		var dataDelay = d+1500;

		var noparityNodes = $(nodes).not('.parity');

		$.each(noparityNodes, function( index, value )
		{
			runReadNode(value, 0, 0, delay);
			delay += 500;
		});

		$.each(dataNodes, function( index, value )
		{
			runReadDataNode(value, 0, dataDelay);
			dataDelay += 2500;
		});
	}

	$('#start', '#raid-3').click(function()
	{
		if($(this).text() == 'READ')
		{
			read();
			$(this).text('WRITE');
		} else if($(this).text() == 'WRITE')
		{
			write();
			$(this).text('READ');
		}
	})
}

function raid_4(h, v, d, dd)
{
	var nodes = $('.node', '#raid-4');
	var dataNodes = $('.data-node', '#raid-4');

	var write = function()
	{
		var horizontal = h;
		var vertical = v;
		var delay = d;
		var dataDelay = dd;
		$.each(dataNodes, function( index, value )
		{
			runDataNode(value, 145, dataDelay);
			dataDelay += 2600;
		});

		$.each(nodes, function( index, value )
		{
			delay += 500;

			if(index == 4)
			{
				runRAID3Nodes(value, delay, 86)

				horizontal = 59;
				vertical = 112;
			}
			else if(index == 9)
			{
				runRAID3Nodes(value, delay, 112);

				horizontal = 59;
				vertical = 138;
			}
			else if(index == 14)
			{
				runRAID3Nodes(value, delay, 138);

				horizontal = 59;
				vertical = 164;
			}
			else if(index == 19)
			{
				runRAID3Nodes(value, delay, 164);

				horizontal = 59;
			}
			else if(index < 4 || index < 9 || index < 14 || index < 19)
			{
				runNode(value, delay, horizontal, vertical);
				horizontal += 117;
			}
		});
	};

	var read = function()
	{
		var horizontal = h;
		var vertical = v;
		var delay = dd;
		var dataDelay = d+1500;

		var noparityNodes = $(nodes).not('.parity');

		$.each(noparityNodes, function( index, value )
		{
			runReadNode(value, 0, 0, delay);
			delay += 500;
		});

		$.each(dataNodes, function( index, value )
		{
			runReadDataNode(value, 0, dataDelay);
			dataDelay += 2500;
		});
	};

	$('#start', '#raid-4').click(function()
	{
		if($(this).text() == 'READ')
		{
			read();
			$(this).text('WRITE');
		} else if($(this).text() == 'WRITE')
		{
			write();
			$(this).text('READ');
		}
	})
}

function raid_5(h, v, d, dd)
{
	var nodes = $('.node', '#raid-5');
	var dataNodes = $('.data-node', '#raid-5');

	var write = function()
	{
		var horizontal = h;
		var vertical = v;
		var delay = d;
		var dataDelay = dd+50;
		$.each(dataNodes, function( index, value )
		{
			runDataNode(value, 145, dataDelay);
			dataDelay += 2500;
		});

		$.each(nodes, function( index, value )
		{
			runNode(value, delay, horizontal, vertical);

			delay += 500;

			if((index+1) % 5 == 0 && index != 0)
			{
				horizontal = 59;
				vertical += 26;
			}
			else horizontal += 117;
		});
	};

	var read = function()
	{
		var horizontal = h;
		var vertical = v;
		var delay = dd;
		var dataDelay = d+1500;

		var noparityNodes = $(nodes).not('.parity');

		$.each(noparityNodes, function( index, value )
		{
			runReadNode(value, 0, 0, delay);
			delay += 500;
		});

		$.each(dataNodes, function( index, value )
		{
			runReadDataNode(value, 0, dataDelay);
			dataDelay += 2300;
		});
	}

	$('#start', '#raid-5').click(function()
	{
		if($(this).text() == 'READ')
		{
			read();
			$(this).text('WRITE');
		} else if($(this).text() == 'WRITE')
		{
			write();
			$(this).text('READ');
		}
	})

	$('#dataloss', '#raid-5').click(function()
	{
		if($('#start', '#raid-5').text() == 'READ')
		{
			var horizontal = h;
			var vertical = v;
			var delay = d;
			var dataDelay = dd+50;
			var lostData = $('.node:nth-child(5n+1)', '#raid-5');
			var lostDisk = $('.HDD:first', '#raid-5');
			var diskTitle = $('.HDD-title:first', '#raid-5');
			var healthyNodes = $('.node', '#raid-5').not(':nth-child(5n+1)').clone().addClass('clone').appendTo($('.nodes', '#raid-5'));
			
			lostData.css('opacity', '0.0');
			lostDisk.css('opacity', '0.0');
			diskTitle.text('Lost');
			setTimeout(function()
			{
				lostDisk.hide();
				lostDisk.css('opacity', '1.0');
				lostDisk.slideDown(1000, function()
 				{
					$(diskTitle).text('New disk');
				});
			}, 1000);
			setTimeout(function(){
				$(lostData[0]).css('opacity', '1.0');
			}, 4000);
			setTimeout(function(){
				$(lostData[1]).css('opacity', '1.0');
			}, 8000);
			setTimeout(function(){
				$(lostData[2]).css('opacity', '1.0');
			}, 12500);
			setTimeout(function(){
				$(lostData[3]).css('opacity', '1.0');
			}, 18000);
			setTimeout(function(){
				$(lostData[4]).css('opacity', '1.0');
			}, 22500);
			for(var ii=0; ii<5; ii+=1)
			{
				currentNodes = $.merge([lostData[ii]], healthyNodes.slice(ii*4, ii*4+4));
				$.each(currentNodes, function( index, value )
				{
					runReadNode(value, 0, 0, delay);
					delay += 500;
					if($(value).hasClass('clone'))
					{
						setTimeout(function() {value.remove();console.log("destroyed");}, delay*2);
					};
				});
				delay += 2000;
				var lostElement = $(lostData[ii]);
				runNode(lostElement, delay, horizontal, vertical);
				vertical += 26;
				delay += 500;
			}
			setTimeout(function()
			{
				diskTitle.text('Disk 1');
			}, 27000);
		}
	})
}

function raid_6(h, v, d, dd)
{
	var nodes = $('.node', '#raid-6');
	var dataNodes = $('.data-node', '#raid-6');

	var write = function()
	{
		var horizontal = h;
		var vertical = v;
		var delay = d;
		var dataDelay = dd;
		$.each(dataNodes, function( index, value )
		{
			runDataNode(value, 145, dataDelay);
			dataDelay += 2400;
		});

		$.each(nodes, function( index, value )
		{
			runNode(value, delay, horizontal, vertical);

			delay += 500;

			if((index+1) % 5 == 0 && index != 0)
			{
				horizontal = 59;
				vertical += 26;
			}
			else horizontal += 117;
		});
	};

	var read = function()
	{
		var horizontal = h;
		var vertical = v;
		var delay = dd;
		var dataDelay = d+1500;

		var noparityNodes = $(nodes).not('.parity');

		$.each(noparityNodes, function( index, value )
		{
			runReadNode(value, 0, 0, delay);
			delay += 500;
		});

		$.each(dataNodes, function( index, value )
		{
			runReadDataNode(value, 0, dataDelay);
			dataDelay += 1800;
		});
	};

	$('#start', '#raid-6').click(function()
	{
		if($(this).text() == 'READ')
		{
			read();
			$(this).text('WRITE');
		} else if($(this).text() == 'WRITE')
		{
			write();
			$(this).text('READ');
		}
	})

	$('#dataloss', '#raid-6').click(function()
	{
		if($('#start', '#raid-6').text() == 'READ')
		{
			var horizontal = h;
			var vertical = v;
			var delay = d;
			var dataDelay = dd+50;
			var lostData = $('.node:nth-child(5n+1)', '#raid-6');
			var lostDisk = $('.HDD:first', '#raid-6');
			var diskTitle = $('.HDD-title:first', '#raid-6');
			var healthyNodes = $('.node', '#raid-6').not(':nth-child(5n+1)').clone().addClass('clone').appendTo($('.nodes', '#raid-6'));
			
			lostData.css('opacity', '0.0');
			lostDisk.css('opacity', '0.0');
			diskTitle.text('Lost');
			setTimeout(function()
			{
				lostDisk.hide();
				lostDisk.css('opacity', '1.0');
				lostDisk.slideDown(1000, function()
 				{
					$(diskTitle).text('New disk');
				});
			}, 1000);
			setTimeout(function(){
				$(lostData[0]).css('opacity', '1.0');
			}, 4000);
			setTimeout(function(){
				$(lostData[1]).css('opacity', '1.0');
			}, 8000);
			setTimeout(function(){
				$(lostData[2]).css('opacity', '1.0');
			}, 12500);
			setTimeout(function(){
				$(lostData[3]).css('opacity', '1.0');
			}, 18000);
			setTimeout(function(){
				$(lostData[4]).css('opacity', '1.0');
			}, 22500);
			for(var ii=0; ii<5; ii+=1)
			{
				currentNodes = $.merge([lostData[ii]], healthyNodes.slice(ii*4, ii*4+4));
				$.each(currentNodes, function( index, value )
				{
					runReadNode(value, 0, 0, delay);
					delay += 500;
					if($(value).hasClass('clone'))
					{
						setTimeout(function() {value.remove()}, delay*2);
					};
				});
				delay += 2000;
				var lostElement = $(lostData[ii]);
				runNode(lostElement, delay, horizontal, vertical);
				vertical += 26;
				delay += 500;
			}
			setTimeout(function()
			{
				diskTitle.text('Disk 1');
			}, 27000);
		}
	})
}