var matrice_size = 0;
const baseSpeed = 300; // ms

var matrice = new Array();
var old_matrice = new Array();
var matrice_div = new Array();

var container;
var but;
var but_reset;
var but_pause;

var currentIndex = 0;
var currentSpeed = baseSpeed;
var p_index;
var p_index_alive;
var p_index_all;
var slider_speed;
var slider_size;
var stop = false;
var ajust = true;

var mouseDown = false;

var nb_cel;
var nb_cel_alive = 0;
var nb_cel_dead = 0;
var display = 2;
var load_custom = true;

window.addEventListener("DOMContentLoaded", (event) =>
{
	clean(document);
	get_elements();
	init();
	
    $(window).on('resize', function(e) {
		if(ajust)
			setWidthHeight();
    });

});

function get_elements()
{
  container = document.getElementById("container");
  but = document.getElementById("start-button");
  but_reset = document.getElementById("reset-button");
  but_pause = document.getElementById("pause-button");
  p_index = document.getElementById("count-turn");
  p_index_alive = document.getElementById("count-alive");
  p_index_all = document.getElementById("count-total");
  slider_speed = document.getElementById("speed-slider");
  slider_size = document.getElementById("size-slider");
  setSize(0);
}

function init()
{
		setSpeed(0);
	init_matrice_property();
	init_cel();
	
	but.onclick = main_start;
	but_reset.onclick = reset;
	but.disabled = false;
	but_pause.disabled = true;
	
	setText(p_index, currentIndex);

	setText(p_index_alive, nb_cel_alive);
	nb_cel = matrice_size * matrice_size;
	setText(p_index_all,"Nb. of alive cells (out of "+nb_cel +"):");
}

function main_start()
{
	but.disabled = true;
	stop = false;
	but_pause.disabled = false;
	for (var i = 0; i < matrice_size; i++)
	{
		for (var j = 0; j < matrice_size; j++)
		{
			matrice_div[i][j].onclick = function(){ return false;};
			matrice_div[i][j].onmouseover = function(){ return false;};
		}
	}
	check_matrice();
}

function reset()
{
	stop = true;
	currentIndex = 0;
	
	while (container.firstChild) 
	{
		container.firstChild.remove();
	}
	
	init();
}

function init_matrice_property()
{
	for(var i=0; i<matrice_size; i++)
	{
		matrice[i] = new Array();
		matrice_div[i] = new Array();
	}
	if(load_custom)// chargement initial de la matrice
	{
		load_custom = false;
		display();
	}
	else // reset
	{
		for(var i=0; i<matrice_size; i++)
		{
			for(var j=0; j<matrice_size; j++)
			{
				matrice[i][j] = 0;
			}
		}
	}
}

function pause()
{
	stop = !stop;

	if(!stop)
	{
			for (var i = 0; i < matrice_size; i++)
	{
		for (var j = 0; j < matrice_size; j++)
		{
			matrice_div[i][j].onclick = function(){ return false;};
			matrice_div[i][j].onmouseover = function(){ return false;};
		}
	}
		check_matrice();
	}
	else
	{
		for (var i = 0; i < matrice_size; i++)
		{
			for (var j = 0; j < matrice_size; j++)
			{
				
				matrice_div[i][j].onclick = (function(i,j) {return function() 
				{
					if(matrice[i][j] == 0)
					{
						matrice[i][j] = 1;
						matrice_div[i][j].style.background = "black";
						nb_cel_alive ++;

					}
					else
					{
						matrice[i][j] = 0;
						matrice_div[i][j].style.background = "unset";
						nb_cel_alive --;
					}
					setText(p_index_alive, nb_cel_alive);
					
				};})(i,j); 
				matrice_div[i][j].onmouseover = (function(i,j) {return function() 
				{
					if(mouseDown && stop || mouseDown && currentIndex == 0)
					{
						console.log("mouse down on cel");
						if(matrice[i][j] == 1)
						{
							//matrice[i][j] = 0;
							//matrice_div[i][j].style.background = "unset";
							//nb_cel_alive --;
						}
						else
						{
							matrice[i][j] = 1;
							matrice_div[i][j].style.background = "black";
							nb_cel_alive ++;

						}
						setText(p_index_alive, nb_cel_alive);
					}
					else
					{
						return;
					}

				};})(i,j);

			}
		}
	}
}

