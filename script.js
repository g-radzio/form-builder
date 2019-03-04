let i = 0;
let content;
let defaultQuestionContent = '" name="type"><option value="radio" selected label="Yes / No">Yes / No</option><option value="text" label="Text">Text</option><option value="number" label="Number">Number</option></select></label><div class="buttons"><input type="button" class="subButton" onclick="newSubQuestion(';
let subQuestionContent = '" name="type"><option value="radio" selected label="Yes / No">Yes / No</option><option value="text" label="Text">Text</option><option value="number" label="Number">Number</option></select></label><div class="buttons"><input type="button" class="subButton" onclick="newSubQuestion(';

let id;
let styl;
let value;
let option;

function newDefaultQuestion()
{
	i++;
	content = document.createElement('div');
	content.className = "defaultQuestion";
	content.innerHTML = '<h3>Question '+i+'</h3>'+'<label>Question<input type="text" id="query" name="question_'+i+'" /></label><br /><label>Type<select id="type_'+i+defaultQuestionContent+i+')" value="Add Sub-Input"><input type="button" class="subButton" onclick="deleteQuestion('+i+')" value="Delete"></div>';
	id="question_"+i;
	content.setAttribute("id", id);
	content.style.marginLeft='25px';
	id=document.getElementById('forms');
	id.appendChild(content);
}
	
function newSubQuestion(j)
{
	i++;
	content = document.createElement('div');
	content.className = "subQuestion";
	content.innerHTML = '<h3>Question '+i+'</h3><label>Condition <select class="subtype" name="condition"><option value="equals" selected id="conditionA_'+i+'" label="Equals">Equals</option><option value="greater" id="conditionB_'+i+'" label="Greater than">Greater than</option><option value="less" id="conditionC_'+i+'" label="Less than">Less than</option></select></label><span id="spanId_'+i+'"> warunek </span><br /><label>Question <input type="text" id="query_'+i+'" name="question" /></label><br /><label>Type <select id="type_'+i+subQuestionContent+i+')" value="Add Sub-Input"><input type="button" class="subButton" onclick="deleteQuestion('+i+')" value="Delete"></div>';
	id="question_"+i;
	
	content.setAttribute("id", id);
	id=document.getElementById('question_'+j);
	styl=parseInt(id.style.marginLeft, 10);
	styl +=50;
	styl=styl+'px'
	content.style.marginLeft=styl;
	id.after(content);
	
	value = document.getElementById('type_'+j);
	option = value.options[value.selectedIndex].value;
	
	if (option == 'radio')
	{
		document.getElementById('spanId_'+i).innerHTML = '<select class="radiotype" name="radiotype"><option value="yes" selected label="Yes">Yes</option><option value="no" label="no">No</option></select>';
		
		document.getElementById('conditionB_'+i).disabled = true;
		document.getElementById('conditionC_'+i).disabled = true;
	}	
	
	if (option == 'number')
	{
		document.getElementById('spanId_'+i).innerHTML = '<input type="number" class="valuetype" id="value_'+i+'" />';
	}
	
	if (option == 'text')
	{
		document.getElementById('spanId_'+i).innerHTML = '<input type="text" class="valuetype" id="value_'+i+'" />';
		
		document.getElementById('conditionB_'+i).disabled = true;
		document.getElementById('conditionC_'+i).disabled = true;
	}

}	
	

function deleteQuestion(i)
{
	content = document.getElementById('question_'+i);
	
/*	if (content.hasChildNodes()==true)
		content.removeChild(content.childNodes[0]);
	*/content.remove();
}
