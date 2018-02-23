window.onload = function()
{	
	pelota = document.getElementById('lagrima');
	
	bolaEnemiga = document.getElementById('bolaEnemiga');
	barra = document.getElementById('barra');
	zona = document.getElementById('divZonaJugable');
	fondo = document.getElementById('fondo');
	
	barra.style.position = "absolute";
	variacionX = 1; 
	variacionY = -1;
	ancho = 735;
	alto = 450;
	diametroPelota = 36;
	posXBarra = 0;
	contVidas = 2;
	posX = 340;
	posY = 320;
	movimientoX = 1;
	movimientoY = -1;
	itemPuesto = false;
	cargartodosLadrillos();
	pelota.style.position = "absolute";
	
	itemAleatorio = Math.floor(Math.random() * todosLadrillos.length);
	itemEX = todosLadrillos[itemAleatorio].offsetLeft;
	itemEY = todosLadrillos[itemAleatorio].offsetTop;
	
	
	
	bolaEnemiga.style.position = "absolute";
	bolaEnemiga.style.width = 36 + "px";
	bolaEnemiga.style.height = 36 + "px";
	aleatorio();
	
	vidas();
	setInterval(choques,1);
	setInterval(choquetodosLadrillos,1);
	
	click = false;
	ponerBarra();
	zona.onmousemove = moverBarra;
	zona.addEventListener("click", function () { iniciarPartidaClic(); });

};
function iniciarPartidaClic() 
{ 
    if(click == false)
	{
		variacionY = -1;
		pelota.style.visibility = "visible";
		
		idMovimientoPelota = setInterval(moverPelota, 3);
		idMovimientoEnemigo = setInterval(lagrimasEnemigos,8);
		click = true;
	}
}
function recolocarPelota() 
{ 
		clearInterval(idMovimientoPelota);
		clearInterval(idMovimientoEnemigo);
		aleatorio();
		posX = 340;
		posY = 320;
		click = false;
}
function moverPelota()
 {

	posX = posX + variacionX;
	posY = posY + variacionY;

	pelota.style.left = posX + "px";
	pelota.style.top = posY + "px";

	// borde vertical derecha
	if (posX >= ancho - diametroPelota)
	{
		variacionX = -variacionX;
		// cambio direccion
		movimientoX = -1;
	}

	// borde vertical izquierda
	if (posX <= 0) 
	{
		variacionX = -variacionX;

		// cambio direccion
		movimientoX = 1;
	}

	// borde inferior
	if (posY >= alto - diametroPelota)
	{
		variacionY = -variacionY;
		// cambio direccion
		movimientoY = 1;
		partidaPerdida();
		recolocarPelota();
	}

	// borde superior
	if (posY <= 0)
	{
		variacionY = -variacionY;
		// cambio direccion
		movimientoY = -1;
	}
}
function ponerBarra()
{
	posXBarra = 325;
	posYBarra = 375;
	barra.style.left = posXBarra + "px";
	barra.style.top = posYBarra + "px";
	barra.style.width = 100 + "px";
	barra.style.height = 30 + "px";
	barra.style.backgroundImage = "url('raqueta2.png')";
}
function moverBarra(elEvento)
{
	var evento = window.event || elEvento;
	x = evento.clientX;
	barra.style.left = (x - 325) + "px";
	posXBarra = x - 325;
}
function choques()
{
	posicionBy = parseInt(barra.style.top);
	posicionBx = parseInt(barra.style.left);
	//choque izquierda
	/*if(posX <= (posicionBx - diametroPelota)) 
	{
		if(posY >= (posicionBy - diametroPelota))
		{
			variacionX = -variacionX;
			// cambio direccion
			movimientoX = -1;
			variacionY = -variacionY;
			// cambio direccion
			movimientoY = 1;
		}
	}
	//choque derecha
	if(posX <= (posicionBx + 84)) 
	{
		if(posY >= (posicionBy - diametroPelota))
		{
			variacionX = -variacionX;
			// cambio direccion
			movimientoX = 1;
			variacionY = -variacionY;
			// cambio direccion
			movimientoY = 1;
		}
	}*/
	//choque arriba	medio
	if(posY == (posicionBy - diametroPelota))
	{
		
		//principio
		if(posX > (posicionBx - diametroPelota) && posX < (posicionBx + 20))
		{
			if(variacionX == 1)
			{
				variacionY = -variacionY;
				variacionX = -variacionX;
				// cambio direccion
				movimientoY = 1;
			}
			else
			{
				variacionY = -variacionY;
				variacionX = +variacionX;
				// cambio direccion
				movimientoY = 1;
			}
			
		}
		//medio
		else if(posX > (posicionBx - diametroPelota + 20) && posX < (posicionBx + 44))
		{
			variacionY = -variacionY;
			// cambio direccion
			movimientoY = 1;
		}	
		//final
		else if(posX > (posicionBx - diametroPelota + 44) && posX < (posicionBx + 84))
		{
			if(variacionX == -1)
			{
				variacionY = -variacionY;
				variacionX = -variacionX;
				// cambio direccion
				movimientoY = 1;
			}
			else
			{
				variacionY = -variacionY;
				variacionX = +variacionX;
				// cambio direccion
				movimientoY = 1;
			}
		}
		
	}

}
function choquetodosLadrillos()
{
	 for(i = 0; i < todosLadrillos.length; i++)
	 {
		ladX = todosLadrillos[i].offsetLeft;
		ladY = todosLadrillos[i].offsetTop;
		//choque arriba y abajo
		if(posY >= (ladY - diametroPelota/2) && posY <= (ladY + todosLadrillos[i].offsetHeight/2))
		{
			if(posX >= (ladX - diametroPelota/2) && posX <= (ladX + todosLadrillos[i].offsetWidth))
			{
				variacionY = -variacionY;
				// cambio direccion
				movimientoY = 1;
				//zona.removeChild(document.getElementById(i + ""));
				todosLadrillos[i].style.visibility = "hidden";
				todosLadrillos[i] = "a";
			}
			
		}
		//choque izquierda y derecha
		if(posX >= (ladX - diametroPelota/2) && posX <= (ladX + todosLadrillos[i].offsetWidth)) 
		{
			if(posY >= (ladY - diametroPelota/2) && posY <= (ladY + todosLadrillos[i].offsetHeight/2))
			{
				variacionX = -variacionX;
				// cambio direccion
				movimientoX = -1;
				variacionY = -variacionY;
				// cambio direccion
				movimientoY = 1;
				//zona.removeChild(document.getElementById(i + ""));
				todosLadrillos[i].style.visibility = "hidden";
				todosLadrillos[i] = "a";
			}
		}
		
	}
	partidaGanada();
	
}

