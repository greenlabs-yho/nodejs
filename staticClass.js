
class MomClass {
  static init(op) {
    this.sequelize = op.sequelize;
  }

  static toString() {
    console.log('MomClass - ', this.sequelize);
  }
}

class ModuleClass extends MomClass{
  static init(op) {
    super.init(op);
    return ModuleClass;
  }
}

function getFunctionClass(op) {
  class FunctionClass extends MomClass{
    static init(op) {
      super.init(op);
      return FunctionClass;
    }
  }
  return FunctionClass.init(op);
}


module.exports = () => {
  const var1 = ModuleClass.init({sequelize: 'a'})
  console.log('\n[instance a]')
  var1.toString();

  const var2 = ModuleClass.init({sequelize: 'b'})
  console.log('\n[instance b]')
  var1.toString();
  var2.toString();

  const var3 = getFunctionClass({sequelize: 'c'})
  console.log('\n[instance c]')
  var1.toString();
  var2.toString();
  var3.toString();

  const var4 = getFunctionClass({sequelize: 'd'})
  console.log('\n[instance d]')
  var1.toString();
  var2.toString();
  var3.toString();
  var4.toString();
};