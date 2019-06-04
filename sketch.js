let root;




function setup() {
  createCanvas(500, 500);
  let a = createVector(width / 2, height);
  let b = createVector(width / 2, height - 150);
  root = new Branch(a, b);
}

let btn = document.getElementById('scan');

btn.addEventListener('click', function() {
  root.branches = [];
  let text = document.getElementById('textarea').value;
  let paragraphs = text.split(/\n+/);
  console.log(text);
  for (let i = 0; i < paragraphs.length; i++) {
    if (paragraphs.length == 1)
      root.addBranch(0, 'brown');
    else
      root.addBranch((-PI / 3) + (2 * PI / (3 * (paragraphs.length - 1))) * i, 'brown');
    let sentenses = paragraphs[i].split(/\. |\! |\? /);
    for (let j = 0; j < sentenses.length; j++) {
      if (sentenses.length == 1)
        root.branches[i].addBranch(0, 'orange');
      else
        root.branches[i].addBranch((-PI / 3) + (2 * PI / (3 * (sentenses.length - 1))) * j, 'orange');

      Az.Morph.init('node_modules/az/dicts', function () {
        let words = sentenses[j].split(/\, |\: | |\.|\!|\?/);
        for (let z = 0; z < words.length; z++){
          if (words[z] == "")
            words.splice(z, 1);
        }
        for (let k = 0; k < words.length; k++) {
          let parse = Az.Morph(words[k]);
          let color;
          if (parse[0]){
          switch (parse[0].tag.POST){
            case 'NOUN':
              color = 'green';
              break;
            case 'VERB':
            case 'INFN':
              color = 'red';
              break;
            case 'ADJS':
            case 'ADJF':
              color = 'yellow';
              break;
            case 'PRTS':
            case 'GRND':
            case 'PRTF':
              color = '#47ffe9';
              break;
            case 'ADVB':
              color = '#2909ba';
              break;
            case 'PREP':
              color = '#7307ef';
              break;
            default:
              break;
          }
        }
          if (words.length == 1)
            root.branches[i].branches[j].addBranch(0, color);
          else
            root.branches[i].branches[j].addBranch((-PI / 3) + (2 * PI / (3 * (words.length - 1))) * k, color);
        }
      });
    }
  }

});

function draw() {
  background(51);
  root.show();

}
