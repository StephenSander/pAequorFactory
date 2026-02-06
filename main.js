 // Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
};

// Object Factory
function pAequorFactory(specimenNum, dna) {
  return {
    specimenNum,
    dna,

    mutate() {
      const index = Math.floor(Math.random() * this.dna.length);
      const oldBase = this.dna[index];
      let newBase = returnRandBase();

      while (newBase === oldBase) {
        newBase = returnRandBase();
      }
      this.dna[index] = newBase;
      console.log(`Strand ${index + 1}: ${oldBase} to ${newBase}`);
    },

    compareDNA(obj) {
      let matches = [];
      let matchIndex = [];

      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === obj.dna[i]) {
          matches.push(this.dna[i]);
          matchIndex.push(i);
        }
      }
      console.log('Matching bases: ' + matches.join('|'));
      console.log('Match strand number: ' + matchIndex.join('|'));
      console.log(this.specimenNum + ' and ' + obj.specimenNum + ' have ' + ((matches.length/15) * 100) + '% DNA in common.');
    },

    willLikelySurvive() {
      let survive = [];
      for (let a = 0; a < this.dna.length; a++) {
        if (this.dna[a] === 'C' || this.dna[a] === 'G') {
          survive.push(a);
        }
      }
      return survive.length / 15 >= 0.6;
    },

    complementStrand() {
      let compStrand = [];
      for (let a = 0; a < this.dna.length; a++) {
        switch (this.dna[a]) {
          case 'A':
            compStrand.push('T');
            break;
          case 'T':
            compStrand.push('A');
            break;
          case 'C':
            compStrand.push('G');
            break;
          case 'G':
            compStrand.push('C');
            break;
        }
      }
      console.log(`Specimen #${this.specimenNum} DNA strand:`);
      console.log(this.dna.join('|'));
      console.log(`Specimen #${this.specimenNum}'s complementary strand:`);
      console.log(compStrand.join('|'));
    }
  }
};




const testStrand = ['C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'A', 'A', 'A', 'A', 'A', 'A']


const pAequor1 = pAequorFactory(1, mockUpStrand());


// .compareDNA test
const pAequor2 = pAequorFactory(2, mockUpStrand());
pAequor1.compareDNA(pAequor2);
console.log(' ');


// .mutate test
console.log('Original:');
console.log(pAequor1.dna.join('|'));
console.log('Mutation occured!');
pAequor1.mutate();
console.log(pAequor1.dna.join('|'));
console.log(' ');


// .willLikelySurvive test
console.log('This specimen will survive: ' + pAequor1.willLikelySurvive());
console.log(' ');


// .complementStrand test
pAequor1.complementStrand()
console.log(' ');


// 30 surviving instances:
let survivors = [];
let specimenNum = 3;

while (survivors.length < 30) {
  const dna = mockUpStrand();
  const specimen = pAequorFactory(specimenNum, dna);

  if (specimen.willLikelySurvive()) {
    survivors.push(specimen);
    specimenNum++;
  }
};

survivors.forEach(s => {
  console.log(`Specimen ${s.specimenNum}: ${s.dna.join('|')}`);
});