function init_cel()
{
	setWidthHeight();
	for (var i = 0; i < matrice_size; i++)
	{
		for (var j = 0; j < matrice_size; j++)
		{
			var cel = document.createElement("div");
			cel.classList.add("cel");
			container.appendChild(cel);

			matrice_div[i][j] = cel;
			
	 		matrice_div[i][j].onclick = (function(i,j) {return function() 
			{
				if(matrice[i][j] == 0)
				{
					matrice[i][j] = 1;
					matrice_div[i][j].style.background = "black";
					nb_cel_alive ++;

				}
				else
				{
					matrice[i][j] = 0;
					matrice_div[i][j].style.background = "unset";
					nb_cel_alive --;
				}
				setText(p_index_alive, nb_cel_alive);
				
			};})(i,j); 
			matrice_div[i][j].onmouseover = (function(i,j) {return function() 
			{
				if(mouseDown && stop || mouseDown && currentIndex == 0)
				{
					console.log("mouse down on cel");
					if(matrice[i][j] == 1)
					{
						//matrice[i][j] = 0;
						//matrice_div[i][j].style.background = "unset";
						//nb_cel_alive --;
					}
					else
					{
						matrice[i][j] = 1;
						matrice_div[i][j].style.background = "black";
						nb_cel_alive ++;

					}
					setText(p_index_alive, nb_cel_alive);
				}
				else
				{
					return;
				}

			};})(i,j);

			
			if(matrice[i][j] == 1)
			{
				cel.style.background = "black";
			}
		}
	}
}

function setWidthHeight()
{
	ajust = false;
	var s = Math.round($(window).width() * 900 / 1903);

	if($(window).height()*0.8 < s)
	{
		s = .8 * $(window).height();
	}
		
	container.style.width = s+"px";
	container.style.height = s+"px";

	var pos = container.getBoundingClientRect();


	var m_height = (pos.height - matrice_size - 3) / matrice_size + "px";//(100-(100 * matrice_size / pos.height)) / (matrice_size) + "%";
	var m_width =(pos.width - matrice_size - 3) / matrice_size +"px"; //(100-(100 * matrice_size / pos.width)) / (matrice_size) + "%";
	var style = document.createElement('style');

	style.innerHTML = `
						.cel {
								float: left;
								border:solid #b9b9b959;
								border-width:  1px 0 0 1px;
								width: ` + m_width + `;
								height: `+ m_height +`;
							}
					`;
					
	document.head.appendChild(style);
	setTimeout(function(){ajust = true;},200);
}

function check_matrice()
{
	old_matrice = JSON.parse(JSON.stringify(matrice));
	for (var i = 0; i < matrice_size; i++)
	{
		for (var j = 0; j < matrice_size; j++)
		{
			var result = check_cel(i,j);

			if(result == 0) // qui meurt
			{
				if(!stop)
				{
					matrice[i][j] = 0;
					matrice_div[i][j].style.background = "unset";
				}
				else
					return;
			}
			else if(result == 1 | result == 2) // qui reste en vit
			{
				if(old_matrice[i][j] == 0)
				{
					if(result == 2)
					{
						if(!stop)
						{
							matrice[i][j] = 1;
							matrice_div[i][j].style.background = "black";
						}
						else
							return;
					}
				}
				if(old_matrice[i][j] == 1)
				{
					if(!stop)
					{
						matrice[i][j] = 1;
						matrice_div[i][j].style.background = "black";
					}
					else
						return;
				}
			}
			
			if(matrice[i][j] == 1)
				nb_cel_alive ++;
		}
	}
	
		
	currentIndex ++;
	setText(p_index, currentIndex);
	if(!stop)
		setTimeout(function(){setText(p_index_alive,nb_cel_alive);console.log('t');if(!stop){nb_cel_alive = 0}; check_matrice(); }, currentSpeed);
	else
		return;
  }

