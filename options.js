// Saves options to chrome.storage.sync.
function save_options() {
	var ep1 = document.getElementById('ep1').checked;
	var ep2 = document.getElementById('ep2').checked;
	var ep3 = document.getElementById('ep3').checked;
	var ep4 = document.getElementById('ep4').checked;
	var ep5 = document.getElementById('ep5').checked;
	var ep6 = document.getElementById('ep6').checked;
	var ep7 = document.getElementById('ep7').checked;
	var ep8= document.getElementById('ep8').checked;
	var ep9 = document.getElementById('ep9').checked;
	var ep10 = document.getElementById('ep10').checked;
  
  chrome.storage.sync.set({
    ep1: ep1,
    ep2: ep2,
    ep3: ep3,
    ep4: ep4,
    ep5: ep5,
    ep6: ep6,
    ep7: ep7,
    ep8: ep8,
    ep9: ep9,
    ep10: ep10
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('save');
    save.innerHTML = 'Options saved.';
    setTimeout(function() {
      save.innerHTML = 'Options saved.';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.

function restore_options() {
  alert();
  chrome.storage.sync.get({
  	ep1: false,
    ep2: false,
    ep3: false,
    ep4: false,
    ep5: false,
    ep6: false,
    ep7: false,
    ep8: false,
    ep9: false,
    ep10: false
  }, function(episodes) {
  	document.getElementById('ep1').checked = episodes.ep1;
	document.getElementById('ep2').checked = episodes.ep2; 
	document.getElementById('ep3').checked = episodes.ep3;
	document.getElementById('ep4').checked = episodes.ep4;
	document.getElementById('ep5').checked = episodes.ep5;
	document.getElementById('ep6').checked = episodes.ep6;
	document.getElementById('ep7').checked = episodes.ep7;
	document.getElementById('ep8').checked = episodes.ep8;
	document.getElementById('ep9').checked = episodes.ep9;
	document.getElementById('ep10').checked = episodes.ep10;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);
