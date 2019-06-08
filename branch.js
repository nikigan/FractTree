function Branch(begin, end, color) {
    this.begin = begin;
    this.end = end;
    this.branches = [];
    this.color = color || '#ff25a2';
  
  
    this.show = function() {
      stroke(this.color);
      strokeWeight(4);
      line(this.begin.x, this.begin.y, this.end.x, this.end.y);
      for (let i = 0; i < this.branches.length; i++){
          this.branches[i].show();
      }
    };

    this.addBranch = function(angle, color){
      let dir = p5.Vector.sub(this.end, this.begin);
      dir.rotate(angle);
      dir.mult(0.67);
      let newEnd = p5.Vector.add(this.end, dir);
      let branch = new Branch(this.end, newEnd, color);
      this.branches.push(branch);
    };
  
  }