function cargartodosLadrillos()
{
	todosLadrillos = [];
	for(i = 0; i < 10; i++)
	{
		var ladrillo = document.createElement("div");
		ladrillo.style.width = 107 + "px";
		ladrillo.style.height = 20 + "px";
		ladrillo.style.margin = 10 + "px" + " " + 20 + "px";
		ladrillo.style.background ="white";
		ladrillo.style.position = "relative";
		ladrillo.style.float = "left";
		ladrillo.style.float = "visible";
		ladrillo.className = "bloque";
		zona.appendChild(ladrillo);
		todosLadrillos.push(ladrillo);
	}
}
function vidas()
{
	vidas = [];
	for(i = 0; i < 3; i++)
	{
		var corazon = document.createElement("div");
		corazon.style.width = 40 + "px";
		corazon.style.height = 37 + "px";
		corazon.style.backgroundImage = "url('corazonF.png')";
		corazon.style.position = "relative";
		corazon.style.top = -430 + "px";
		corazon.style.left = 50 + "px";
		corazon.style.float = "left";
		corazon.className = "corazon";
		fondo.appendChild(corazon);
		vidas.push(corazon);
	}
}
function partidaGanada()
{
	todosFuera = true;
	for(i = 0; i < todosLadrillos.length && todosFuera == true; i++)
	{
		if(todosLadrillos[i] == "a")
		{
			todosFuera = true;
		}	
		else
		{
			todosFuera = false;
		}	
	}
	if(todosFuera == true)
	{
		fondo.style.backgroundImage = "url('fondoGanar.jpg')";
		barra.parentNode.removeChild(barra);
		zona.parentNode.removeChild(zona);
		return true;
	}	
}
function partidaPerdida()
{
	if(vidas.length == 1)
	{
		fondo.style.backgroundImage = "url('fondoFinal.png')";
		vidas[contVidas].parentNode.removeChild(vidas[contVidas]);//Elimina ese bloque
		vidas.splice(contVidas, 1);
		barra.parentNode.removeChild(barra);
		zona.parentNode.removeChild(zona);
		
		return true;
	}
	else
	{
		vidas[contVidas].parentNode.removeChild(vidas[contVidas]);//Elimina ese bloque
		vidas.splice(contVidas, 1);
		contVidas--;
		pelota.style.visibility = "hidden";
		return false;
	}
}
function lagrimasEnemigos()
{	
	bolaEnemiga.style.top = bolaEY + "px";
	bolaEnemiga.style.left = bolaEX + "px";
	bolaEnemiga.style.visibility = "visible";
		ladoY = Math.pow((450 - puntaY),2);
		ladoX = Math.pow((735 - puntaX + puntaXY),2);
		hipotenusaH = Math.sqrt(ladoX + ladoY);
		variacionLadoX = hipotenusaH/(735 - puntaX + puntaXY);
		variacionLadoY = hipotenusaH/(450 - puntaY);
		if(puntaXY < puntaX)
		{
			bolaEX = bolaEX + variacionLadoX;
			bolaEY = bolaEY + variacionLadoY;
		}
		else
		{
			bolaEX = bolaEX - variacionLadoX;
			bolaEY = bolaEY + variacionLadoY;
		}
	bolaEnemiga.style.left = bolaEX + "px";
	bolaEnemiga.style.top = bolaEY + "px";
		
		if (bolaEY >= alto - diametroPelota)
		{
			bolaEnemiga.style.visibility = "hidden";
			aleatorio();
			
		}
		if(bolaEY >= (posicionBy - diametroPelota))
		{
			if(bolaEX >= (posicionBx - diametroPelota) && bolaEX <= (posicionBx + 86))
			{
				bolaEnemiga.style.visibility = "hidden";
				aleatorio();
				if(itemPuesto == true)
				{
					partidaPerdida();
				}
				partidaPerdida();
				recolocarPelota();
			}	
		}
}
function aleatorio()
{
	enemigoAleatorio = Math.floor(Math.random() * todosLadrillos.length);
	/*
	if(todosLadrillos[enemigoAleatorio].style.visibility == "hidden")
	{
		enemigoAleatorio = Math.floor(Math.random() * todosLadrillos.length);
	}
	*/
	bolaEX = todosLadrillos[enemigoAleatorio].offsetLeft;
	bolaEY = todosLadrillos[enemigoAleatorio].offsetTop;
	puntaX = Math.floor(Math.random() * 735);
	puntaY = todosLadrillos[enemigoAleatorio].offsetTop;
	puntaXY = todosLadrillos[enemigoAleatorio].offsetLeft;
}



function mover()
{
	itemEY = itemEY + 2;
	item.style.top = itemEY + "px";
	if(itemEY >= (posicionBy - diametroPelota))
	{
		if(itemEX >= (posicionBx - diametroPelota) && bolaEX <= (posicionBx + 86))
		{
			item.style.visibility = "hidden";
			itemPuesto = true;
		}	
	}
	if(bolaEY >= (posicionBy - diametroPelota))
	{
		if(bolaEX >= (posicionBx - diametroPelota) && bolaEX <= (posicionBx + 86))
		{
			barra.style.backgroundImage = "url('cabeza.png')";
			itemPuesto = false;
		}	
	}
	
}

