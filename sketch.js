let root;

function setup() {
  createCanvas(1000, 1000);
  let a = createVector(width / 2, height);
  let b = createVector(width / 2, height/1.5);
  root = new Branch(a, b, '#c65f15');
}

let btn = document.getElementById('scan');

btn.addEventListener('click', function() {
  root.branches = [];
  let text = document.getElementById('textarea').value;
  let paragraphs = text.split(/\n+/);
  for (let i = 0; i < paragraphs.length; i++) {
    if (paragraphs.length == 1)
      root.addBranch(0, '#c65f15');
    else
      root.addBranch((-PI / 3) + (2 * PI / (3 * (paragraphs.length - 1))) * i, '#c65f15');
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
              color = '#35ff36'; //существительные
              break;
            case 'VERB':
            case 'INFN':
              color = '#ff362e'; //глаголы и инфинитивы
              break;
            case 'ADJS':
            case 'ADJF':
              color = '#fff22e'; //прилагательные
              break;
            case 'PRTS':
            case 'GRND':
            case 'PRTF':
              color = '#FF9000'; //причастия и деепричастия
              break;
            case 'ADVB':
              color = '#A8FF00'; //наречия
              break;
            case 'PREP':
              color = '#3E50D9'; // предлоги
              break;
            case 'CONJ':
              color = '##22D8F9'
              break;
            case 'NPRO':
              color = '#FF0770'
              break;
            default:
              color = '#ffffff';
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
