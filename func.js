// LV - lexical vector - is a representation of a Viturian word as an array of [alphabet] numbers each representing how often one letter is entering the word

// the dictionary is in other files

function LVPrepare(wordStr){
	var wordLower = wordStr.toLowerCase();
	const alphabet = "abcdefghijklmnopqrstuvwxyz";
	var outp = new Array(alphabet.length);
	outp.fill(0);
	for(var i = 0; i < alphabet.length; i++){
		for(var j = 0; j < wordLower.length; j++){
			if(wordLower[j] == alphabet[i])
				outp[i]++;
		}
	}
	return outp;
}

function LVFormDictionary(stringDict){
	// stringDict is an object with simple term:description pairs
	outp = {};
	for (var k in stringDict){
		var LV = LVPrepare(k); // conv the key from str to LV
		outp[LV] = stringDict[k]; // copy the description
	}
	return outp;
}

function LVFormMorphemeDictionary(stringList){
	// stringDict is an object with simple term:description pairs
	outp = {};
	for (var i in stringList){
		var LV = LVPrepare(stringList[i]); 
		outp[stringList[i]] = LV; 
	}
	return outp;
}


function LVSubtract(word1, word2){
	sum = []
	for (var i = 0; i < word1.length; i++) {
		sum.push(word1[i] - word2[i]);
	}
	return sum;
}

function LVCheckValidity(word){
	for (var i = 0; i < word.length; i++) {
		if(word[i] < 0)
			return false;
	}
	return true;
}

function LVLookUp (word, dictHash){
	return dictHash[word];
}

function LVAnalyze(word, dict, morph, results, analysis){
	var directLookupResult = LVLookUp(word, dict);
	if(typeof directLookupResult !== 'undefined') results.push([directLookupResult,analysis.slice()]);
	for(m in morph){
		var s = LVSubtract(word, morph[m]);
		if(LVCheckValidity(s)){
			var newA = analysis.slice(); // deep copy
			newA.push(m); // add a morpheme to the analysis
			LVAnalyze(s, dict, morph, results, newA); // recursion
		}
	}
}

function strRemoveMorpheme(stem, morph){
	for(j in morph){
		var i = stem.indexOf(morph[j]);
		if(i != -1)
			 stem = stem.slice(0, i) + stem.slice(i+1);
	}
	return stem;
}