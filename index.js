async function dataGet() {
	try {
		const response = await fetch(`./data.json`);
		const data = await response.json()
		createRoot(data)
		appendContainer(createDom(data.services))
	} catch (error) {
		console.error('Ошибка:', error);
	}
}

dataGet()

function createRoot(data) {
	const ulRoot = document.createElement('ul')
	const liRoot = document.createElement('li')
	liRoot.textContent = Object.keys(data)[0]
	ulRoot.append(liRoot)
	document.querySelector('body').append(ulRoot)
}


function createDom(ar){
	ar.sort((a, b) => a.sorthead < b.sorthead ? -1 : 1)
	if(!ar.length) return
	function sortAkkum(keyId){
		let ul = document.createElement('ul')
		if(!ar.length) return
		ar.map((el, i) => {
			let li = document.createElement('li')
			if(keyId === el.head && el.node){	
				li.textContent = `${el.name} (${el.price})`
				ul.append(li)
				ul.append(sortAkkum(el.id))
			}
			if(keyId === el.head && !el.node){	
				li.textContent = `${el.name} (${el.price})`
				ul.append(li)
			}
		})
		return  ul
	}
	
	let ul = document.createElement('ul')
	for (let i = 0; i< ar.length; i++) {
		let li = document.createElement('li')
		if(ar[i].head === null && !ar[i].node){
			li.textContent = `${ar[i].name} (${ar[i].price})`
			ul.append(li)
		}
		if(ar[i].head === null && ar[i].node){
			li.textContent = `${ar[i].name} (${ar[i].price})`
			ul.append(li)
			li.append(sortAkkum(ar[i].id))	
		}
	}
	return ul
}

function appendContainer(ul) {
	let liRoot = document.querySelector('body>ul>li')
	liRoot.append(ul)
}