function check_cel(line, col)
{
	var voisin = 0;
	
	if(col == 0 || col == matrice_size - 1)		 // 1st and last columns
	{	
		if(col == 0 && line != 0 && line != matrice_size - 1) // line reg, col 0
		{
			if(old_matrice[line - 1][col] == 1)
				voisin ++;
			if(old_matrice[line - 1][col + 1] == 1)
				voisin ++;
			if(old_matrice[line][col + 1] == 1)
				voisin ++;
			if(old_matrice[line + 1][col] == 1)
				voisin ++;
			if(old_matrice[line + 1][col + 1] == 1)
				voisin ++;
		}
		if(col == matrice_size - 1 && line != 0 && line != matrice_size - 1) // line reg, col max
		{
			if(old_matrice[line - 1][col] == 1)
				voisin ++;
			if(old_matrice[line - 1][col - 1] == 1)
				voisin ++;
			if(old_matrice[line][col - 1] == 1)
				voisin ++;
			if(old_matrice[line + 1][col] == 1)
				voisin ++;
			if(old_matrice[line + 1][col - 1] == 1)
				voisin ++;
		}
		
		if(line == 0) // top right & left
		{
			if(col == 0)
			{
				if(old_matrice[line][col + 1] == 1)
					voisin ++;
				if(old_matrice[line + 1][col] == 1)
					voisin ++;
				if(old_matrice[line + 1][col + 1] == 1)
					voisin ++;
			}
			else if(col == matrice_size - 1)
			{
				if(old_matrice[line][col - 1] == 1)
					voisin ++;
				if(old_matrice[line + 1][col - 1] == 1)
					voisin ++;
				if(old_matrice[line + 1][col] == 1)
					voisin ++;
			}	
		}
		if(line == matrice_size - 1) // bot right & left
		{
			if(col == 0)
			{
				if(old_matrice[line - 1][col] == 1)
					voisin ++;
				if(old_matrice[line - 1][col + 1] == 1)
					voisin ++;
				if(old_matrice[line][col + 1] == 1)
					voisin ++;
			}
			else if(col == matrice_size - 1)
			{
				if(old_matrice[line - 1][col] == 1)
					voisin ++;
				if(old_matrice[line - 1][col - 1] == 1)
					voisin ++;
				if(old_matrice[line][col - 1] == 1)
					voisin ++;
			}
		}	
	}
	
	else if(line == 0 || line == matrice_size - 1 && col != 0 && col != matrice_size) // 1st and last line 
	{
		if(line == 0) // 1st line without corner
		{
			if(old_matrice[line][col - 1] == 1)
				voisin ++;
			if(old_matrice[line][col + 1] == 1)
				voisin ++;
			if(old_matrice[line + 1][col - 1] == 1)
				voisin ++;
			if(old_matrice[line + 1][col] == 1)
		    	voisin ++;
			if(old_matrice[line + 1][col + 1] == 1)
				voisin ++;
		}
		else if(line == matrice_size - 1) // last line without corner
		{
			if(old_matrice[line][col - 1] == 1)
				voisin ++;
			if(old_matrice[line][col + 1] == 1)
				voisin ++;
			if(old_matrice[line - 1][col - 1] == 1)
				voisin ++;
			if(old_matrice[line - 1][col] == 1)
		    	voisin ++;
			if(old_matrice[line - 1][col + 1] == 1)
				voisin ++;
		}
	}
	
	else
	{
		if(old_matrice[line - 1][col - 1] == 1)
			voisin ++;
		if(old_matrice[line - 1][col] == 1)
			voisin ++;
		if(old_matrice[line - 1][col + 1] == 1)
			voisin ++;
		if(old_matrice[line][col - 1] == 1)
	    	voisin ++;
		if(old_matrice[line][col + 1] == 1)
			voisin ++;
		if(old_matrice[line + 1][col - 1] == 1)
			voisin ++;
		if(old_matrice[line + 1][col] == 1)
			voisin ++;
		if(old_matrice[line + 1][col + 1] == 1)
			voisin ++;
	}
	
	
	if(voisin == 3)
	{
		return 2;
	}
	else if(voisin >= 2 && voisin <= 3)
	{
		return 1;
	}
	else
	{
		return 0;
	}
	
}