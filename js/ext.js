function clean(node)
{
  for(var n = 0; n < node.childNodes.length; n ++)
  {
    var child = node.childNodes[n];
    if
    (
      child.nodeType === 8 
      || 
      (child.nodeType === 3 && !/\S/.test(child.nodeValue))
    )
    {
      node.removeChild(child);
      n --;
    }
    else if(child.nodeType === 1)
    {
      clean(child);
    }
  }
}

function setText(elem, value)
{
	elem.innerHTML = value;
}

window.addEventListener("mousedown", function(e){
    mouseDown = true;

});

window.addEventListener("mouseup", function(e){
   mouseDown = false;

});

function setSpeed(speed)
{
	if(speed == 0){
		currentSpeed = baseSpeed;
		slider_speed.value = 1;
	}
	currentSpeed = Math.round(baseSpeed - ( speed  * 15));
}

function setSize(x)
{
	load_custom = true;
	if(x == 0)
	{
		matrice_size = 32;
		slider_size.value = 2;
		return;
	}
	if(stop || currentIndex == 0 && x !=0)
	{
		var res = parseInt(x, 10) + 3;
		
		matrice_size = Math.pow(2,res);
		console.log(matrice_size);
		reset();
	}
}

function display()
{
	for(var i=0; i<matrice_size; i++)
	{
		for(var j=0; j<matrice_size; j++)
		{
			matrice[i][j] = 0;
		}
	}
		for(var i = 0 ;i < matrice_size; i++)
		{
			for(var j = 0 ;j < matrice_size; j++)
			{
				var r = getRandomInt(40);
				console.log(r);
				if(r == 0)
				{
					console.log(r);
					matrice[i][j] = 1;
				}
				else if(r == 2)
				{
				}
				else if(r<20)
				{
					if(i < matrice_size - 1 && i > 0 && j > 0 && j < matrice_size - 1)
					{
						if(matrice[i-1][j] == 1 || matrice[i+1][j] == 1 || matrice[i][j-1] == 1 || matrice[i][j+1]  == 1|| matrice[i+1][j-1] == 1|| matrice[i-1][j-1]  == 1|| matrice[i+1][j+1] == 1)
						{
							try
							{
								r = getRandomInt(4);
								if(r==0)
								{		
									matrice[i+matrice_size/8][j+matrice_size/8] = 1;;
								}
								else if(r==1)
								{

									matrice[i-matrice_size/8][j-matrice_size/8] = 1;
								}
								else if(r==2)
								{

									matrice[i+matrice_size/16][j-matrice_size/16] = 1;
								}
								else if(r==3)
								{

									matrice[i-matrice_size/16][j+matrice_size/16] = 1;
								}
							}
							catch(error)
							{
								console.log(error);
							}
							
						}
					}
				}
			}
		}

	for(var i=0; i<matrice_size; i++)
	{
		for(var j=0; j<matrice_size; j++)
		{
			if(matrice[i][j] == 1)
			{
				nb_cel_alive ++;
			}
		}
	}	
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}