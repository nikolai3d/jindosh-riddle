class HorizontalSlice {

  constructor() {
    this.lady = null;
    this.spot = null;
    this.color = null;
    this.origin = null;
    this.drink = null;
    this.heirloom = null;
  }

  set(lady, spot, color, origin, drink, heirloom) {
    this.lady = lady;
    this.spot = spot;
    this.color = color;
    this.origin = origin;
    this.drink = drink;
    this.heirloom = heirloom;
  }



  Check(checkJSON) {
    var conditionCheck = [];
    for (let propIndex in checkJSON) {

      if (!this.hasOwnProperty(propIndex)) {
        console.error("BAD JSON PROPERTY", propIndex);
      }
      if (this[propIndex] === checkJSON[propIndex]) {
        conditionCheck.push(true);
      } else {
        conditionCheck.push(false);
      }
    }

    if (conditionCheck.length === 0){
      return true;
    }

    var and_check = conditionCheck[0];
    var or_check = conditionCheck[0];

    for (var k=1;k<conditionCheck.length;k++){
      and_check = and_check && conditionCheck[k];
      or_check = or_check || conditionCheck[k];
    }

    if (and_check === or_check) {
      return true;
    } else {
      return false;
    }

  }
}

export default HorizontalSlice;
