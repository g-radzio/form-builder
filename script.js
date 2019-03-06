let i = 0;
let content;
let id;
let styl;
let value;
let option;

let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
let db;

function start()
{	

	/*Obsługa wyświetlania zawartości IndexedDB
	printButton.addEventListener("click", function () {
			var output = document.getElementById("printOutput");
			output.textContent = "";

			var transaction = db.transaction("questions", "readwrite");
			var objectStore = transaction.objectStore("questions");

			var request = objectStore.openCursor();
			request.onsuccess = function(evt) {  
				var cursor = evt.target.result;  
				if (cursor) {  
					output.textContent += "Pytanie nr: " + cursor.value.id + 
								" treść: " + cursor.value.question + ", typ: " + cursor.value.typ + ", warunek: " + cursor.value.warunek + ", z parametrem: " + cursor.value.parametr + " ";                            
					cursor.continue();  
				}  
				else {  
					console.log("No more entries!");  
				}  
			};  
		}, false); 
	*/
		
	var FromsData = [];

	var request = indexedDB.open("FromsDB", 1);  
	request.onsuccess = function (evt) 
	{
		db = request.result;                                                            
	};

	request.onerror = function (evt) 
	{
		console.log("IndexedDB error: " + evt.target.errorCode);
	};

	request.onupgradeneeded = function (evt) 
	{                   
		var objectStore = evt.currentTarget.result.createObjectStore("questions", { keyPath: "id", autoIncrement: false });

		for (i in FromsData) 
		{
			objectStore.add(FromsData[i]);
		}
	};
}

function newDefaultQuestion()
{
	i++;
	content = document.createElement('div');
	content.className = "defaultQuestion";
	content.innerHTML = '<label>Question<input type="text" id="query_'+i+'" name="question_'+i+'" autocomplete="false" onblur="addNewToBase('+i+')"/></label><br /><label>Type<select id="type_'+i+'"name="type" onblur="addNewToBase('+i+')"><option value="radio" selected label="Yes / No">Yes / No</option><option value="text" label="Text">Text</option><option value="number" label="Number">Number</option></select></label><div class="buttons"><input type="button" class="subButton" onclick="newSubQuestion('+i+')" value="Add Sub-Input"><input type="button" id="del_'+i+'" class="subButton" onclick="deleteQuestion('+i+')" value="Delete"></div>';
	id="question_"+i;
	content.setAttribute("id", id);
	content.setAttribute("parent", "NULL");
	content.style.marginLeft='25px';
	id=document.getElementById('forms');
	id.appendChild(content);
}
	
function addNewToBase(j)
{
	var q = document.getElementById('query_'+j).value;
	q=String(q);
	
	var typ = document.getElementById('type_'+j).value;
	typ = String(typ);
	
	var transaction = db.transaction("questions", "readwrite");
	var objectStore = transaction.objectStore("questions"); 
	var request = objectStore.delete(j);
	request = objectStore.add({ id: j, question: q, typ: typ});
}

function newSubQuestion(j)
{
	i++;
	content = document.createElement('div');
	content.className = "subQuestion";
	content.innerHTML = '<label>Condition <select class="subtype" name="condition" id="condition_'+i+'" onblur="addSubToBase('+i+')"><option value="equals" selected id="conditionA_'+i+'" label="Equals">Equals</option><option value="greater" id="conditionB_'+i+'" label="Greater than">Greater than</option><option value="less" id="conditionC_'+i+'" label="Less than">Less than</option></select></label><span id="spanId_'+i+'"> warunek </span><br /><label>Question <input type="text" id="query_'+i+'" name="question" autocomplete="false" onblur="addSubToBase('+i+')"/></label><br /><label>Type <select id="type_'+i+'" name="type" onblur="addSubToBase('+i+')"><option value="radio" selected label="Yes / No">Yes / No</option><option value="text" label="Text">Text</option><option value="number" label="Number">Number</option></select></label><div class="buttons"><input type="button" class="subButton" onclick="newSubQuestion('+i+')" value="Add Sub-Input"><input type="button" id="del_'+i+'" class="subButton" onclick="deleteQuestion('+i+')" value="Delete"></div>';
	id="question_"+i;
	
	content.setAttribute("id", id);
	id=document.getElementById('question_'+j);
	
	content.setAttribute("parent", "question_"+j);
	
	styl=parseInt(id.style.marginLeft, 10);
	styl +=50;
	styl=styl+'px'
	content.style.marginLeft=styl;
	id.after(content);
	
	value = document.getElementById('type_'+j);
	option = value.options[value.selectedIndex].value;
	
	if (option == 'radio')
	{
		document.getElementById('spanId_'+i).innerHTML = '<select id="value_'+i+'" class="radiotype" name="radiotype" onblur="addSubToBase('+i+')"><option value="yes" selected label="Yes">Yes</option><option value="no" label="no">No</option></select>';
		
		document.getElementById('conditionB_'+i).disabled = true;
		document.getElementById('conditionC_'+i).disabled = true;
	}	
	
	if (option == 'number')
	{
		document.getElementById('spanId_'+i).innerHTML = '<input type="number" class="valuetype" id="value_'+i+'" onblur="addSubToBase('+i+')"/>';
	}
	
	if (option == 'text')
	{
		document.getElementById('spanId_'+i).innerHTML = '<input type="text" class="valuetype" id="value_'+i+'" onblur="addSubToBase('+i+')"/>';
		
		document.getElementById('conditionB_'+i).disabled = true;
		document.getElementById('conditionC_'+i).disabled = true;
	}
}	

function addSubToBase(j)
{
	var q = document.getElementById('query_'+j).value;
	q=String(q);
	
	var typ = document.getElementById('type_'+j).value;
	typ = String(typ);
	
	var con = document.getElementById('condition_'+j).value;
	con = String(con);
	
	var param = document.getElementById('value_'+j).value;
	param = String(param);

	var transaction = db.transaction("questions", "readwrite");
	var objectStore = transaction.objectStore("questions"); 
	var request = objectStore.delete(j);
	request = objectStore.add({ id: j, question: q, typ: typ, warunek: con, parametr: param});
}

	

function deleteQuestion(j)
{
	content = document.getElementById('question_'+j);
	content.remove();
	
	var transaction = db.transaction("questions", "readwrite");
	var objectStore = transaction.objectStore("questions");
	var request = objectStore.delete(j);	
}

