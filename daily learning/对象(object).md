# JavaScript中的对象    
>  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects  
https://es6.ruanyifeng.com/?search=type&x=0&y=0#docs/class  
1. 和其他 javascript 变量一样，对象的名字(可以是普通的变量)和属性的名字都是大小写敏感的  
2. 对象中未赋值的属性的值为undefined（而不是null）。  
3. JavaScript 对象的属性既可以用 . 访问，也可以通过方括号访问，因为每个属性都有一个用于访问它的字符串值，因此对象有时也被叫作关联数组。
   *  在使用[ ]访问对象的属性时，方括号中的所有键都将转换为字符串类型，因为JavaScript中的对象只能使用String类型作为键类型，JavaScript会使用.tostring()方法将一个非string类型转换为string，并将此结果字符串用作新键。  ```myObj[obj]= "Object" //当将键obj添加到myObj时，JavaScript将调用obj.toString()方法，并将此结果字符串用作新键; ```   
    也可以通过存储在变量中的字符串来访问属性：  
    ```
    var propertyName = "make";  
    myCar[propertyName] = "Ford"; 
     ```  
     ```javascript   
     在  for...in 语句中使用方括号标记以枚举一个对象的所有属性
     function showProps(obj, objName) {
        var result = "";
        for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
        result += objName + "." + i + " = " + obj[i] + "\n";
        }
     }
          return result;
    }
     该函数返回以下值：  
     myCar.make = Ford
    myCar.model = Mustang
    myCar.year = 1969
    ```



   
   * 一个对象的属性名可以是任何有效的 JavaScript 字符串，或者可以被转换为字符串的任何类型，包括空字符串。然而，一个属性的名称如果不是一个有效的 JavaScript 标识符（例如，一个由空格或连字符，或者以数字开头的属性名），就只能通过方括号标记访问。这个标记法在属性名称是动态判定（属性名只有到运行时才能判定）时非常有用。 
 
4. 枚举一个对象的所有属性？ ES6中不支持？  
5. 创建新对象：  
①JavaScript 拥有一系列预定义的对象  
②你可以创建你自己的对象：1），通过对象初始化器（Object Initializer）创建对象：  
 ```  
 var obj = { property_1:   value_1,   // property_# 可以是一个标识符...
            2:            value_2,   // 或一个数字...
           ["property" +3]: value_3,  //  或一个可计算的key名...
            // ...,
            "property n": value_n }; // 或一个字符串

 ```  
 ? 如果一个对象是通过在顶级脚本的对象初始化器创建的，则 JavaScript 在每次遇到包含该对象字面量的表达式时都会创建对象。同样的，在函数中的初始化器在每次函数调用时也会被创建。?
           

  
2），可以创建一个构造函数并使用该函数和 new 操作符初始化对象:  
    1,通过创建一个构造函数来定义对象的类型。首字母大写是非常普遍而且很恰当的惯用法。  
 ```  
    function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year; 
    }
  ```  
   2,通过 new 创建对象实例。 
   ``` 
   var mycar = new Car("Eagle", "Talon TSi", 1993);  
   ```  
你可以通过调用 new 创建任意数量的 car 对象。  

一个对象的属性值可以是另一个对象:  
```
function Person(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
}

var rand = new Person("Rand McKinnon", 33, "M");
var ken = new Person("Ken Jones", 39, "M");
 
 function Car(make, model, year, owner) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.owner = owner;
}

var car1 = new Car("Eagle", "Talon TSi", 1993, rand);
var car2 = new Car("Nissan", "300ZX", 1992, ken);
注意在创建新对象时，上面的语句将 rand 和 ken 作为 owner 的参数值，而不是传入字符串字面量或整数值。接下来你如果想找出 car2 的拥有者的姓名，你可以访问如下属性：  car2.owner.name  

```  

注意你总是可以为之前定义的对象增加新的属性。例如，语句:car1.color = "black";  
 
 为 car1 增加了 color 属性，并将其值设为 "black." 然而，这并不影响其他的对象。想要为某个类型的所有对象增加新属性，你必须将属性加入到 car 对象类型的定义中。  
 ③，对象也可以用 Object.create() 方法创建。该方法非常有用，因为它允许你为创建的对象选择一个原型对象，而不用定义构造函数。  
 ```
// Animal properties and method encapsulation
var Animal = {
  type: "Invertebrates", // 属性默认值
  displayType : function() {  // 用于显示type属性的方法
    console.log(this.type);
  }
}

// 创建一种新的动物——animal1
var animal1 = Object.create(Animal);
animal1.displayType(); // Output:Invertebrates

// 创建一种新的动物——Fishes
var fish = Object.create(Animal);
fish.type = "Fishes";
fish.displayType(); // Output:Fishes
```  
6.所有的 JavaScript 对象至少继承于一个对象。被继承的对象被称作原型，并且继承的属性可通过构造函数的 prototype 对象找到。 ？   
7.JavaScript 1.1 及之后版本中，如果你最初使用名称定义了一个属性，则你必须通过名称来访问它；而如果你最初使用序号来定义一个属性，则你必须通过索引来访问它。 

  这个限制发生在你通过构造函数创建一个对象和它的属性（就象我们之前通过 Car 对象类型所做的那样）并且显式地定义了单独的属性（如 myCar.color = "red"）之时。如果你最初使用索引定义了一个对象属性，例如 myCar[5] = "25"，则你只可能通过 myCar[5] 引用它。  

  这条规则的例外是从与HTML对应的对象，例如 forms 数组。对于这些数组的元素，你总是既可以通过其序号（依据其在文档中出现的顺序），也可以按照其名称（如果有的话）访问它。举例而言，如果文档中的第二个 <form> 标签有一个 NAME 属性且值为 "myForm"，访问该 form 的方式可以是 document.forms[1]，document.forms["myForm"]或 document.myForm。  
8.为对象类型定义属性  
你可以通过 prototype 属性为之前定义的对象类型增加属性。这为该类型的所有对象，而不是仅仅一个对象增加了一个属性。下面的代码为所有类型为 car 的对象增加了 color 属性，然后为对象 car1 的 color 属性赋值： 
```
Car.prototype.color = null;
car1.color = "black";
```  
9.
